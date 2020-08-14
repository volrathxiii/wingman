import TraitBaseAbstract, {TraitLevelParam} from './trait.abstract'
import {MemoryFetch} from '../../memory/memory.client'

export default class PositivityTrait extends TraitBaseAbstract
{
  private positivity: number
  constructor(positivity:TraitLevelParam = 0)
  {
    super(`positivity`)
    let traits:any = MemoryFetch('traits')
    this.positivity = traits.positivity
  }

  process(utterance:string):number
  {
    return this.positivity
  }
}