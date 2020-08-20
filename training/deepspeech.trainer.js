const {argv} = require('yargs')
const fs = require('fs')
const path = require('path')
const recorder = require('./microphone.recorder.js')

// check if --file exists
if(typeof argv.file === 'undefined') throw new Error(`--file is not set`)
if(!fs.existsSync(argv.file)) throw new Error(`Given --file does not exists.`)
let file = argv.file
let recordingRootPath = `${process.cwd()}/tmp/deepspeech`
let recordingBase = path.basename(argv.file)
let recordingPath = `${recordingRootPath}/${recordingBase}`
// check if recording directory exists
// cancel if it is already done
if(fs.existsSync(recordingPath) && typeof argv.force === 'undefined') throw new Error(`You have already trained for the given file. Use --force to train again.`)

// create tmp directory
fs.mkdirSync(recordingPath, { recursive: true })

let csv = []
csv.push(['wav_filename','wav_filesize','transcript'])

let timercount = 0


let document = fs.readFileSync(file).toString()
let trainData = document.split(/\r?\n/)

for(let u=0; u<trainData.length; u++){
  timercount = timercount+1
  let utterance = trainData[u]

  setTimeout(()=>{
    setTimeout(async()=>{
      let recorded = await recorder(utterance, recordingPath)
      var stats = fs.statSync(`${recordingPath}/${recorded}`)
      csv.push([`${recordingPath}/${recorded}`,stats['size'],utterance])
    }, 3000)
    
  }, 10000*u)
}

setTimeout(()=>{
  console.log(csv)

  let lines = []

  csv.forEach(items=>{
    lines.push([items.join(`,`)])
  })

  console.log(lines)
  fs.writeFile(`${recordingPath}/train.data.csv`, lines.join('\n'), function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });

  
}, 13000*timercount)


// trainFiles.forEach(file => {
//   file = `${__dirname}/${file}`
//   if(fs.existsSync(file)) {
//     let document = fs.readFileSync(file).toString()
//     let trainData = document.split(/\r?\n/)

//     trainData.forEach(async(utterance) => {

//       let recorded = await recorder(utterance, recordingPath)
//       var stats = fs.statSync(`${recordingPath}/${recorded}`)
//       csv.push([`${recordingPath}/${recorded}`,stats['size'],utterance])
      
//     });
//   }else{
//     console.log(file, 'dont exists')
//   }
// });

console.log(csv)