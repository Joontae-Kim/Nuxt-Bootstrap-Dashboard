const express = require('express')
const app = express()
const ash = require('express-async-handler')
const eventCtrl = require('../api/controller/event.ctrl')

app.get('/', ash(eventCtrl.index))

module.exports = app
