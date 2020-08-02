import {IntentAbstract, IntentSpeakResponse, IntentViewRespose, IntentResponse} from "../intent.abstract"
import Moment from 'moment'
import TimeVocal from '../../vocalize/time.vocal'
import SentenceGenerator from '../../vocalize/index'

export default class TimeNowIntent extends IntentAbstract
{
  label: string

  constructor(serviceName?:string) {
    super(serviceName)

    this.label = `timenow`
  }

  execute(utterance:string): Array<IntentResponse>
  {
    let response = []

    let time = Moment().format('LT');

    let timeVocal = new TimeVocal()

    let Sentence = SentenceGenerator.generate(
      `${this.service}.${this.label}`, 
      {time: timeVocal.random()}, utterance
    )
    
    response.push(new IntentViewRespose(`${this.service}-${this.label}`, time))
    response.push(new IntentSpeakResponse(Sentence))

    return response
  }
}