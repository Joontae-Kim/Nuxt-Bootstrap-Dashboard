const { createEventFullSet, searchEvent, createNewEvent, updateEventElement, deleteEventElement, createEventDetail, getRelativeEvent } = require('../lib/event')
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
    const searched = eventSet.find(event => event._id.toString() === req.params.id)
    if (searched === undefined) {
      return next(new ErrorHandler('404', 'Not_Found'))
    }
    await delay()
    const _event = Object.assign({}, searched)
    const event = await createEventDetail(_event)
    if (event.eventType.length) {
      event.relative = await getRelativeEvent(eventSet, event.eventType)
    }
    res.status(200).send({ event })
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
      eventSet[eventIdx] = updatingEvent = await updateEventElement(updatingEvent, req.body.data)
    }

    // Search the latest updated event
    const _event = Object.assign({}, eventSet[eventIdx])
    const event = await createEventDetail(_event)
    if (event.eventType.length) {
      event.relative = await getRelativeEvent(eventSet, event.eventType)
    }
    res.status(200).send({ event })
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

const getStatics = async (req, res, next) => {
  try {
    await delay()

    const salesSegment = eventSet.reduce((segment, { sales }) => {
      const [unit, first] = [[...sales.toString()].length, [...sales.toString()][0]]
      const datalabel = unit < 3 ? 99 : (Number(first) * Math.pow(10, unit - 1))
      const segIndex = segment.findIndex(({ label }) => label === datalabel)
      if (segIndex === -1) {
        segment.push({
          label: datalabel,
          count: 1,
          total: sales
        })
      } else {
        segment[segIndex].count += 1
        segment[segIndex].total += sales
      }
      return segment
    }, [])

    const viewsSegment = eventSet.reduce((segment, { views }) => {
      const [unit, first] = [[...views.toString()].length, [...views.toString()][0]]
      const datalabel = unit < 3 ? 99 : (Number(first) * Math.pow(10, unit - 1))
      const segIndex = segment.findIndex(({ label }) => label === datalabel)
      if (segIndex === -1) {
        segment.push({
          label: datalabel,
          count: 1,
          total: views
        })
      } else {
        segment[segIndex].count += 1
        segment[segIndex].total += views
      }
      return segment
    }, [])
    const dayjs = require('dayjs')
    const sortedEventSet = await sortByDate(eventSet, 'openAt')
    const openMonthSegment = sortedEventSet.reduce((segment, { openAt, sales }) => {
      const [year, month] = [dayjs(openAt).get('year'), dayjs(openAt).add(1, 'month').get('month')]
      const datalabel = `${year}/${month}`
      const segIndex = segment.findIndex(({ label }) => label === datalabel)
      if (segIndex === -1) {
        segment.push({
          label: datalabel,
          count: 1,
          sales
        })
      } else {
        segment[segIndex].count += 1
        segment[segIndex].sales += sales
      }
      return segment
    }, [])

    res.status(200).send({ salesSegment, viewsSegment, openMonthSegment })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const getEventStatics = async (req, res, next) => {
  try {
    await delay()
    const staticRes = { rate: 0, upcoming: 0 }
    if (req.query.openAt) {
      const rateSearched = await searchEvent(eventSet, { openAt: req.query.openAt, openAtQuery: 'same' })
      staticRes.rate = rateSearched.length
    }

    if (req.query.upcomingDate) {
      const upcomingSearched = await searchEvent(eventSet, { openAt: req.query.upcomingDate, openAtQuery: 'future' })
      staticRes.upcoming = upcomingSearched.length
    }

    res.status(200).send({ total: eventSet.length, ...staticRes })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  index,
  getEvent,
  getStatics,
  getEventStatics,
  createEvent,
  updateEvent,
  deleteEvent
}
