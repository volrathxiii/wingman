import WorkerAbstract from './worker.abstract'
import {IntentSpeakResponse} from '../services/intent.abstract'

export default class StopListenWorker extends WorkerAbstract
{
  constructor()
  {
    super(`stoplisten`)
  }

  MessageEvent(message:string, self: WorkerAbstract):void
  {
    console.log(`WORKER`, message)
    let data = JSON.parse(message)
    
    if(data.type === IntentSpeakResponse.name) {
      console.log('setup timer')
    } else {
      console.log(`not set`)
    }
  }

  Send(data:string|object):void
  {

  }
}


new StopListenWorker()