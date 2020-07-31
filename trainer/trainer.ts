// here we add some training if needed for classifiers
import SentenceGenerator from "../src/language/sentence.generator"

let gen = new SentenceGenerator()
gen.addFile(`${process.cwd()}/language/training/responses/time.timenow.response.json`, 'time.timenow')
gen.train()

let value = gen.generate(`time.timenow`, {time:'10PM'}, `that is the time now`)

console.log(value)