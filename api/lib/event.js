const { v4: uuidv4 } = require('uuid')
const FuzzySearch = require('fuzzy-search')
const { ErrorHandler } = require('../utility/error')
const findArray = require('../utility/findArray')
const { randomDate, dateFormmter, isPassed, createDateArray } = require('../utility/dates')
const { randomIndex, getRandomArray, createSerialRandomByUnique } = require('../utility/createRandom')
const { eventNameSet } = require('../utility/event.collection')
const viewsRange = { min: 1000, max: 3000 }
const salesRange = { min: 400, max: 900 }
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
    const views = randomIndex(viewsRange.min, viewsRange.max)
    const bounce = randomIndex(20, 60)
    const sales = randomIndex(salesRange.min, salesRange.max)
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
  event.openAt = dayjs(event.publishedAt).add(randomOpenWeight, 'day').$d // `.format('YYYY-MM-DD')
  const [closedStart, closedEnd] = [
    dayjs(event.openAt).add(1, 'M').$d,
    dayjs(event.openAt).add(randomEndWeight, 'M').$d
  ]
  event.closedAt = randomDate(new Date(closedStart), new Date(closedEnd))

  // Compute Event Index Property (sales, views)
  const randomIndexObj = { views: 0, sales: 0 }
  const isStarted = isPassed(event.openAt)
  if (isStarted) {
    randomIndexObj.views = randomIndex(viewsRange.min, viewsRange.max)
    randomIndexObj.sales = randomIndex(salesRange.min, salesRange.max)
    const isClosed = isPassed(event.closedAt)
    const totalDuration = dayjs(event.closedAt).diff(event.openAt, 'day')
    const sinceNow = isClosed ? totalDuration : dayjs(new Date()).diff(event.openAt, 'day')
    let eventOpenPercentage = (sinceNow / totalDuration)
    eventOpenPercentage = Number(eventOpenPercentage.toFixed(2))
    randomIndexObj.views = Math.floor(randomIndexObj.views * eventOpenPercentage)
    randomIndexObj.sales = Math.floor(randomIndexObj.sales * eventOpenPercentage)
  }
  event = { ...event, ...randomIndexObj, item: [] }
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
    const editableField = ['title', 'eventType', 'openAt', 'closedAt']
    for (const field of editableField) {
      updated[field] = updating[field] || updated[field]
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

    updated.modifiedAt = new Date()
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
      const detailedProppery = { isOpened: false, isClosed: false, indexDates: [] }
      event = {
        ...event,
        ...detailedProppery
      }
      if (event.openAt && event.closedAt) {
        event.isOpened = isPassed(event.openAt)
        event.isClosed = isPassed(event.closedAt)
        if (event.isOpened) {
          event.duration = dayjs(event.closedAt).diff(event.openAt, 'day')
          const eventPerformanceDays = event.duration > 7 ? 7 : event.duration
          event.sales = {
            rate: event.duration > 7 ? randomIndex(8, 10, false) : 0,
            total: event.sales
          }
          const { min: salesMin, max: salesMax, weekly: salesWeekly } = getPerformanceRandomRange(event.sales.total, event.sales.rate, 7)
          event.sales.value = createSerialRandomByUnique(salesMin, salesMax, salesWeekly)
          event.sales.weekly = salesWeekly
          event.views = {
            rate: event.duration > 7 ? randomIndex(3, 10, false) : 0,
            total: event.views
          }
          const { min: viewsMin, max: viewsMax, weekly: viewsWeekly } = getPerformanceRandomRange(event.views.total, event.views.rate, 7)
          event.views.value = createSerialRandomByUnique(viewsMin, viewsMax, viewsWeekly)
          event.views.weekly = viewsWeekly
          event.indexDates = createDateArray(new Date(), null, eventPerformanceDays)
        } else {
          const zeroindex = { rate: 0, total: 0 }
          event.sales = zeroindex
          event.views = zeroindex
        }
      } else {
        event = { ...event, sales: null, views: null, bounce: null }
      }
      resolve(event)
    } catch (err) {
      reject(err)
    }
  })
}

function getPerformanceRandomRange (unique, share, count) {
  const weekly = unique * (share / 100)
  const weeeklyAvg = weekly / count
  const uniqueDigitUnit = Math.floor(weeeklyAvg).toString().length
  let min = Math.floor(Math.floor(weeeklyAvg) / Math.pow(10, uniqueDigitUnit - 1))
  min = min < 2 ? min : (min * Math.pow(10, uniqueDigitUnit - 1)) - Math.pow(10, uniqueDigitUnit - 1)
  const max = Math.round(weeeklyAvg)
  return { min, max, weekly }
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
