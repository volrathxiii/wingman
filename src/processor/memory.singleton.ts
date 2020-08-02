require('dotenv').config()

import * as fs from 'fs'
import * as path from 'path'

class MemorySingleton {
  data:{[key:string]: any}
  constructor(){
    this.data = {}
    if(!this.loadMemory()) {
      this.data = require(`${process.cwd()}/config.json`)
    }
  }

  private loadMemory():boolean
  {
    let file = path.join(String(process.env.TEMP_DIR), 'stored.memory.data.json')
    if(fs.existsSync(file)) {
      this.data = require(file)
      return true
    }

    return false
  }

  get(config:string)
  {
    return this.data[config]
  }

  setForce(config:string, value:any):void
  {
    console.warn(`ConfigWarn: changing value of ${config} can be dangerous.`)
    this.data[config] = value
  }

  set(config:string, value:any):void
  {
    if(typeof this.data[config] !== 'undefined') {
      console.error(`ConfigError: ${config} is already set. Use [setForce] instead to override.`)
    } else {
      this.data[config] = value
    }
  }
}

const MemorySingletonInstance = new MemorySingleton();
Object.freeze(MemorySingletonInstance);

export default MemorySingletonInstance