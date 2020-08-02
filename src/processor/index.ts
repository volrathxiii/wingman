import Services from "../services"
import IntentClassifier from "../recognition/intent.classifier"
import AcceptanceSubProcess from './subprocesses/acceptance.subprocess'

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
    try {
      if(this.subprocess.acceptance.execute(utterance))
      {
        if(type === "intent") return this.executeIntent(utterance)
      }
    } catch (error) {
      console.log(error)
    }
  }
}