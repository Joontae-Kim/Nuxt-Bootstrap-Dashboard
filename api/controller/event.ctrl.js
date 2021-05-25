const { createEventFullSet, searchEvent, createNewEvent, updateEventElement } = require('../utility/event')
const delay = require('../utility/delayResponse')
const { ErrorHandler } = require('../utility/error')

let eventSet = []
;(async function () {
  eventSet = await createEventFullSet()
})()

const index = async (req, res, next) => {
  try {
    let list = []
    if (!Object.keys(req.query).length) {
      list = eventSet
      await delay()
    } else {
      const [reqQuery, query] = [req.query, {}]
      if (reqQuery.title) { query.title = reqQuery.title }
      if (reqQuery.publishedAt) { query.publishedAt = reqQuery.publishedAt }
      if (reqQuery.openAt) { query.openAt = reqQuery.openAt }
      if (reqQuery.closedAt) { query.closedAt = reqQuery.closedAt }
      if (reqQuery.type) { query.type = reqQuery.type.split(',').map(type => type.trim()) }
      list = await searchEvent(eventSet, query)
    }
    res.status(200).send({ list })
  } catch (e) {
    next(e)
  }
}

const getEvent = async (req, res, next) => {
  try {
    let searched = eventSet.find(event => event._id.toString() === req.params.id)
    if (searched === undefined) { searched = null }
    await delay()
    res.status(200).send({ event: searched })
  } catch (e) {
    next(e)
  }
}

const createEvent = async (req, res, next) => {
  try {
    const newEvent = createNewEvent(req.body)
    eventSet.push(newEvent)
    await delay()
    res.status(200).send({ newEvent, list: eventSet })
  } catch (e) {
    next(e)
  }
}

const updateEvent = async (req, res, next) => {
  try {
    await delay()
    const eventIdx = eventSet.findIndex(event => event._id.toString() === req.params.id)
    if (eventIdx < 0) {
      return next(new ErrorHandler('404', 'Not_Found'))
    } else {
      let updatingEvent = eventSet[eventIdx]
      eventSet[eventIdx] = updatingEvent = await updateEventElement(updatingEvent, req.body)
    }
    res.status(200).send({ event: eventSet[eventIdx] })
  } catch (e) {
    next(e)
  }
}

const deleteEvent = async (req, res, next) => {
  try {
    const eventIdx = eventSet.findIndex(event => event._id.toString() === req.params.id)
    if (eventIdx < 0) {
      return next(new ErrorHandler('404', 'Not_Found'))
    } else {
      eventSet.splice(eventIdx, 1)
    }
    res.status(200).send({ eventSet })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  index,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
}
