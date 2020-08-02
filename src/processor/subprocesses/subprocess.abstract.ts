import {TraitInterface} from '../traits/trait.abstract'

export default abstract class SubProcessAbstract
{
  private proccessor: {[key:string]: TraitInterface}

  constructor(traits:Array<TraitInterface> = [])
  {
    this.proccessor = {}
    traits.forEach((trait)=>{
      this.proccessor[trait.name] = trait
    })
  }

  sub(name:string):TraitInterface
  {
    if(typeof this.proccessor[name] === 'undefined') throw new Error(`SubProcess: Undefined trait [${name}]`)
    return this.proccessor[name]
  }

  abstract execute(utterance:string):boolean|Error
}