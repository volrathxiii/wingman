import Config from "../processor/config.singleton"

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



export interface IntentInterface {
  label: string
  service: string
  setService(serviceName:string):void
  execute(utterance:string): Array<IntentResponse>
  executeIntent(utterance:string): Array<IntentResponse>
}

export abstract class IntentAbstract implements IntentInterface
{
  abstract label: string

  constructor(serviceName?:string)
  {
    if(typeof serviceName !== 'undefined') 
      this.setService(serviceName)
  }

  /**
   * service name
   */
  service:string

  setService(serviceName:string):void
  {
    this.service = serviceName
  }

  executeIntent(utterance:string): Array<IntentResponse>
  {
    if(Config.get('listen') === true) return this.execute(utterance)
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