export type TraitLevelParam = -5|-4|-3|-2|-1|0|1|2|3|4|5

export interface TraitInterface
{
  name:string
  process(utterance:string):number
}

export default abstract class TraitBaseAbstract implements TraitInterface
{
  name:string

  constructor(name:string, config?:object)
  {
    this.name = String(name).toLowerCase()
  }

  abstract process(utterance:string):number

  protected levelToNumber(level: TraitLevelParam) :number
  {
    return level/10
  }
}