import {IntentAbstract, IntentSpeakResponse, IntentViewRespose, IntentResponse} from "../intent.abstract"
import * as Moment from 'moment'

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
    
    response.push(new IntentViewRespose(`${this.service}-${this.label}`, time))
    response.push(new IntentSpeakResponse(String(time).replace(':',' ')))

    return response
  }
}