import {IntentAbstract, IntentVoiceResponse, IntentViewRespose, IntentResponse, SystemIntentAbstract} from "../intent.abstract"
import {MemoryFetch, MemoryStore} from "../../memory/memory.client"
import SentenceGenerator from '../../vocalize/index'
export default class StopListenIntent extends IntentAbstract
{
  label: string

  constructor(serviceName?:string) {
    super(serviceName)

    this.label = `stoplisten`
  }

  execute(utterance:string): Array<IntentResponse>
  {
    let response = []
    MemoryStore('listen', false)

    let Sentence = SentenceGenerator.generate(
      this.getTag(), 
      {}, utterance
    )
    
    response.push(new IntentViewRespose(this.getTag(), Sentence))
    response.push(new IntentVoiceResponse(Sentence))

    return response
  }
}
