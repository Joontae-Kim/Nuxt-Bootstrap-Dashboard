const dayjs = require('dayjs')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

function getStartOfMonth (unit = 'month') {
  return dayjs().startOf(unit).$d
}

function createDateArray (start = new Date(), end = null, count = 29) {
  const dateArray = []
  if (end) {
    const diffStart = dayjs(start)
    count = Math.abs(diffStart.diff(end, 'day'))
  } else {
    dateArray.push(dayjs(start).format('YYYY-MM-DD'))
  }

  for (let d = 1; d < count; d++) {
    const date = dayjs().subtract(d, 'day').format('YYYY-MM-DD')
    dateArray.push(date)
  }
  return dateArray.reverse()
}

/**
 * @param {date} end
 * @param {date} start
 * i.e.) console.log(randomDate(new Date(2012, 0, 1), new Date()));
 */

function randomDate (start, end = new Date(), formatter = false, format = 'YYYY-MM-DD') {
  let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  if (formatter) {
    date = dayjs(date).format(format)
  }
  return date
}

function dateFormmter (date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

function sortByDate (array, property) {
  return new Promise((resolve, reject) => {
    try {
      const sorted = array.sort((a, b) => b[property] - a[property])
      resolve(sorted)
    } catch (err) {
      reject(err)
    }
  })
}

function isPassed (date) {
  return dayjs().isSameOrAfter(date, 'day')
}

function mergeWithDate (dates, values) {
  const merged = dates.reduce((mergedValues, date, d) => {
    if (values[d]) {
      mergedValues.push({ [date]: values[d] })
    }
    return mergedValues
  }, [])
  return merged
}

function queryByDate (query, target, comparison, unit = 'day') {
  switch (query) {
    case 'future':
      return dayjs(target).isSameOrBefore(comparison, unit)
    case 'same':
      return dayjs(target).isSame(comparison, unit)
    case 'past':
      return dayjs(target).isSameOrAfter(comparison, unit)
  }
}

module.exports = {
  createDateArray,
  getStartOfMonth,
  randomDate,
  dateFormmter,
  sortByDate,
  isPassed,
  mergeWithDate,
  queryByDate
}
