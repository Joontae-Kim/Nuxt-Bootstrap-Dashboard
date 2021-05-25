const { randomIndex } = require('./createRandom')

function delayResponse (timeout = null) {
  return new Promise((resolve) => {
    if (!timeout) {
      timeout = randomIndex(1500, 2000)
    }
    setTimeout(() => { resolve(true) }, timeout)
  })
}

module.exports = delayResponse
