const axios = require('axios')
const { randomIndex } = require('../utility/createRandom')
const { usersSample } = require('../utility/users.sample.collection')
const { randomDate } = require('./dates')

function resamplingUserCollection (users) {
  return new Promise((resolve, reject) => {
    const userStatus = ['Active', 'Inactive', 'Not Yet Activated', 'Pending Approval']
    const authTypes = ['E-mail', 'Google', 'Facebook', 'Github']
    const resampling = users.reduce((sampling, user) => {
      let resampleUser = {}
      // eslint-disable-next-line camelcase
      const { id, uid, password, first_name, last_name, username, email, avatar, gender, phone_number, date_of_birth, address, credit_card, subscription } = user
      const userProps = { id, uid, password, first_name, last_name, username, email, avatar, gender, phone_number, date_of_birth, address, credit_card, subscription }
      const randomIdx = randomIndex(0, 3)
      const status = userStatus[randomIdx]
      let createdAt = null
      if (['Not Yet Activated', 'Pending Approval'].includes(status)) {
        createdAt = randomDate(new Date(2021, 5, 1))
        userProps.credit_card = null
        userProps.subscription = null
        resampleUser.payment = null
        resampleUser.lastSignedin = randomDate(createdAt, new Date())
      } else {
        createdAt = randomDate(new Date(2020, 11, 1), new Date(2021, 3, 30))
        resampleUser.payment = userProps.subscription.payment_method
        resampleUser.lastSignedin = randomDate(new Date(2021, 4, 15), new Date())
      }

      if (userProps.address) {
        const address = userProps.address
        userProps.address.full = `${address.street_address} ${address.street_name} ${address.city} ${address.state} ${address.country} ${address.zip_code}`
      }

      resampleUser.createdAt = createdAt
      resampleUser.modifiedAt = createdAt
      resampleUser.status = status
      resampleUser.authentication = authTypes[randomIdx]
      resampleUser = { ...userProps, ...resampleUser }
      sampling.push(resampleUser)
      return sampling
    }, [])
    resolve(resampling)
  })
}

const usersMaximum = 60
export async function createUserCollection (count = usersMaximum) {
  if (process.env.NODE_ENV === 'development') {
    const resamplingUsers = await resamplingUserCollection(usersSample)
    return resamplingUsers
  } else {
    const randomUsers = await axios('https://random-data-api.com/api/users/random_user', {
      params: { size: count }
    })
    const resamplingUsers = await resamplingUserCollection(randomUsers.data)
    return resamplingUsers
  }
}
