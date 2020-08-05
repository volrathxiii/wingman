import {IntentAbstract, IntentSpeakResponse, IntentViewRespose, IntentResponse, SystemIntentAbstract} from "../intent.abstract"
import {MemoryFetch, MemoryStore} from "../../memory/memory.client"

export default class StopListenIntent extends SystemIntentAbstract
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

    let possibleOutputs = [
      `Okay`,
      `Fine, ill be quiet`,
      `So be it`,
      `Just let me know if you need anything else`,
      `Enable quiet mode`,
      `Ahh thank you`,
      `Finally!`,
      `See ya!`,
      `Talk soon`,
      `I'll be missing you`,
      `I'll just sit here for now`,
      `Zipping`,
      `Going to sleeping`
    ]

    var output = possibleOutputs[Math.floor(Math.random() * possibleOutputs.length)];
    
    response.push(new IntentViewRespose(`${this.service}-${this.label}`, output))
    response.push(new IntentSpeakResponse(String(output)))

    return response
  }
}
