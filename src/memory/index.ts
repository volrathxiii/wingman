require('dotenv').config()

import express from 'express'
import pm2 from 'pm2'
import bodyParser from 'body-parser'
import  Memory from './memory.singleton'

// ProcessManager
pm2.connect((err)=>{
  if (err) {
    console.error(err)
    process.exit(2)
  }
})

// Server
const app = express()
const port = process.env.MEMORYSERVER_PORT || 8082

app.use(bodyParser.json());

app.get('/get/:configName', (req, res) => {
  let result = Memory.get(req.params.configName)
  console.info(`Get: ${req.params.configName} -> ${JSON.stringify(result)}`)

  res.json({
    status: 'ok',
    data: result
  })
})

app.post('/set/:configName', (req, res) => {
  console.info(`Set: ${req.params.configName} -> ${JSON.stringify(req.body)}`)
  Memory.setForce(req.params.configName, req.body.value)
  res.json({
    status: 'ok'
  })
})


app.listen(port, () => {
  console.log(`MemoryServer Port: ${port}`)
})