import express from 'express'
import ctrl from './controller/overview.ctrl.js'
const app = express()

app.get('/', ctrl.index)

module.exports = app
