const dayjs = require('dayjs')
const FuzzySearch = require('fuzzy-search')
const { randomIndex, createSerialRandom, getRandomArray } = require('../utility/createRandom')
const { createDateArray, randomDate } = require('../utility/dates')
const findArray = require('../utility/findArray')

export function createUsersTraffic (startAt, count = 7) {
  return new Promise((resolve, reject) => {
    try {
      const serialTrafficDays = createDateArray(startAt, null, count)
      const serialTrafficData = createSerialRandom(20, 45, count, false)
      const serialTraffic = serialTrafficDays.reduce((merged, day, d) => {
        merged.push({ [day]: serialTrafficData[d] })
        return merged
      }, [])
      const timeTrafficRange = {
        busy: { min: 120, max: 150 },
        subBusy: { min: 104, max: 122 },
        normal: { min: 93, max: 115 }
      }
      const normalTime = [21, 22, 23, 24, 0, 1, 2, 3, 4, 5, 6, 7]
      const subBusyTime = [8, 9, 10, 19, 20]
      const busyTime = [11, 12, 13, 14, 15, 16, 17, 18]
      const timeSeriesTraffic = new Array(24).fill().reduce((merged, time, t) => {
        let range = {}
        if (normalTime.includes(t)) {
          range = timeTrafficRange.normal
        } else if (subBusyTime.includes(t)) {
          range = timeTrafficRange.subBusy
        } else if (busyTime.includes(t)) {
          range = timeTrafficRange.busy
        }
        // timeTrafficRange
        const timeKey = dayjs().set('hour', t).set('minute', 0)
        merged.push({ [timeKey]: randomIndex(range.min, range.max) })
        return merged
      }, [])
      resolve({
        serialTraffic,
        timeSeriesTraffic
      })
    } catch (err) {
      reject(err)
    }
  })
}

export function searchUser (userSet, query) {
  return new Promise((resolve, reject) => {
    try {
      let searched = userSet

      if (searched.length && query.id) {
        searched = findArray.Search(searched, 'eq', 'id', query.id)
      }

      if (searched.length && query.uid) {
        const uidSearcher = new FuzzySearch(searched, ['uid'], {
          caseSensitive: false
        })
        searched = uidSearcher.search(query.uid)
      }

      if (query.username) {
        const usernameSearcher = new FuzzySearch(searched, ['username'], {
          caseSensitive: false
        })
        searched = usernameSearcher.search(query.username)
      }

      if (query.email) {
        const emailSearcher = new FuzzySearch(searched, ['email'], {
          caseSensitive: false
        })
        searched = emailSearcher.search(query.email)
      }

      if (query.address) {
        const addressSearcher = new FuzzySearch(searched, ['address.full'], {
          caseSensitive: false
        })
        searched = addressSearcher.search(query.address)
      }

      if (searched.length && query.phoneNumber) {
        searched = findArray.Search(searched, 'eq', 'phone_number', query.phoneNumber)
      }

      if (query.creditCard) {
        const creditCardSearcher = new FuzzySearch(searched, ['credit_card.cc_number'], {
          caseSensitive: true
        })
        searched = creditCardSearcher.search(query.creditCard)
      }

      if (searched.length && query.payment) {
        if (query.payment.includes('null')) {
          const nullIndex = query.payment.findIndex(ele => ele === 'null')
          query.payment[nullIndex] = null
        }
        searched = searched.reduce((paymentSearched, user) => {
          const isIncludes = findArray.partialInclude(query.payment, [user.payment])
          if (isIncludes) {
            paymentSearched.push(user)
          }
          return paymentSearched
        }, [])
      }

      if (searched.length && query.authentication) {
        searched = searched.reduce((authSearched, user) => {
          const isIncludes = findArray.partialInclude(query.authentication, user.authentication)
          if (isIncludes) {
            authSearched.push(user)
          }
          return authSearched
        }, [])
      }

      if (searched.length && query.status) {
        searched = searched.reduce((statusSearched, user) => {
          const isIncludes = findArray.partialInclude(query.status, user.status)
          if (isIncludes) {
            statusSearched.push(user)
          }
          return statusSearched
        }, [])
      }

      resolve(searched)
    } catch (err) {
      console.log(err)
      console.log(err.message)
      reject(err)
    }
  })
}

const mentions = [
  "Aut eius recusandae",
  "Repudiandae necessitatibus nisi",
  "Omnis commodi consequuntur",
  "At commodi suscipit",
  "Ut est culpa",
  "Error fuga incidunt",
  "Mollitia provident veritatis",
  "Sapiente eligendi vel",
  "Voluptatibus dignissimos suscipit",
  "Labore pariatur id"
]

const activity = [{ type: 'comment' }, { type: 'like' }, { type: 'visit' }, { type: 'save' }]

export function createRandomAcitivy (createdAt, lastSignedin) {
  return new Promise((resolve) => {
    const randomActivityIndex = new Array(7).fill(null).map(ele => randomIndex(0, activity.length - 1)).sort()
    let activityLogs = randomActivityIndex.reduce((logs, random, r) => {
      const mentionIdx = randomIndex(0, mentions.length - 1)
      logs.push({
        ...activity[random],
        action: mentions[mentionIdx]
      })
      return logs
    }, [])
    activityLogs = activityLogs.reduce((merged, log, l) => {
      merged.push({ date: randomDate(createdAt, lastSignedin, true), ...log })
      return merged
    }, [])
    activityLogs = activityLogs.sort((a, b) => new Date(b.date) - new Date(a.date))
    resolve(activityLogs)
  })
}

const productList = [
  {
    name: 'cioson-corporate-landing-template-react/',
    event: '2020\'s Best 100+ Bootstrap Themes'
  },
  {
    name: 'faviorio-admin-dashboard-vuejs-template/',
    event: '2021\'s ~ 2Q The Newest Bootstrap E-Commerce Template'
  },
  {
    name: 'querioe-cms-dashboard-webapp-pro-theme/',
    event: '2020\'s Best 100+ Bootstrap Themes'
  },
  {
    name: 'awiwan-vuejs-multipage-webapp-react/',
    event: '2020\' Bestselleing Ranking 100 Bootstrap Template'
  },
  {
    name: 'borian-admin-corporate-webapp-template-react/',
    event: 'Ranking 50 Bootstrap Corporate and Landing Theme & Template'
  },
  {
    name: 'naxiee-business-theme-multipurpose-template-react/',
    event: 'Material Design Bootstrap Business and Landing Theme & Template'
  },
  {
    name: 'poiman-multipurpose-webapp-pro-template-react/',
    event: '2020\'s Best 100+ Bootstrap Themes'
  },
  {
    name: 'suponse-admin-dashboard-webapp-template-react/',
    event: 'Popular Free React.js Bootstrap Template'
  },
  {
    name: 'apsobe-react-dashboard-responsive-template',
    event: '2021\'s March Recommened React.js Bootstrap Template'
  },
  {
    name: 'sherom-webapp-responsive-pro-template/',
    event: '2021\'s 150+ Ranking WebApp Responsive Template'
  }
]

export function createRandomPurchaseList (createdAt, lastSignedin) {
  return new Promise((resolve) => {
    const purchaseRandomCount = randomIndex(3, 7)
    const purchaseRandom = getRandomArray(productList, purchaseRandomCount)
    let purchaseList = new Array(purchaseRandomCount).fill(null).map((item, i) => {
      return {
        date: randomDate(createdAt, lastSignedin, true),
        ...purchaseRandom[i]
      }
    })
    purchaseList = purchaseList.sort((a, b) => new Date(b.date) - new Date(a.date))
    resolve(purchaseList)
  })
}
