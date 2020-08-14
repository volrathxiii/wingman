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

  getVoice(sentence:string)
  {
    try {
      let filehash = md5(sentence)
      if(fs.existsSync(`${this.voiceOutputPath}/${filehash}.mp3`)) {
        return `/public/voices/${filehash}.mp3`
      } else {
        let execute = execSync(`${this.voiceGeneratorPath} ${sentence}`)
        console.log(execute)
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