const dayjs = require('dayjs')
const { randomIndex, createSerialRandom } = require('../utility/createRandom')
const { createDateArray } = require('../utility/dates')

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
