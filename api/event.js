const express = require('express')
const app = express()
const ash = require('express-async-handler')
const eventCtrl = require('../api/controller/event.ctrl')

app.get('/', ash(eventCtrl.index))

app.get('/:id', ash(eventCtrl.getEvent))

module.exports = app
