import express from 'express'
const app = express()

app.get('/', (req, res) => {
  console.log('/api/test')
  res.send('/api/test')
})

module.exports = app
