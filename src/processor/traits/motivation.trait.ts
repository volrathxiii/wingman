import TraitBaseAbstract, {TraitLevelParam} from './trait.abstract'
import Memory from '../memory.singleton'

export default class MotivationTrait extends TraitBaseAbstract
{
  private motivation: number
  constructor(motivation?:TraitLevelParam)
  {
    super(`motivation`)
    if(typeof motivation === 'undefined') motivation = Memory.get(`traits`).motivation
    this.motivation = (motivation+5)/10
  }

  process(utterance:string):number
  {
    return this.motivation
  }
}