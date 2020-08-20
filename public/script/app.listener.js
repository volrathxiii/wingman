'use strict';
const ws = new WebSocket(`wss://localhost:8081`);

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
  if(response.type === "IntentVoiceResponse") {
    speakResponse(`..`+response.data)
  }
})