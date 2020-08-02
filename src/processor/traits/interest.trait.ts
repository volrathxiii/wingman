import {BayesClassifier} from 'natural'
import TraitBaseAbstract, {TraitLevelParam} from './trait.abstract'
import Memory from '../memory.singleton'

type InterestParam = {
  label: string
  level: TraitLevelParam
}

/**
 * Process interest
 */
export default class InterestTrait extends TraitBaseAbstract
{
  private interests: {[key:string]: number}
  private classifier: BayesClassifier

  constructor(interests:Array<InterestParam> = [])
  {
    super(`interest`)
    
    if(interests.length === 0) interests = Memory.get(`traits`).interest
    this.interests={}
    interests.forEach(interest=>{
      this.interests[interest.label] = this.levelToNumber(interest.level)
    })

    this.classifier = BayesClassifier.restore(require(`${process.cwd()}/data/topics.json`))
  }

  process(utterance:string):number
  {
    let classification = this.classifier.getClassifications(utterance)
    let topScore = classification[0].value
    classification = classification.filter(classify=>{
      return classify.value === topScore
    })
    let result:{[key:string]: number} = {}
    classification.forEach(category=>{
      result[category.label] = category.value
    })

    let computations:{[key:string]: number} = {}
    Object.keys(this.interests).forEach(interest=>{
      if(result[interest]) computations[interest] = this.interests[interest] * result[interest]
      
    })
    
    // average the interest
    let value = 0
    Object.values(computations).forEach((val:number)=>{
      value += val
    })

    value = value * Object.values(computations).length
    
    return value
  }
}