import {sync} from 'glob'
import {basename} from 'path'

export default class Workers
{
  private workers: {[key:string]:string}
  constructor()
  {
    let workerFiles = sync(`./build/**/*.worker.*(ts|js)`)
    this.workers = {}
    workerFiles.forEach((moduleFile:string) => {
      let workerName = basename(moduleFile).replace(/(.ts|.js)$/,'')
      this.workers[workerName] = moduleFile
    })
  }

  all()
  {
    return this.workers
  }
}