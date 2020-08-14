import TraitBaseAbstract, {TraitLevelParam} from './trait.abstract'
import {MemoryFetch} from '../../memory/memory.client'

export default class DictionTrait extends TraitBaseAbstract
{
  private diction: number
  constructor(diction:TraitLevelParam = 0)
  {
    super(`diction`)
    let traits:any = MemoryFetch('traits')
    this.diction = traits.diction
  }

  process(utterance:string):number
  {
    return this.diction
  }
}