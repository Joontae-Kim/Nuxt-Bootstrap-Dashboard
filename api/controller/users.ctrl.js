const index = (req, res, next) => {
  try {
    const count = !req.app.locals.users ? 0 : req.app.locals.users.length
    res.status(200).send({ count, list: req.app.locals.users })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  index
}
