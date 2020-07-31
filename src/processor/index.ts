import Config from "./config.singleton"
import Services from "../services"
import IntentClassifier from "../language/intent.classifier"

export type ExecutionType = "intent" | "boot"

export default class Processor
{
  private Services: Services
  private IntentClassifier: IntentClassifier
  
  constructor()
  {
    this.Services = new Services()
    this.IntentClassifier = new IntentClassifier(this.Services)
  }

  private executeIntent(utterance:string)
  {
    let classifications = this.IntentClassifier.getClassifications(utterance)
    if(classifications.length === 0) return false

    // do calculation of the result of classifications if needed here

    let [service,intent] = String(classifications[0]['label']).split(`.`)
    let serviceIntent = this.Services.get(service).getIntent(intent)
    let intentResponse = serviceIntent.executeIntent(utterance)

    /**
     * Loop true intentResponse to see if there is any SystemIntentResponse
     * SystemIntentResponse will be use to do some system changes 
     */
    return intentResponse
  }

  execute(utterance:string, type:ExecutionType = "intent")
  {
    if(type === "intent") return this.executeIntent(utterance)
  }
}