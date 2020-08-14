
import SentimentModule from "sentiment"
import * as fs from 'fs'
import {MemoryFetch} from '../memory/memory.client'

/**
 * Expose Sentiment Class so users 
 * can setup their own config
 */
export class SentimentAdapter extends SentimentModule 
{
  constructor(options?: SentimentModule.SentimentOptions)
  {
    super(options)
  }

  // analizeLevel(phrase: string, options?: SentimentModule.AnalysisOptions, callback?: (err: string, result: SentimentModule.AnalysisResult) => void)
  // {
  //   let data = this.analyze(phrase, options, callback)
  //   return data;
  // }

  analize(phrase: string, options?: SentimentModule.AnalysisOptions, callback?: (err: string, result: SentimentModule.AnalysisResult) => void)
  {
    // replace how score is being calculated
    let result = super.analyze(phrase, options, callback)
    let data = Object.assign({}, result)

    if(data.score > 5) result.score = 2
    if(data.score <= 5 && data.score > 2) result.score = 1
    if(data.score <= 2 && data.score >= -2) result.score = 0
    if(data.score < -2 && data.score >= -5) result.score = -1
    if(data.score < -5) result.score = -2

    return result;
  }
  
}

type TrainData = {
  template: string;
  classification: string;
}

type TemplateData = {
  template: string;
  classification: string;
  score: number
}

export class SentenceLearning
{
  protected templates: Array<TemplateData>
  private sentiment: SentimentAdapter
  private trainData: Array<TrainData>

  constructor(sentiment? : SentimentAdapter)
  {
    if(typeof sentiment === 'undefined') sentiment = new SentimentAdapter()
    this.sentiment = sentiment
    this.trainData = []
    this.templates = []
  }

  protected analize(text:string)
  {
    console.log(text, this.sentiment.analize(text))
    return this.sentiment.analize(text)
  }

  addDocument(template:string, classification:string):void
  {
    this.trainData.push({
      template:template,
      classification:classification
    })
  }

  addFile(filename:string, classification:string):void
  {
    if(!fs.existsSync(filename)) throw new Error(`Invalid file.`)

    let document = fs.readFileSync(filename).toString()
    let records = document.split(/\r?\n/)
    records.forEach(record=>{
      this.addDocument(record, classification)
    })
  }

  train()
  {
    this.trainData.forEach((data)=>{
      // set score based on txt file
      let rx = /\[(1|-1|0|2|-2)\]/
      let score:number = 0
      let match = String(data.template).match(rx)
      if(match) {
        data.template = data.template.replace(rx,'')
        score = parseInt(match[1])
      } else {
        let result = this.analize(data.template)
        score = result.score
      }
      let template:TemplateData = Object.assign({},data, {score:score});
      this.templates.push(template)
    })
  }

  load(filename:string):boolean 
  {
    if(fs.existsSync(filename)) {
      this.templates = require(filename)
      return true
    }
    return false
  }

  save(filename:string) {
    let content = JSON.stringify(this.templates)
    fs.writeFile(filename, content, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
}

export default class SentenceGenerator extends SentenceLearning
{
  private getTemplates(classification:string, score:number)
  {
    let traits:any = MemoryFetch('traits')
    
    let positivity = parseInt(traits.positivity)
    let diction = parseInt(traits.diction)
    score += positivity

    let scoreRange = [score,score+diction].sort(function(a,b) { return a - b; })
    
    return this.templates.filter((template)=>{
      return template.classification === classification && (template.score <= scoreRange[1] && template.score >= scoreRange[0])
    })
  }

  generate(classification:string, variables:{[key:string]: string} = {}, sentiment: number|string = 0):string
  { 
    if(typeof sentiment === 'string') sentiment = this.analize(sentiment).score

    let templates = this.getTemplates(classification, sentiment)
    if(templates.length <= 0) templates = this.getTemplates(classification, 0)

    let template = templates[Math.floor(Math.random() * templates.length)];

    let result = String(template.template)
    let keys = Object.keys(variables)
    
    keys.forEach(key=>{
      result = result.replace(`{${key}}`, variables[key])
    })

    return result
  }
}