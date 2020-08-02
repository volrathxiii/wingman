import {SystemIntentAbstract, IntentSpeakResponse, IntentViewRespose, IntentResponse} from "../intent.abstract"
import Memory from "../../processor/memory.singleton"
import TimeVocal from '../../vocalize/time.vocal'
import SentenceGenerator from '../../vocalize/index'
const nlp = require('compromise')

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
    // Check for Person == Samantha/Config
    let command = nlp(utterance)
    let person = command.people().json().filter((person:any)=>{
      return person.text === String(Memory.get('name')).toLowerCase()
    })
    
    if(person.length <= 0) return []

    Memory.setForce('listen', true)

    let timeVocal = new TimeVocal()

    let Sentence = SentenceGenerator.generate(
      this.getTag(), 
      {time: timeVocal.timeOfDay()}, utterance
    )
    
    response.push(new IntentViewRespose(this.getTag(), Sentence))
    response.push(new IntentSpeakResponse(Sentence))

    return response
  }
}
