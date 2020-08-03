import TraitBaseAbstract from './trait.abstract'
import {PorterStemmer,TreebankWordTokenizer} from 'natural'

// let SentimentAnalyzer = require('./node_modules/natural/lib/natural/sentiment/SentimentAnalyzer')
let SentimentAnalyzer = require(`${process.cwd()}/node_modules/natural/lib/natural/sentiment/SentimentAnalyzer`)

export default class AppreciationTrait extends TraitBaseAbstract
{
  protected tokenizer: TreebankWordTokenizer
  protected analyzer: any//??

  constructor()
  {
    super(`appreciation`)
    this.tokenizer = new TreebankWordTokenizer()
    this.analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn")
  }

  process(utterance:string):number
  {
    let tokens = this.tokenizer.tokenize(utterance)
    return this.analyzer.getSentiment(tokens)
  }
}