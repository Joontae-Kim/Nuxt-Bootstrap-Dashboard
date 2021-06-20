import dayjs from 'dayjs'

export async function transformMultiUsers (users) {
  // eslint-disable-next-line no-useless-catch
  try {
    const transformedUsers = await users.reduce(async (promise, user, u) => {
      const merged = await promise.then()
      const transformed = await transformUser(user)
      merged.push(transformed)
      return Promise.resolve(merged)
    }, Promise.resolve([]))
    return transformedUsers
  } catch (err) {
    throw err
  }
}

export function transformUser (user) {
  return new Promise((resolve, reject) => {
    try {
      if (user.createdAt) {
        user.createdAt = dayjs(user.createdAt).format('DD/MM/YYYY hh:mm A')
      }

      if (user.modifiedAt) {
        user.modifiedAt = dayjs(user.modifiedAt).format('DD/MM/YYYY hh:mm A')
      }

      if (user.lastSignedin) {
        user.lastSignedin = dayjs(user.lastSignedin).format('DD/MM/YYYY hh:mm A')
      }

      const address = user.address
      const fullAddress = !address
        ? null
        : `${address.street_address} ${address.street_name} ${address.city} ${address.state} ${address.zip_code}`
      if (address) {
        user.address.full = fullAddress
      }

      resolve(user)
    } catch (err) {
      console.log(`~ err => `, err)
      reject(err)
    }
  })
}
