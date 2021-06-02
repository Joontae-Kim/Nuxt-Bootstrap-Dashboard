const { createEventFullSet, searchEvent, createNewEvent, updateEventElement, deleteEventElement } = require('../lib/event')
const delay = require('../utility/delayResponse')
const { ErrorHandler } = require('../utility/error')
const { sortByDate } = require('../utility/dates')

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
      if (reqQuery.eventType) { query.type = reqQuery.eventType.split(',').map(type => type.trim()) }

      if (reqQuery.views) {
        query.views = { value: reqQuery.views }
        if (reqQuery.viewsCondition) {
          query.views.condition = reqQuery.viewsCondition
        }
      }

      if (reqQuery.bounce) {
        query.bounce = { value: reqQuery.bounce }
        if (reqQuery.bounceCondition) {
          query.bounce.condition = reqQuery.bounceCondition
        }
      }

      if (reqQuery.sales) {
        query.sales = { value: reqQuery.sales }
        if (reqQuery.salesCondition) {
          query.sales.condition = reqQuery.salesCondition
        }
      }
      list = await searchEvent(eventSet, query)
    }
    list = await sortByDate(list, 'openAt')
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
    await delay(2000)
    const newEvent = createNewEvent(req.body)
    eventSet.unshift(newEvent)
    res.status(200).send({ list: eventSet })
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
    await delay()
    const { single, deleting } = req.body
    const _deleting = single ? [deleting] : deleting
    const deletedEventSet = await deleteEventElement(eventSet, _deleting)
    eventSet = deletedEventSet
    res.status(200).send({ list: deletedEventSet })
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
