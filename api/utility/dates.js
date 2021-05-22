const dayjs = require('dayjs')

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
  for (let d = 1; d <= count; d++) {
    const date = dayjs().subtract(d, 'day').format('YYYY-MM-DD')
    dateArray.push(date)
  }
  return dateArray.reverse()
}

module.exports = {
  createDateArray,
  getStartOfMonth
}
