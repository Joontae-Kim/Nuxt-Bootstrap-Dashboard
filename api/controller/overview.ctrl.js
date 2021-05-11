const { randomIndex, createSerialRandom } = require('../utility/createRandom')
const { randomEventSet } = require('../utility/event')

const index = (req, res, next) => {
  try {
    const total = {
      visitor: randomIndex(100000, 300000),
      rate: randomIndex(20, 50, false)
    }
    const newVisitor = {
      visitor: randomIndex(1000, 5000),
      rate: randomIndex(10, 30, false)
    }
    const shareDesktop = randomIndex(30, 40)
    const share = { desktop: shareDesktop, mobile: 100 - shareDesktop }
    const viewsPerMinute = {
      views: randomIndex(150, 500),
      rate: randomIndex(1, 15, false)
    }
    const channels = { organic: randomIndex(30, 50) }
    channels.direct = randomIndex(10, channels.organic)
    channels.social = randomIndex(10, channels.direct)
    channels.paid = 100 - channels.social - channels.direct - channels.organic
    const visitbyNotification = { push: randomIndex(30, 50) }
    visitbyNotification.email = randomIndex(10, visitbyNotification.push)
    visitbyNotification.direct = 100 - visitbyNotification.push - visitbyNotification.email
    res.send({
      total,
      newVisitor,
      share,
      viewsPerMinute,
      channels,
      visitbyNotification,
      sales: createSerialRandom(20, 40, 7),
      eventRank: randomEventSet(5)
    })
  } catch (e) {
    res.status(400).send({ message: e.message })
  }
}

module.exports = {
  index
}
