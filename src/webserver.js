require('dotenv').config();

const express = require('express')
const nunjucks = require('nunjucks')
const fs = require('fs')
const https = require('https')
const path = require('path')
const app = express()
const port = process.env.WEBSERVER_PORT || 8080

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app,
  watch: true
});


app.use('/public', express.static('public'))

app.get('/', function(req, res) {
  res.render('index.html', {
    app_name: 'Wingman'
  });
});


https.createServer({
  key: fs.readFileSync('cert/server.key'),
  cert: fs.readFileSync('cert/server.cert')
}, app).listen(port, () => {
  console.log(`WebServer Port: ${port}`)
})
