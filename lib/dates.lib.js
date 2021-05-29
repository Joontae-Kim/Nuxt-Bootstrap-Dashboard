import dayjs from 'dayjs'

export function dateFormmter (date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

export function isPassed (start, end = new Date()) {
  const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
  dayjs.extend(isSameOrBefore)
  const isPassed = dayjs(start).isSameOrBefore(end, 'day')
  return isPassed
}
