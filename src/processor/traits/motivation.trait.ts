import TraitBaseAbstract, {TraitLevelParam} from './trait.abstract'
import {MemoryFetch} from '../../memory/memory.client'

export default class MotivationTrait extends TraitBaseAbstract
{
  private motivation: number
  constructor(motivation:TraitLevelParam = 0)
  {
    super(`motivation`)
    let traits:any = MemoryFetch('traits')
    if(motivation === 0) motivation = traits.motivation
    this.motivation = (motivation+5)/10
  }

  process(utterance:string):number
  {

    return this.motivation
  }
}