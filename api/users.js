const express = require('express')
const app = express()
const ash = require('express-async-handler')
const { createUserCollection } = require('../api/utility/users.collection')
const usersCtrl = require('./controller/users.ctrl.js')
let newUserCount = 0

app.use(async (req, res, next) => {
  newUserCount = !app.locals.users
    ? 60
    : newUserCount === 0
      ? 0
      : newUserCount - app.locals.users.length
  if (newUserCount > 0) {
    const users = await createUserCollection(newUserCount)
    if (!app.locals.users) {
      app.locals.users = users
    } else {
      app.locals.users = app.locals.users.concat(users)
    }
  }
  next()
})

app.get('/', usersCtrl.index)

app.get('/statics', ash(usersCtrl.statics))

module.exports = app
