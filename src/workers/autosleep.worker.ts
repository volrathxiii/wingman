import WorkerAbstract from './worker.abstract'
import {IntentSpeakResponse} from '../services/intent.abstract'
import {MemoryFetch, MemoryStore} from '../memory/memory.client'

export class AutoSleepWorker extends WorkerAbstract
{
  private timeout:any
  private autosleep: number
  constructor()
  {
    super(`stoplisten`)
    this.autosleep = parseInt(MemoryFetch('autosleep'))
  }

  MessageEvent(message:string, self: WorkerAbstract):void
  {
    
    let data = JSON.parse(message)
    
    if(data.type === IntentSpeakResponse.name) {
      if(this.autosleep > 0) {
        console.info(`WORKER:autosleep in ${this.autosleep} seconds`)
        clearTimeout(this.timeout)
        this.timeout = setTimeout(()=>{
          // Set to not listen
          MemoryStore(`listen`, false)
          console.info(`WORKER:autosleep triggered`)

        }, this.autosleep * 1000)
      }
    }
  }

  Send(data:string|object):void
  {

  }
}

// Initiate Worker
let WorkerProcess = new AutoSleepWorker()
export default WorkerProcess