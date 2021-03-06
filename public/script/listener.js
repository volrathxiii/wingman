'use strict';
const ws = new WebSocket(`wss://${location.hostname}:8081`);


let timerInterval;
class RecordTimer
{
  constructor()
  {
    window.recordCounter = 0;
  }

  reset()
  {
    clearInterval(timerInterval)
    window.recordCounter = 0;
    document.getElementById('recordTimer').innerHTML = window.recordCounter
  }

  start()
  {
    this.reset()
    timerInterval = setInterval(()=>{
      window.recordCounter += 1
      document.getElementById('recordTimer').innerHTML = window.recordCounter
    }, 1000)
  }
}

let recordTimer = new RecordTimer()

if ("webkitSpeechRecognition" in window) {
  var recognition = new window.webkitSpeechRecognition();
  let recognitionEnabled = true

  // This will run when the speech recognition service returns a result
  recognition.onstart = function() {
    console.log("Voice recognition started.");
    recordTimer.start()
  };

  recognition.onerror = function(err) {
    if(err.error !== 'no-speech') console.log(err)
  };

  recognition.onend = function(arg) {
    if(recognitionEnabled) window.dispatchEvent(new CustomEvent("StartListen"));
  };
  
  recognition.onresult = function(event) {
    var resultId = event.resultIndex;
    var transcript = event.results[resultId][0].transcript;
    console.log(`Transcript: `,transcript)
    let data = {
      sender: "client",
      transcript: transcript
    }
    ws.send(JSON.stringify(data))
  };
  
  // start recognition
  recognition.continuous = true;
  
  window.addEventListener("StartListen", ()=>{
    setTimeout(()=>{
      recognition.start();
    }, 500)
  });

  window.dispatchEvent(new CustomEvent("StartListen"));

  const SpeakResponse = function(message) {
    document.querySelector('body').click();
    var utterance = new SpeechSynthesisUtterance(message);
    
    // utterance.voice = window.speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Tessa'; })[0];
    utterance.voice = window.speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Moira'; })[0];
    // utterance.voice = window.speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Samantha'; })[0];
    // utterance.voice = window.speechSynthesis.getVoices().filter(function(voice) { return voice.name == "US English Female TTS (by Google)"; })[0];

    utterance.addEventListener('start',()=>{
      console.log(`starting to talk`)
      recognitionEnabled = false
      recognition.stop()
    })

    utterance.addEventListener('end',()=>{
      console.log(`stop to talk`)
      recognitionEnabled = true
      recognition.start()
    })
  
    window.speechSynthesis.speak(utterance);
  }
  
  const ViewResponse = function(id,view) {

    let systemLogs = document.getElementById('systemLogs')

    let viewElement = document.createElement("DIV");
    viewElement.setAttribute('data-type', id)
    viewElement.innerHTML = view
    // systemLogs.appendChild(viewElement)

    systemLogs.insertBefore(viewElement, systemLogs.firstChild);

    // remove older if more than 50
  }
  
  ws.addEventListener("open", ()=>{
    console.log('Connected to WebSocket!')
  })
  
  ws.addEventListener("message",(event)=>{
    let response = JSON.parse(event.data)
  
    if(response.type === "IntentViewRespose") ViewResponse(response.data.id, response.data.html)
    if(response.type === "IntentSpeakResponse") SpeakResponse(response.data)
    if(response.type === "IntentVoiceResponse") speakResponse(response.data)
  })

  SpeakResponse(``)
} else {
  console.log("Speech recognition not supported 😢");
  // code to handle error
}