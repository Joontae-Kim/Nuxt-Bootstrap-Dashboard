// Error Sender
class ErrorHandler extends Error {
  constructor (statusCode, message, submessage, type) {
    super()
    this.statusCode = statusCode || 400
    this.message = message
    this.submessage = submessage
    this.type = typeof type === 'undefined' ? 'default' : type
  }
}

const handleError = (err, req, res, next) => {
  let { statusCode } = err
  const { message, submessage, type } = err
  const errorSet = {}
  statusCode = statusCode || 400
  errorSet.message = message || 'Bad Request'
  if (submessage) {
    errorSet.submessage = submessage
  }
  errorSet.type = type || 'default'
  res.status(statusCode).json(errorSet)
}

module.exports = {
  ErrorHandler,
  handleError
}
