const glob = require('glob')
const fs = require('fs')

let trainFiles = glob.sync(`training/**/*.train.txt`, {path: __dirname})
let recordingRootPath = `${process.cwd()}/tmp/deepspeech`

let lines = []
for(let i=0; i<trainFiles.length; i++){
  let document = fs.readFileSync(trainFiles[i]).toString()
  let trainData = document.split(/\r?\n/)

  for(let u=0; u<trainData.length; u++){
    lines.push(trainData[u])
  }
}

fs.writeFile(`${recordingRootPath}/vocabulary.txt`, lines.join('\n'), function (err) {
  if (err) throw err;
  console.log(`Updated ${recordingRootPath}/vocabulary.txt`);
});

// console.log(trainFiles)