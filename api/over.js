import express from 'express'
import ctrl from './controller/overview.ctrl.js'
const app = express()

console.log(ctrl)

app.get('/', ctrl.index)

module.exports = app
