const express = require('express')
const app = express()
const ash = require('express-async-handler')
const eventCtrl = require('./controller/event.ctrl')
const eventMdwr = require('./middleware/event.mdwr')
const { handleError } = require('./utility/error')

app.get('/', ash(eventCtrl.index))

app.get('/eventStatics', ash(eventCtrl.getEventStatics))

app.get('/statics',
  ash(eventCtrl.getStatics)
)

app.get('/:id', ash(eventCtrl.getEvent))

app.post('/',
  eventMdwr.checkCreateEvent,
  ash(eventCtrl.createEvent)
)

app.put('/:id',
  ash(eventCtrl.updateEvent)
)

app.delete('/',
  ash(eventCtrl.deleteEvent)
)

app.use(handleError)

module.exports = app
