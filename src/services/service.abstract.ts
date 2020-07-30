import {IntentInterface} from "./intent.abstract"

export interface ServiceInterface
{
  intents: IntentInterface[]
  name: string
  getIntents():Array<IntentInterface>
  addIntent(intent: IntentInterface):void
  getIntent(label:string):IntentInterface
}
export default class ServiceAbstract implements ServiceInterface
{
  intents: IntentInterface[]
  name: string
  constructor(name: string)
  {
    this.name = name
    this.intents = []
  }

  /**
   * Return array of intents
   */
  getIntents():Array<IntentInterface>
  {
    return Object.values(this.intents)
  }

  /**
   * Get specific intent
   * @param label 
   */
  getIntent(label:string):IntentInterface
  {
    return this.intents[label]
  }

  /**
   * Add intent to a service
   * @param intent
   */
  addIntent(intent: IntentInterface):void
  {
    intent.setService(this.name)
    this.intents[intent.label] = intent
  }
}