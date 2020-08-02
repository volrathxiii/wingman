import TraitBaseAbstract, {TraitLevelParam} from './trait.abstract'
import Memory from '../memory.singleton'

export default class MotivationTrait extends TraitBaseAbstract
{
  private motivation: number
  constructor(motivation:TraitLevelParam = 0)
  {
    super(`motivation`)
    if(motivation === 0) motivation = Memory.get(`traits`).motivation
    this.motivation = (motivation+5)/10
  }

  process(utterance:string):number
  {
    return this.motivation
  }
}