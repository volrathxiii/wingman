import Sentiment from "sentiment"
import {MemoryFetch} from '../memory/memory.client'
import VoiceGenerator from '../vocalize/voice.generator'
export type UtterancesType = string[]
export interface IntentResponse
{
  data: object|string
}

export class IntentViewRespose implements IntentResponse
{
  data: object
  constructor(id:string,html:string)
  {
    this.data= {
      id: id,
      html: html
    }
  }
}

export class IntentSpeakResponse implements IntentResponse
{
  data: string
  constructor(message:string)
  {
    this.data = message
  }
}

export class IntentVoiceResponse implements IntentResponse
{
  data: string
  constructor(message:string)
  {
    let voice = new VoiceGenerator()
    let voiceFile = voice.getVoice(message)
    this.data = voiceFile
  }
}


export interface IntentInterface {
  label: string
  service: string
  setService(serviceName:string):void
  getTag():string
  execute(utterance:string, data:object): Array<IntentResponse>
  executeIntent(utterance:string): Array<IntentResponse>
}


export abstract class IntentAbstract implements IntentInterface
{
  abstract label: string
  private sentiment: Sentiment
  /**
   * service name
   */
  service:string

  constructor(serviceName?:string)
  {
    this.service = ``
    if(typeof serviceName !== 'undefined') 
      this.setService(serviceName)

    
    this.sentiment = new Sentiment({})
  }

  getTag():string
  {
    return `${this.service}.${this.label}`
  }

  setService(serviceName:string):void
  {
    this.service = serviceName
  }

  executeIntent(utterance:string): Array<IntentResponse>
  {
    if(MemoryFetch('listen') === true) return this.execute(utterance)
    return []
  }

  abstract execute(utterance:string): Array<IntentResponse>
}

export abstract class SystemIntentAbstract extends IntentAbstract
{
  executeIntent(utterance:string): Array<IntentResponse>
  {
    return this.execute(utterance)
  }
}

export default IntentAbstract