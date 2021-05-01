import express from 'express';
const app = express()

app.get('/', (req, res) => {
  try {
    console.log('/api/default')
    throw new Error('Bad_Request')
  } catch (error) {
    res.status(400).send({ message: 'Bad_Request' }) 
  }
})

app.get('/notfound', (req, res) => {
  try {
    console.log('/api/notfound')
    throw new Error('Not_Found')
  } catch (error) {
    res.status(404).send({ message: 'Not_Found' }) 
  }
})

app.get('/serverError', (req, res) => {
  try {
    console.log('/api/serverError')
    throw new Error('Server_Error')
  } catch (error) {
    res.status(500).send({ message: 'Server_Error' }) 
  }
})

module.exports = app