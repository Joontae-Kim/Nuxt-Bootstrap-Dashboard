const { createEventFullSet, searchEvent } = require('../utility/event')
const delay = require('../utility/delayResponse')
let eventSet = []
;(async function () {
  eventSet = await createEventFullSet()
})()

const index = async (req, res, next) => {
  try {
    console.log(`index ~ `)
    // console.log(`      ~ `)
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
      console.log(`      ~ query => `, query)
      list = await searchEvent(eventSet, query)
    }
    res.status(200).send({ list })
  } catch (e) {
    console.log(`      ~ e => `, e)
    console.log(`      ~ e.message => `, e.message)
    res.status(400).send({ message: e.message })
  }
}

const getEvent = async (req, res, next) => {
  try {
    let searched = eventSet.find(event => event._id.toString() === req.params.id)
    if (searched === undefined) { searched = null }
    await delay()
    res.status(200).send({ event: searched })
  } catch (e) {
    res.status(400).send({ message: e.message })
  }
}

module.exports = {
  index,
  getEvent
}
