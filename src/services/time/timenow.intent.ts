import {IntentAbstract, IntentSpeakResponse, IntentViewRespose, IntentResponse} from "../intent.abstract"

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

    let date = new Date();
    let hours = date.getHours();
    
    let hour = (hours>12) ? hours - 12 : hours
    hour = (hour<1) ? 12 : hour
    let hourSuffix = (hours>12) ? "PM" : "AM"

    let time = `${hour}:${date.getMinutes()} ${hourSuffix}`
    
    response.push(new IntentViewRespose(`${this.service}-${this.label}`, time))
    response.push(new IntentSpeakResponse(String(time).replace(':',' ')))

    return response
  }
}