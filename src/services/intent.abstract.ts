export type UtterancesType = string[]

export interface IntentInterface {
  label: string
  service: string
  utterances: UtterancesType
  getUttenrances(): UtterancesType
  setService(serviceName:string):void
}

export abstract class IntentAbstract implements IntentInterface
{
  abstract label: string
  abstract utterances: string[]

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

  getUttenrances() :UtterancesType
  {
    return this.utterances
  }
}

export default IntentAbstract