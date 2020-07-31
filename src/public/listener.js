'use strict';
const ws = new WebSocket("ws://localhost:8081");

if ("webkitSpeechRecognition" in window) {
  var recognition = new window.webkitSpeechRecognition();
  let recognitionEnabled = true

  // This will run when the speech recognition service returns a result
  recognition.onstart = function() {
    console.log("Voice recognition started.");
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
    let viewElement = document.getElementById(id)
    if(!viewElement) {
      viewElement = document.createElement("DIV");
      viewElement.setAttribute('id', id)
      viewElement.innerHTML = view
      document.body.appendChild(viewElement)
    } else {
      viewElement.innerHTML = view
    }
  }
  
  ws.addEventListener("open", ()=>{
    console.log('Connected to WebSocket!')
  })
  
  ws.addEventListener("message",(event)=>{
    let response = JSON.parse(event.data)
  
    if(response.type === "IntentViewRespose") ViewResponse(response.data.id, response.data.html)
    if(response.type === "IntentSpeakResponse") SpeakResponse(response.data)
  })

  SpeakResponse(``)
} else {
  console.log("Speech recognition not supported 😢");
  // code to handle error
}