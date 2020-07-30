import Services from "../services"
import {BayesClassifier} from "natural"
import * as path from 'path'
import * as fs from 'fs'

export default class IntentClassifier
{
  private classifier: BayesClassifier
  private trainExportFile: string
  private unclassifiedToken: string

  constructor(services: Services)
  {
    this.trainExportFile = path.join(process.cwd(),`tmp`,`intent.classifier.json`)
    this.setUpClassifier(services)
  }
  /**
   * Setup classifier
   * @param services 
   */
  private setUpClassifier(services: Services)
  {
    if(fs.existsSync(this.trainExportFile)) {
      console.log(`Loading from previous intent training...`)
      let trainData = require(this.trainExportFile)
      this.classifier = BayesClassifier.restore(trainData)
    } else
    {
      this.classifier = new BayesClassifier()
      this.trainClassifier(services)
    }

    this.unclassifiedToken = JSON.stringify(this.classifier.getClassifications(''))
  }

  /**
   * Train classifier
   * @param services 
   */
  private trainClassifier(services: Services)
  {
    services.getAllIntents().forEach((intent)=>{
      this.loadTrainFile(intent.service, intent.label)
    })
    this.classifier.train()

    this.classifier.save(this.trainExportFile, function(err, classifier) {
      console.log(`Intent training saved!`)
    });
  }

  /**
   * Load trainingg dataset from a file
   * @param service 
   * @param intent 
   */
  private loadTrainFile(service:string, intent:string)
  {
    let file = path.join(
      process.cwd(),
      `training`,
      `intent`,
      `${service}.${intent}.train.json`
    )

    if(fs.existsSync(file)) {
      let trainData = require(file)
      trainData.forEach(utterance => {
        this.classifier.addDocument(utterance,`${service}.${intent}`)
      });
    }
  }

  /**
   * Get classifications
   * @param utterance 
   */
  getClassifications(utterance:string): Array<Object>
  {
    let result = this.classifier.getClassifications(utterance)
    if(JSON.stringify(result) === this.unclassifiedToken) return []
    return result
  }
}