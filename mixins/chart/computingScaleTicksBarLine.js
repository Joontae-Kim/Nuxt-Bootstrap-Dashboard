export default {
  data: () => ({}),
  methods: {
    searchBestDistance (difference) {
      const distanceScore = difference > 10 ? [5, 10, 15, 20, 25] : [1, 2, 3, 4, 5]
      const distances = distanceScore.reduce((scores, distance) => [...scores, { distance, score: difference / distance }], [])
      const scoreConditionRange = difference > 10 ? { max: 9, min: 3 } : { max: 3, min: 1 }
      let filtered = distances.find(({ score }) => score < scoreConditionRange.max && score > scoreConditionRange.min)
      if (!filtered) {
        filtered = distances.sort((a, b) => b.score - a.score)[0]
      }
      let bestDistanceValue = filtered.distance
      if (!Number.isInteger(filtered.score)) {
        bestDistanceValue = Math.ceil(5 / bestDistanceValue) + bestDistanceValue
      }
      return bestDistanceValue
    },
    computeDatasetRange (data, isBeginAtZero = false) {
      const [min, max] = [isBeginAtZero ? 0 : Math.min.apply(null, data), Math.max.apply(null, data)]
      const bestDistanceValue = this.searchBestDistance(max - min)
      const computedRange = {
        min: isBeginAtZero ? 0 : Math.floor(min / bestDistanceValue) * bestDistanceValue,
        max: Math.ceil(max / bestDistanceValue) * bestDistanceValue
      }
      if (Math.abs(min - computedRange.min) < 5) {
        computedRange.min = (isBeginAtZero || computedRange.min - bestDistanceValue <= 0)
          ? 0
          : computedRange.min - bestDistanceValue
      }
      if (Math.abs(max - computedRange.max) < 5) {
        computedRange.max = computedRange.max + bestDistanceValue
      }
      return { ...computedRange, bestDistanceValue, isBeginAtZero }
    },
    computingYScale (ranges) {
      if (ranges.length < 2) {
        const range = ranges[0]
        return [{
          min: range.min,
          max: range.max,
          beginAtZero: range.isBeginAtZero,
          stepSize: range.bestDistanceValue
        }]
      } else {
        ranges = ranges.map(range => ({ ...range, stepCount: (range.max - range.min) / range.bestDistanceValue }))
        const stepCounts = ranges.map(({ stepCount }) => stepCount)
        const minStepCount = Math.min.apply(null, stepCounts)
        const computedRanges = ranges.map((range, r) => {
          if (minStepCount < stepCounts[r]) {
            range.bestDistanceValue = (range.max - range.min) / minStepCount
            if (!Number.isInteger(range.bestDistanceValue)) {
              range.max = Math.floor(range.max / 10) * 10
              range.bestDistanceValue = (range.max - range.min) / minStepCount
            }
          }
          return {
            min: range.min,
            max: range.max,
            beginAtZero: range.isBeginAtZero,
            stepSize: range.bestDistanceValue
          }
        })
        return computedRanges
      }
    }
  }
}
