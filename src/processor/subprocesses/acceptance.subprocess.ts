import SubProcessAbstract from './subprocess.abstract'
import InterestTrait from '../traits/interest.trait'
import AppreciationTrait from '../traits/appreciation.trait'
import MotivationTrait from '../traits/motivation.trait'

export default class AcceptanceSubProcess extends SubProcessAbstract
{
  constructor()
  {
    super([
      new InterestTrait(),
      new AppreciationTrait(),
      new MotivationTrait()
    ])
    
  }

  execute(utterance:string):boolean
  {
    let appreciation = this.sub('appreciation').process(utterance)
    let interest = this.sub('interest').process(utterance)
    let motivation = this.sub('motivation').process(utterance)

    let result = ((motivation*appreciation)+motivation) + interest
    if(Math.random() < result) {
      console.info({
        appreciation: appreciation,
        interest: interest,
        motivation: motivation,
        result: result
      })
      return true
    } else {
      console.info({
        appreciation: appreciation,
        interest: interest,
        motivation: motivation,
        result: result
      })
      throw new Error(`AcceptanceSubProcess: NOACCEPT`)
    }
  }
}