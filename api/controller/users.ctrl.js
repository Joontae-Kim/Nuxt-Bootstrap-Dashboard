const { createUsersTraffic } = require('../lib/users')
const { randomIndex } = require('../utility/createRandom')
const delay = require('../utility/delayResponse')

const index = async (req, res, next) => {
  try {
    await delay()
    res.status(200).send({ list: req.app.locals.users })
  } catch (err) {
    next(err)
  }
}

const statics = async (req, res, next) => {
  try {
    await delay()
    const { staticDate, staticCount } = req.query
    const { serialTraffic, timeSeriesTraffic } = await createUsersTraffic(staticDate, staticCount)
    const total = {
      value: randomIndex(900, 1300),
      rate: randomIndex(7, 17, false, 1)
    }
    const newUsers = {
      rate: randomIndex(4, 13, false, 1)
    }
    newUsers.value = Math.floor(total.value * (newUsers.rate / 100))
    const activeUsers = {
      rate: randomIndex(34, 56, false, 1)
    }
    activeUsers.value = Math.floor(total.value * (activeUsers.rate / 100))
    const groupByUsers = { Active: activeUsers.value }
    groupByUsers.Pending_Approval = Math.floor(total.value * (randomIndex(3, 10, false, 1) / 100))
    groupByUsers.Not_Yet_Activated = Math.floor(total.value * (randomIndex(4, 9, false, 1) / 100))
    const groupByValues = Object.values(groupByUsers).reduce((sum, val) => sum + val, 0)
    groupByUsers.Inactive = total.value - groupByValues
    res.status(200).send({ total, newUsers, activeUsers, groupByUsers, weekSerial: serialTraffic, timeSerial: timeSeriesTraffic })
  } catch (err) {
    console.log(`        ~ err => `, err)
    console.log(`        ~ err.message => `, err.message)
    next(err)
  }
}

module.exports = {
  index,
  statics
}
