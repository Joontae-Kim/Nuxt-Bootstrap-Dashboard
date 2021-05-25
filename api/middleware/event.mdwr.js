// event.mdwr.js
const { ErrorHandler } = require('../utility/error')

const checkCreateEvent = (req, res, next) => {
  const isTitle = req.body.title && req.body.title !== ''
  if (!isTitle) {
    next(new ErrorHandler(400, 'Not_Found', 'Title', 'Validate'))
  } else {
    next()
  }
}

module.exports = {
  checkCreateEvent
}
