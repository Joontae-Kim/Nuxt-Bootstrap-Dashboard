const { randomIndex, createSerialRandom } = require('../utility/createRandom')
const { randomEventSet } = require('../lib/event')
const { getStartOfMonth, createDateArray } = require('../utility/dates')
const { mergeSalesAndDate } = require('../utility/sales')

const index = (req, res, next) => {
  try {
    const total = {
      visits: randomIndex(10000, 30000),
      rate: randomIndex(20, 50, false)
    }
    const newUser = {
      users: randomIndex(50, 100),
      rate: randomIndex(10, 30, false)
    }
    const activeUser = {
      users: randomIndex(100, 200),
      rate: randomIndex(10, 30, false)
    }
    const shareDesktop = randomIndex(30, 40)
    const share = { desktop: shareDesktop, mobile: 100 - shareDesktop }
    const channels = { organic: randomIndex(35, 30) }
    channels.direct = randomIndex(20, 25)
    channels.social = randomIndex(20, 25)
    channels.paid = 100 - (channels.social + channels.direct + channels.organic)
    const visitbyNotification = { push: randomIndex(15, 25) }
    visitbyNotification.sns = randomIndex(15, 25)
    visitbyNotification.email = randomIndex(15, 20)
    visitbyNotification.link = randomIndex(15, 20)
    visitbyNotification.ads = 100 - (visitbyNotification.push + visitbyNotification.sns + visitbyNotification.email + visitbyNotification.link)
    const dataArrStart = getStartOfMonth()
    const [sales, dates] = [createSerialRandom(20, 40, 30), createDateArray(dataArrStart, new Date())]

    setTimeout(() => {
      res.send({
        total,
        newUser,
        activeUser,
        share,
        channels,
        visitbyNotification,
        sales: {
          list: mergeSalesAndDate(sales, dates),
          maxSales: Math.max.apply(null, sales)
        },
        eventRank: randomEventSet(5)
      })
    }, 1500)
  } catch (e) {
    res.status(400).send({ message: e.message })
  }
}

module.exports = {
  index
}
