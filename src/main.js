const ChromeLauncher = require('chrome-launcher');
 
ChromeLauncher.launch({
  startingUrl: `file://${__dirname}/index.html`
}).then(chrome => {
  console.log(`Chrome debugging port running on ${chrome.port}`);
});