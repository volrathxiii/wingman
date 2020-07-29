import {IntentInterface} from "./intent.abstract";
export default class ServiceAbstract 
{
  intents: IntentInterface[];
  constructor() 
  {
    this.intents = []
  }

  /**
   * Add intent as name
   * @param name 
   * @param intent 
   */
  defineIntent(name:string, intent: IntentInterface) 
  {
    this.intents[name] = intent;
  }

  /**
   * Add intent to a service
   * @param intent
   */
  addIntent(intent: IntentInterface) 
  {
    this.intents[intent.label] = intent;
  }
}