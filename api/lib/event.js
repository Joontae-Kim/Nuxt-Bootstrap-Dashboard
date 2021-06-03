const { v4: uuidv4 } = require('uuid')
const FuzzySearch = require('fuzzy-search')
const { ErrorHandler } = require('../utility/error')
const findArray = require('../utility/findArray')
const { randomDate, dateFormmter, isPassed } = require('../utility/dates')
const { randomIndex, getRandomArray, createSerialRandom } = require('../utility/createRandom')

/**
 * Event Data Property
 * title
 * publishedAt
 * modifiedAt
 * openAt
 * closedAt
 * eventType: [`Bargains`, `Package`, `Theme & Template`, `Newest`, `Hottest`, `Recommended`]
 * {
    title: ,
    publishedAt: ,
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Newest`, `Hottest`, `Recommended`]
  }
 */

const eventNameSet = [
  {
    title: '2020\'s Best 100+ Bootstrap Themes',
    publishedAt: randomDate(new Date(2020, 11, 15), new Date(2020, 11, 30)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: ['Theme & Template', 'Recommended', 'Hottest']
  },
  {
    title: '2020\'s Best 100+ Bootstrap Premium Themes',
    publishedAt: randomDate(new Date(2020, 12, 1), new Date(2020, 12, 20)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: 'Ranking 50 Bootstrap Corporate and Landing Theme & Template',
    publishedAt: randomDate(new Date(2020, 12, 1), new Date(2020, 12, 20)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '150+ Free Bootstrap Theme',
    publishedAt: randomDate(new Date(2021, 2, 5), new Date(2021, 2, 15)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Recommended`]
  },
  {
    title: 'Popular Free Vue.js Bootstrap Template',
    publishedAt: randomDate(new Date(2021, 1, 5), new Date(2021, 1, 15)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Recommended`]
  },
  {
    title: 'Popular Free React.js Bootstrap Template',
    publishedAt: randomDate(new Date(2021, 1, 5), new Date(2021, 1, 15)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Hottest`]
  },
  {
    title: 'Popular Free Angular.js Bootstrap Template Best 10',
    publishedAt: randomDate(new Date(2021, 1, 5), new Date(2021, 1, 15)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Hottest`]
  },
  {
    title: 'Material Design Bootstrap Business and Landing Theme & Template',
    publishedAt: randomDate(new Date(2021, 1, 25), new Date(2021, 2, 25)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Recommended`]
  },
  {
    title: 'Bootstrap CMS Theme and Template 100 with Bargains',
    publishedAt: randomDate(new Date(2021, 2, 25), new Date(2021, 3, 25)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Recommended`]
  },
  {
    title: '80+ Bootstrap Admin Dashboard and Landing Page with Bargains',
    publishedAt: randomDate(new Date(2021, 2, 25), new Date(2021, 3, 25)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Theme & Template`, `Recommended`]
  },
  {
    title: '2020\' Bestselleing Ranking 100 Bootstrap Template',
    publishedAt: randomDate(new Date(2021, 1, 10), new Date(2021, 1, 18)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '2021\' 30+ Newest Responsive Bootstrap Material Design Themes',
    publishedAt: randomDate(new Date(2021, 2, 25), new Date(2021, 2, 29)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Newest`]
  },
  {
    title: '2021\'s ~ 2Q The Newest Bootstrap E-Commerce Template',
    publishedAt: randomDate(new Date(2021, 5, 18), new Date(2021, 5, 25)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Newest`]
  },
  {
    title: '2021\'s Febrary Newest Vue.js Bootstrap Template',
    publishedAt: randomDate(new Date(2020, 12, 15), new Date(2020, 12, 20)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Newest`]
  },
  {
    title: '2021\'s March Recommened React.js Bootstrap Template',
    publishedAt: randomDate(new Date(2020, 12, 15), new Date()),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Recommended`]
  },
  {
    title: '150+ Popular Admin Dashboard & WebApp Responsive Template',
    publishedAt: randomDate(new Date(), new Date()),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Hottest`]
  },
  {
    title: '2020\'s Recommened React.js Bootstrap Responsive Design Template',
    publishedAt: randomDate(new Date(2020, 12, 20), new Date(2021, 1, 20)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Recommended`]
  },
  {
    title: '2021\'s 150+ Ranking WebApp Responsive Template',
    publishedAt: randomDate(new Date(2021, 3, 2), new Date(2021, 3, 9)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: 'Newest Multipurpose Template + UI Kit in April 2021',
    publishedAt: randomDate(new Date(2021, 3, 17), new Date(2021, 3, 19)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Newest`, `Recommended`]
  },
  {
    title: 'Updated Application UI Kit in 2021',
    publishedAt: randomDate(new Date(2021, 4, 23), new Date(2021, 4, 29)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Recommended`]
  },
  {
    title: 'Newest Portfolio & Agency Template in May 2021 - updated weekly',
    publishedAt: randomDate(new Date(2021, 4, 10), new Date(2021, 4, 17)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Newest`]
  },
  {
    title: '2021\'s Best Selling Multipurpose E-Commerce Template - updated weekly',
    publishedAt: randomDate(new Date(2021, 5, 20), new Date(2021, 5, 27)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '2021\'s Best Selling Free Bootstrap Landing Pages for small Business - updated weekly',
    publishedAt: randomDate(new Date(2021, 5, 20), new Date(2021, 5, 27)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '2021\'s Best Selling Primium Bootstrap Landing Pages for small Business - updated weekly',
    publishedAt: randomDate(new Date(), new Date()),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '2021\'s Best Selling Multipurpose E-Commerce Template - updated weekly',
    publishedAt: randomDate(new Date(2021, 5, 20), new Date(2021, 5, 27)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '2021\'s Best Selling Free Responsive Website UI Kit - updated weekly',
    publishedAt: randomDate(new Date(2021, 5, 20), new Date(2021, 5, 27)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '2021\'s Best Selling Primium Responsive Website UI Kit - updated weekly',
    publishedAt: randomDate(new Date(2021, 5, 20), new Date(2021, 5, 27)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Hottest`, `Recommended`]
  }
]

// const eventDescriptionSet = [
//   'Nisi ultrices sapien etiam. Facilisis nibh luctus vulputate volutpat platea. Pretium ullamcorper ultricies, mus fringilla vel vehicula curae;.',
//   'Bibendum elit facilisis conubia magna ante duis habitasse vel ornare orci natoque vestibulum ac luctus habitasse velit vestibulum.',
//   'Laoreet. Libero felis a cubilia feugiat conubia ornare iaculis ipsum viverra hac eget purus neque torquent nonummy Porta potenti litora vel senectus.',
//   'Aptent proin dictumst curae; torquent iaculis lacus natoque sollicitudin. Fringilla. At eu consectetuer dictum lobortis euismod commodo justo sagittis sollicitudin facilisis augue.',
//   'Nascetur, donec class morbi quisque leo enim cras per vel tempor posuere dignissim est dolor dis Quis primis morbi ad augue pede.',
//   'Interdum orci condimentum vestibulum pellentesque iaculis dignissim scelerisque Cum et.',
//   'Tortor libero nascetur convallis pharetra Iaculis ligula fusce. In ac, nibh dui.',
//   'Metus taciti hendrerit molestie est sed, volutpat lorem. Sodales euismod aptent per sem. Etiam augue netus aenean. Ligula cum accumsan.',
//   'Nisl blandit, eros. Ullamcorper consectetuer natoque. Primis aliquet nisl ligula senectus nunc molestie curae; malesuada nec convallis.',
//   'Class fusce ut porta quis eleifend nonummy. Platea non magna non posuere nonummy eros enim.',
//   'Scelerisque non lectus libero faucibus fames eleifend nulla vitae etiam at. Condimentum per parturient purus adipiscing augue tempor quisque urna. Sociosqu. Suspendisse felis. Per.'
// ]

function randomEventSet (count = 'full') {
  count = count === 'full' ? eventNameSet.length : count
  const randomSet = getRandomArray(eventNameSet, count)
  return createEventSet(randomSet)
}

function createEventSet (eventset) {
  const set = eventset.reduce((set, event) => {
    const views = randomIndex(200, 400)
    const bounce = randomIndex(20, 60)
    const sales = views * (bounce / 100)
    set.push({ name: event.title, views, bounce: Math.floor(bounce), sales: Math.floor(sales) })
    return set
  }, [])
  return set
}

function createEventDateProperty (event) {
  const dayjs = require('dayjs')
  event._id = uuidv4()
  event.modifiedAt = event.publishedAt
  const [randomOpenWeight, randomEndWeight] = [randomIndex(15, 20), randomIndex(2, 3)]
  event.openAt = dayjs(event.publishedAt).add(randomOpenWeight, 'day') // `.format('YYYY-MM-DD')
  const [closedStart, closedEnd] = [
    dayjs(event.openAt).add(1, 'M').$d,
    dayjs(event.openAt).add(randomEndWeight, 'M').$d
  ]
  const [views, bounce] = [randomIndex(200, 400), randomIndex(20, 60)]
  const sales = views * (bounce / 100)
  event.closedAt = randomDate(new Date(closedStart), new Date(closedEnd))
  event = { ...event, views, bounce: Math.floor(bounce), sales: Math.floor(sales), item: [] }
  return event
}

function createEventFullSet () {
  return new Promise((resolve, reject) => {
    try {
      const createdEventSet = eventNameSet.reduce((set, event) => {
        const processed = createEventDateProperty(event)
        set.push(processed)
        return set
      }, [])
      resolve(createdEventSet)
    } catch (e) {
      reject(e)
    }
  })
}

function compareType (targetType, typeSet) {
  const ttSet = new Set(targetType)
  for (const tt of ttSet) {
    if (typeSet.has(tt)) {
      return true
    }
  }
  return false
}

function searchEvent (eventSet, query) {
  return new Promise((resolve, reject) => {
    try {
      let searched = eventSet
      if (query.title) {
        const titleSearcher = new FuzzySearch(eventSet, ['title'], {
          caseSensitive: true
        })
        searched = titleSearcher.search(query.title)
      }

      if (searched.length && query.type && query.type.length) {
        const typeQuerySet = new Set(query.type)
        searched = searched.reduce((typeSearched, event) => {
          if (event.eventType.length) {
            const isIncludes = compareType(event.eventType, typeQuerySet)
            if (isIncludes) {
              typeSearched.push(event)
            }
          }
          return typeSearched
        }, [])
      }

      if (searched.length && query.publishedAt) {
        const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
        const dayjs = require('dayjs')
        dayjs.extend(isSameOrBefore)
        searched = searched.reduce((publishedAtSearched, event) => {
          if (event.publishedAt) {
            const isPassed = dayjs(query.publishedAt).isSameOrBefore(event.publishedAt, 'day')
            if (isPassed) {
              publishedAtSearched.push(event)
            }
          }
          return publishedAtSearched
        }, [])
      }

      if (searched.length && query.openAt) {
        const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
        const dayjs = require('dayjs')
        dayjs.extend(isSameOrBefore)
        searched = searched.reduce((openAtSearched, event) => {
          if (event.openAt) {
            const isPassed = dayjs(query.openAt).isSameOrBefore(event.openAt, 'day')
            if (isPassed) {
              openAtSearched.push(event)
            }
          }
          return openAtSearched
        }, [])
      }

      if (searched.length && query.closedAt) {
        const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
        const dayjs = require('dayjs')
        dayjs.extend(isSameOrAfter)
        searched = searched.reduce((closedAtSearched, event) => {
          if (event.closedAt) {
            const isPassed = dayjs(query.closedAt).isSameOrAfter(event.closedAt, 'day')
            if (isPassed) {
              closedAtSearched.push(event)
            }
          }
          return closedAtSearched
        }, [])
      }

      if (searched.length && query.views) {
        searched = findArray.Search(searched, query.views.condition, 'views', query.views.value)
      }

      if (searched.length && query.bounce) {
        searched = findArray.Search(searched, query.bounce.condition, 'bounce', query.bounce.value)
      }

      if (searched.length && query.sales) {
        searched = findArray.Search(searched, query.sales.condition, 'sales', query.sales.value)
      }

      if (searched.length && query.type) {
        searched = searched.reduce((typeSearched, event) => {
          const isIncludes = findArray.partialInclude(query.type, event.eventType)
          if (isIncludes) {
            typeSearched.push(event)
          }
          return typeSearched
        }, [])
      }
      resolve(searched)
    } catch (e) {
      reject(e)
    }
  })
}

function createNewEvent (newEvent) {
  // {
  //   title: ,
  //   publishedAt: ,
  //   modifiedAt: null,
  //   openAt: null,
  //   closedAt: null,
  //   eventType: [`Bargains`, `Package`, `Theme & Template`, `Newest`, `Hottest`, `Recommended`]
  //   views: 0,
  //   bounce: 0,
  //   sales: 0
  // }
  const _newEvent = {
    title: null,
    publishedAt: null,
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Newest`, `Hottest`, `Recommended`],
    views: 0,
    bounce: 0,
    sales: 0
  }

  for (const [key] of Object.entries(_newEvent)) {
    _newEvent[key] = newEvent[key] ? newEvent[key] : _newEvent[key]
  }

  if (!_newEvent.publishedAt) {
    _newEvent.publishedAt = dateFormmter(new Date())
    _newEvent.modifiedAt = _newEvent.publishedAt
  }
  _newEvent._id = uuidv4()

  return _newEvent
}

function updateEventElement (ex, updating) {
  return new Promise((resolve, reject) => {
    const updated = Object.assign({}, ex)

    for (const [key] of Object.entries(updated)) {
      updated[key] = updating[key] || updated[key]
    }

    if (updated.openAt) {
      const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
      const dayjs = require('dayjs')
      dayjs.extend(isSameOrAfter)
      const isPassed = dayjs(updated.openAt).isSameOrAfter(updated.publishedAt, 'day')
      if (!isPassed) {
        reject(new ErrorHandler(400, 'Bad_Request', 'openAt', 'validate'))
      }
    }

    if (updated.openAt && updated.closedAt) {
      if (!!updated.eventType && !updated.eventType.length) {
        reject(new ErrorHandler(404, 'Not_Found', 'eventType', 'validate'))
      }

      const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
      const dayjs = require('dayjs')
      dayjs.extend(isSameOrAfter)
      const isPassed = dayjs(updated.closedAt).isSameOrAfter(updated.openAt, 'day')
      if (!isPassed) {
        reject(new ErrorHandler(400, 'Bad_Request', 'closedAt', 'validate'))
      }
    }

    updated.modifiedAt = dateFormmter(new Date(), 'YYYY-MM-DD hh:mm:ss')
    resolve(updated)
  })
}

function deleteEventElement (array, deleting, eleProperty = '_id') {
  return new Promise((resolve, reject) => {
    try {
      const eleIdx = array.findIndex(ele => deleting.includes(ele[eleProperty].toString()))
      if (eleIdx >= 0) {
        array.splice(eleIdx, 1)
      }
      resolve(array)
    } catch (err) {
      reject(err)
    }
  })
}

function createEventDetail (event) {
  return new Promise((resolve, reject) => {
    try {
      const dayjs = require('dayjs')
      if (event.openAt && event.closedAt) {
        event.isOpened = isPassed(event.openAt)
        event.isClosed = isPassed(event.closedAt)
        if (event.isOpened) {
          const startDay = dayjs(event.closedAt)
          const duration = startDay.diff(event.openAt, 'day')
          event.duration = duration
          const serialDuration = duration > 6 ? 7 : duration
          const [bounceSerial, viewsSerial, salesSerial] = [[event.bounce], [event.views], [event.sales]]
          if (serialDuration - 1 > 1) {
            const _bounces = createSerialRandom(20, event.bounce, serialDuration - 1)
            const _views = createSerialRandom(event.views <= 100 ? 50 : Math.abs(event.views - 100), event.views, serialDuration - 1)
            bounceSerial.unshift(..._bounces)
            viewsSerial.unshift(..._views)
            const _sales = new Array(serialDuration - 1).fill(null).map((ele, s) => Number((viewsSerial[s] * (bounceSerial[s] / 100)).toFixed(2)))
            salesSerial.unshift(..._sales)
          }
          event.bounce = bounceSerial
          event.views = viewsSerial
          event.sales = salesSerial
        }
      } else {
        event.isOpened = !event.openAt ? false : isPassed(event.openAt)
        event.isClosed = !event.closedAt ? false : isPassed(event.closedAt)
        event.duration = null
        event.bounce = null
        event.views = null
        event.sales = null
      }

      resolve(event)
    } catch (err) {
      reject(err)
    }
  })
}

function getRelativeEvent (events, eventType) {
  return new Promise((resolve, reject) => {
    try {
      const relative = events.reduce((rel, event) => {
        const isRelative = findArray.partialInclude(eventType, event.eventType)
        if (isRelative) {
          rel.push({
            title: event.title,
            openAt: event.openAt,
            closedAt: event.closedAt,
            eventType: event.eventType
          })
        }
        return rel
      }, [])
      resolve(relative) 
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  randomEventSet,
  createEventSet,
  createEventFullSet,
  searchEvent,
  createNewEvent,
  updateEventElement,
  deleteEventElement,
  createEventDetail,
  getRelativeEvent
}
