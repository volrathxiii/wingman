import WorkerAbstract from './worker.abstract'
import {IntentSpeakResponse} from '../services/intent.abstract'
import {MemoryFetch, MemoryStore} from '../memory/memory.client'
const { execSync } = require('child_process');

function executeGitCommand(command:string) {
  return execSync(command)
    .toString('utf8')
    .replace(/[\n\r\s]+$/, '');
}


export class SystemUpdateWorker extends WorkerAbstract
{
  private interval:any
  constructor()
  {
    super(`systemupdate`)
    this.interval = null
  }

  boot()
  {
    this.interval = setInterval(()=>{
      this.checkUpdates()
    }, 1000 * 60 * 1 /* every 5 minutes */)
  }

  checkUpdates():boolean
  {
    if(MemoryFetch(`listen`) == 'true') return false
    let gitfetch = executeGitCommand(`git fetch`)
    console.log(gitfetch, `---git fetch`)

    return true
  }

  applyUpdates()
  {

  }
}

// Initiate Worker
let SystemUpdateWorkerProcess = new SystemUpdateWorker()
export default SystemUpdateWorkerProcess