// here we add some training if needed for classifiers
import SentenceGenerator from "./sentence.generator"
import * as glob from "glob"
import * as path from "path"

const generator = new SentenceGenerator();

const sentenceSavedFile = `${process.cwd()}/tmp/sentence.generator.json`

// Load training if exists
if(!generator.load(sentenceSavedFile)) {
  let trainingFiles = glob.sync(`${process.cwd()}/training/vocalize/**/*.response.txt`)
  
  trainingFiles.map(file=>{
    let fileName = path.basename(file)
    let intentLabel = fileName.replace(`.response.txt`,'')
    
    generator.addFile(file, intentLabel)
  })

  generator.train()
  generator.save(sentenceSavedFile)
}

Object.freeze(generator)

// let value = generator.generate(`time.timenow`, {time:'10PM'}, `that is the time now`)
export default generator