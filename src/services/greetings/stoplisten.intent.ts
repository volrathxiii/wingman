import {IntentAbstract} from "../intent.abstract"

export default class StopListenIntent extends IntentAbstract
{
  label: string
  utterances: string[]

  constructor(serviceName?:string) {
    super(serviceName)

    this.label = `stoplisten`
    
    this.utterances = [
      "stop listen",
      "stop listening",
      ]
  }

  execute()
  {
    
  }
}
