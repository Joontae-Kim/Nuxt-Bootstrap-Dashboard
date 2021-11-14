export default {
  data: () => ({}),
  methods: {
    computeDatasetRange (data, isBeginAtZero) {
      let [max, min] = [Math.max.apply(null, data), Math.min.apply(null, data)]
      const [maxWeight, minWeight] = [
        (max % 10 === 0) ? 10 : 5,
        (min % 10 === 0) ? 10 : 5
      ]
      max = Math.ceil(max / maxWeight) * maxWeight
      min = isBeginAtZero ? 0 : Math.floor(min / minWeight) * minWeight
      const diff = max - min
      const [isStep5, isStep10] = [diff % 5 === 0, diff % 10 === 0]
      return { max, min, isStep5, isStep10, isBeginAtZero, diff }
    },
    computingYScale (ranges) {
      const [isAllPassStep5, isAllPassStep10] = [
        ranges.every(({ isStep5 }) => isStep5 === true),
        ranges.every(({ isStep10 }) => isStep10 === true)
      ]

      let commonStepWeight = null
      if (isAllPassStep5 || isAllPassStep10) {
        const diffs = ranges.map(({ diff }) => diff)
        const maxDiff = Math.max.apply(null, diffs)
        if (maxDiff >= 50) {
          commonStepWeight = isAllPassStep5 && isAllPassStep10 ? 25 : isAllPassStep5 ? 25 : 20
        } else if (maxDiff < 50 && maxDiff >= 10) {
          commonStepWeight = isAllPassStep5 && isAllPassStep10 ? 5 : isAllPassStep5 ? 5 : 10
        } else {
          commonStepWeight = maxDiff % 5 === 0 ? 1 : maxDiff % 3 === 0 ? 3 : 2
        }
        const [maxs, mins] = [ranges.map(({ max }) => max), ranges.map(({ min }) => min)]
        const [maxMax, minMin] = [Math.max.apply(null, maxs), Math.min.apply(null, mins)]
        ranges = ranges.map(({ min, max, diff, isBeginAtZero }) => {
          // Take the weight to max or min
          if (maxMax === max) {
            const weightedMax = Math.ceil(max / commonStepWeight) * commonStepWeight
            max = weightedMax === max ? max + commonStepWeight : weightedMax
          }
          if (minMin === min && !isBeginAtZero && commonStepWeight < min) {
            const weightedMin = Math.floor(min / commonStepWeight) * commonStepWeight
            min = weightedMin === min ? min - commonStepWeight : weightedMin
          }
          // Re-estimate the difference
          diff = max - min
          const beginAtZero = isBeginAtZero && min === 0
          const stepCount = diff / commonStepWeight
          const stepSize = !commonStepWeight ? 0 : commonStepWeight
          return { min, max, diff: max - min, beginAtZero, stepCount, stepSize }
        })
        const stepCounts = ranges.map(({ stepCount }) => stepCount)
        const minStepCounts = Math.min.apply(null, stepCounts)
        ranges = ranges.map((range, r) => {
          if (range.stepCount !== minStepCounts) {
            range.stepSize = (range.stepCount / minStepCounts) * range.stepSize
            range.stepCount = (range.max - range.min) / commonStepWeight
          }
          return range
        })
      }
      return ranges
    }
  }
}
