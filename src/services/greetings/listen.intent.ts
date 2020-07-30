import {SystemIntentAbstract, IntentSpeakResponse, IntentViewRespose, IntentResponse} from "../intent.abstract"
import Config from "../../processor/config.singleton"

export default class ListenIntent extends SystemIntentAbstract
{
  label: string

  constructor(serviceName?:string) {
    super(serviceName)

    this.label = `listen`
  }

  execute(utterance:string): Array<IntentResponse>
  {
    let response = []
    Config.setForce('listen', true)
    
    let possibleOutputs = [
      `Hi`,
      `hello`,
      `how can i help?`,
      `yes?`,
      `im listening`,
      `im here`,
      `need anything?`,
      `listening`,
      `great day isn't it?`,
      `whats up?`,
      `tell me`,
      `greetings`, 
      `greeting`, 
      `good to see you`, 
      `its good seeing you`, 
      `how are you`, 
      `how're you`, 
      `how are you doing`, 
      `how ya doin'`, 
      `how ya doin`, 
      `how is everything`, 
      `how is everything going`, 
      `how's everything going`, 
      `how is you`, 
      `how's you`, 
      `how are things`, 
      `how're things`, 
      `how is it going`, 
      `how's it going`, 
      `how's it goin'`, 
      `how's it goin`, 
      `how is life been treating you`, 
      `how's life been treating you`, 
      `how have you been`, 
      `how've you been`, 
      `what is up`, 
      `what's up`, 
      `what is cracking`, 
      `what's cracking`, 
      `what is good`, 
      `what's good`, 
      `what is happening`, 
      `what's happening`, 
      `what is new`, 
      `what's new`, 
      `what is new`, 
      `talk to me`,
      `tell me`,
      `g’day`, 
      `howdy`
    ]

    var output = possibleOutputs[Math.floor(Math.random() * possibleOutputs.length)];
    
    response.push(new IntentViewRespose(`${this.service}-${this.label}`, output))
    response.push(new IntentSpeakResponse(String(output)))

    return response
  }
}
