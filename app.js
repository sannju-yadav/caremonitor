const express = require('express')
const controller = require('./controllers/heartRate')
const { errorHandler } = require('./constants/errors')
const app = express()

app.use(express.json({ limit: '1mb' }))

const PORT = 3000

app.post('/process', async (req, res) => {
  try {
    const response = await controller.processHeartRate(req.body)
    res.send(response)
  } catch (err) {
    console.log("--->",err)
    res.status(500).send(errorHandler(500,err))
  }
})

app.listen(PORT, () => {
  console.log(`Listening on PORT : ${PORT}`)
})
