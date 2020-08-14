import {SystemIntentAbstract, IntentViewRespose, IntentResponse, IntentVoiceResponse} from "../intent.abstract"
import {MemoryFetch, MemoryStore} from "../../memory/memory.client"
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
      return String(person.text).toLowerCase() === String(MemoryFetch('name')).toLowerCase()
    })
    
    if(person.length <= 0) return []

    MemoryStore('listen', true)

    let timeVocal = new TimeVocal()

    let Sentence = SentenceGenerator.generate(
      this.getTag(), 
      {time: timeVocal.timeOfDay()}, utterance
    )
    
    response.push(new IntentViewRespose(this.getTag(), Sentence))
    response.push(new IntentVoiceResponse(Sentence))

    return response
  }

}

