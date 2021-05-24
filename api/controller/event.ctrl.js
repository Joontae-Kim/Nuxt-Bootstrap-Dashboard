const { createEventFullSet } = require('../utility/event')

const index = async (req, res, next) => {
  try {
    res.status(200).send({
      list: await createEventFullSet()
    })
  } catch (e) {
    res.status(400).send({ message: e.message })
  }
}

module.exports = {
  index
}
