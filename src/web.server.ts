require('dotenv').config();

import express from 'express';
import * as nunjucks from 'nunjucks';
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';
const app = express()
const port = process.env.WEBSERVER_PORT || 8080

nunjucks.configure(path.join(process.cwd(), 'views'), {
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
  key: fs.readFileSync('cert/localhost.key'),
  cert: fs.readFileSync('cert/localhost.crt')
}, app).listen(port, () => {
  console.log(`WebServer Port: ${port}`)
  if(typeof process.send === 'function') process.send('ready');
})
