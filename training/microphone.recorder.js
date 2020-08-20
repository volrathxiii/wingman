const mic = require('mic');
const fs = require('fs');
const md5 = require('js-md5');

let record = async function(file, path){
  return new Promise((resolve, reject)=>{
    var micInstance = mic({
      rate: '16000',
      binwidth: '16',
      channels: '1',
      debug: true,
      exitOnSilence: 2,
      fileType: 'wav'
    });

    var micInputStream = micInstance.getAudioStream();
    
    var outputFileStream = fs.WriteStream(`${path}/${file}.wav`);
    
    micInputStream.pipe(outputFileStream);
    
    micInputStream.on('data', function(data) {
        console.log("Recieved Input Stream: " + data.length);
    });
    
    micInputStream.on('error', function(err) {
        cosole.log("Error in Input Stream: " + err);
    });

    micInputStream.on('silence', function() {
      console.log("Got SIGNAL silence");
    });
    
    micInputStream.on('startComplete', function() {
        console.log("Recording started");
        setTimeout(function() {
          micInstance.stop();
          resolve(`${file}.wav`)
        }, 5000);
    });
  
    
    micInstance.start();
  })
}

let recordTimer = async function(words, path)
{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{console.log(`Recording for: ${words}`)}, 2000)
    let file = md5(words)
    setTimeout(async ()=>{
      let output = await record(file, path)
      resolve(output)
    }, 5000)
  })
  
}

module.exports = recordTimer

// async function test(){
//   let timer = await recordTimer('hello world','./training')
//   console.log(timer, '--output')
// }

// test()

