import {IntentAbstract} from "../intent.abstract"

export default class TimeNowIntent extends IntentAbstract
{
  label: string;
  utterances: string[];

  constructor() {
    super()
    this.label = `timenow`;
    this.utterances = [
      `what time is it`,
      `what is the time`,
      `time now`,
    ]
  }
}