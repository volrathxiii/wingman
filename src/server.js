const express = require('express')
const fs = require('fs')
const https = require('https')
const app = express()
const port = 8080

app.get('/', (req, res) => res.send('Hello World!'))

https.createServer({
  key: fs.readFileSync('cert/server.key'),
  cert: fs.readFileSync('cert/server.cert')
}, app).listen(port, () => {
  console.log(`Listening to port ${port}`)
})
