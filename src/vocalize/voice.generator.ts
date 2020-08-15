import { execSync } from 'child_process'
import fs from 'fs'
const md5 = require('js-md5');


export default class VoiceGenerator 
{
  voiceGeneratorPath: string
  voiceOutputPath: string
  constructor() {
    this.voiceGeneratorPath = `${process.cwd()}/bin/google.translate.sh`
    this.voiceOutputPath = `${process.cwd()}/public/voices`
  }

  addslashes(str:string) {
    return str.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}


  getVoice(sentence:string)
  {
    try {
      let filehash = md5(sentence)
      if(fs.existsSync(`${this.voiceOutputPath}/${filehash}.mp3`)) {
        return `/public/voices/${filehash}.mp3`
      } else {
        
        console.log(`Getting voice for '${this.addslashes(sentence)}'`)
        let execute = execSync(`${this.voiceGeneratorPath} ${this.addslashes(sentence)}`)
        console.log(execute.toString())
        fs.renameSync(
          `${process.cwd()}/bin/voice.mp3`,
          `${this.voiceOutputPath}/${filehash}.mp3`
        )
        return `/public/voices/${filehash}.mp3`
      }
    } 
    catch(e) 
    {
      console.error(e)
      throw e
    }
  }
}