'use strict';
const ws = new WebSocket("ws://localhost:8081");

const SpeakResponse = function(message) {
  document.querySelector('body').click();
  var utterance = new SpeechSynthesisUtterance(message);
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

if ("webkitSpeechRecognition" in window) {
  function Listen() {
    var recognition = new window.webkitSpeechRecognition();

    // This will run when the speech recognition service returns a result
    recognition.onstart = function() {
      console.log("Voice recognition started.");
    };

    recognition.onend = function(arg) {
      window.dispatchEvent(new CustomEvent("StartListen"));
      // Restart();
      // recognition.start();
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
    recognition.start();
  }

  window.addEventListener("StartListen", ()=>{
    setTimeout(Listen, 500)
  });
  window.dispatchEvent(new CustomEvent("StartListen"));
} else {
  console.log("Speech recognition not supported 😢");
  // code to handle error
}