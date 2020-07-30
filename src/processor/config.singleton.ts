class ConfigSingleton {
  data:object
  constructor(){
   this.data = {
    listen: true
   }
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

const ConfigSingletonInstance = new ConfigSingleton();
Object.freeze(ConfigSingletonInstance);

export default ConfigSingletonInstance