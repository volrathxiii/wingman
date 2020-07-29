'use strict';

if ("webkitSpeechRecognition" in window) {
  function Listen() {
    var recognition = new window.webkitSpeechRecognition();

    // This will run when the speech recognition service returns a result
    recognition.onstart = function() {
      console.log("Voice recognition started. Try speaking into the microphone.");
    };

    recognition.onend = function(arg) {
      console.log("stopped listening", arg);
      window.dispatchEvent(new CustomEvent("StartListen"));
      // Restart();
      // recognition.start();
    };
    
    recognition.onresult = function(event) {
      var resultId = event.resultIndex;
      var transcript = event.results[resultId][0].transcript;
      console.log(transcript);
    };
    
    // start recognition
    recognition.continuous = true;
    recognition.start();
  }

  window.addEventListener("StartListen", ()=>{
    setTimeout(Listen, 500)
  });
  window.dispatchEvent(new CustomEvent("StartListen"));
  
  // function Restart() {
  //   setTimeout(()=>{
  //     Listen();
  //   }, 200)
  // }

  // function Listen() {
  //   var recognition = new window.webkitSpeechRecognition();

  //   // This will run when the speech recognition service returns a result
  //   recognition.onstart = function() {
  //     console.log("Voice recognition started. Try speaking into the microphone.");
  //   };

  //   recognition.onend = function(arg) {
  //     console.log("stopped listening", arg);
  //     Restart();
  //     // recognition.start();
  //   };
    
  //   recognition.onresult = function(event) {
  //     var resultId = event.resultIndex;
  //     var transcript = event.results[resultId][0].transcript;
  //     console.log(transcript);
  //   };
    
  //   // start recognition
  //   recognition.continuous = true;
  //   recognition.start();
  // }
  // // new speech recognition object
  // Restart();
  //   .....
} else {
  console.log("Speech recognition not supported 😢");
  // code to handle error
}