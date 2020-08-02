import {ServiceInterface} from "./service.abstract"
import {IntentInterface} from "./intent.abstract"
import {sync} from "glob"

export default class Services
{
  protected services: {[key:string]: ServiceInterface}
  protected intents: Array<IntentInterface>

  constructor()
  {
    this.services = {}
    this.intents = []
    this.loadServices()
    this.loadIntents()
  }
  
  /**
   * Returns all services
   */
  all():Array<ServiceInterface>
  {
    return Object.values(this.services)
  }

  getAllIntents(): Array<IntentInterface>
  {
    return this.intents
  }
  /**
   * Return specific service
   * @param name 
   */
  get(name: string):ServiceInterface
  {
    if(typeof this.services[name] === 'undefined') throw new Error('Undefined service!')
    return this.services[name]
  }

  addService(service: ServiceInterface):void
  {
    this.services[service.name] = service
  }

  private loadServices():void
  {
    let serviceFiles = sync(`./**/*.service.*(ts|js)`, {cwd:__dirname})

    serviceFiles.forEach((moduleFile:string) => {
      let module = require(moduleFile)
      this.addService(module.default)   
    })
  }

  private loadIntents(): void
  {
    this.intents = []
    this.all().forEach((service)=>{
      service.getIntents().forEach((intent) => {
        this.intents.push(intent)
      })
    })
  }
}
