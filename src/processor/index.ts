import Services from "../services"
import IntentClassifier from "../recognition/intent.classifier"
import AcceptanceSubProcess from './subprocesses/acceptance.subprocess'
import { IntentInterface, SystemIntentAbstract, IntentResponse } from "../services/intent.abstract"

export type ExecutionType = "intent" | "boot"

export default class Processor
{
  private Services: Services
  private IntentClassifier: IntentClassifier
  private subprocess: {
    acceptance: AcceptanceSubProcess
  }
  
  constructor()
  {
    this.Services = new Services()
    this.IntentClassifier = new IntentClassifier(this.Services)
    this.subprocess = {
      acceptance: new AcceptanceSubProcess()
    }
  }

  private determineIntent(utterance:string)
  {
    let classifications = this.IntentClassifier.getClassifications(utterance)
    if(classifications.length > 0) 
    {
      let [service,intent] = String(classifications[0]['label']).split(`.`)
      return this.Services.get(service).getIntent(intent)
    }
    // do calculation of the result of classifications if needed here
  }

  private executeIntent(utterance:string, serviceIntent:IntentInterface)
  {
    let intentResponse = serviceIntent.executeIntent(utterance)

    /**
     * Loop true intentResponse to see if there is any SystemIntentResponse
     * SystemIntentResponse will be use to do some system changes 
     */
    return intentResponse
  }

  private failExecution(utterance:string):IntentResponse[]
  {
    console.warn(`Processor[NO-INTENT-FOUND]: ${utterance}`)
    return []
  }

  // @TODO: multiple intent in one sentence
  execute(utterance:string, type:ExecutionType = "intent")
  {
  
    let Intent  = this.determineIntent(utterance)
    if(typeof Intent === 'undefined') return this.failExecution(utterance);
    if(this.subprocess.acceptance.execute(utterance) || Intent instanceof SystemIntentAbstract)
    {
      if(type === "intent") return this.executeIntent(utterance,Intent)
    }

    return this.failExecution(utterance);
  }
}