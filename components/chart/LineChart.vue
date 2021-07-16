<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>
<script>
import createChartColor from "~/mixins/chart/createChartColor"
import defaultProps from "~/mixins/chart/defaultProps_linebar"

export default {
  mixins: [
    defaultProps,
    createChartColor
  ],
  props: {
    userXAxesAsTime: {
      type: Boolean,
      required: false,
      default: (userXAxesTimeprops) => {
        return typeof userXAxesTimeprops === 'undefined' ? false : userXAxesTimeprops
      }
    },
    yMax: {
      type: [Number, Boolean],
      required: false,
      default: false
    }
  },
  data: () => ({
    type: 'line',
    optionXAxesTime: {
      type: 'time',
      time: {
        unit: 'day',
        distribution: 'series',
        displayFormats: {
          day: 'MMM D'
        },
        stepSize: 3
      },
      scaleLabel: {
        display: false,
        labelString: 'Date'
      },
      gridLines: {
        borderDash: [3, 4]
      }
    },
    option: {
      scales: {
        xAxes: [],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: false,
            labelString: 'Value'
          },
          ticks: {
            beginAtZero: false,
            padding: 7
          },
          title: {
            display: false
          }
        }]
      }
    }
  }),
  created () {
    if (this.yMax) {
      this.option.scales.yAxes[0].ticks.stepSize = this.yMax > 50 ? 15 : 10
    }
  },
  beforeDestroy () {},
  methods: {
    mergeOption () {
      // merge Default Options ~ defaultProps.js
      this.mergeDefaultOptions()

      if (this.mixed) {
        this.option.scales.xAxes = this.scalesX
        this.option.scales.yAxes = this.scalesY
      } else {
        if (this.userXAxesAsTime) {
          this.option.scales.xAxes.push(this.optionXAxesTime)
        }

        if (this.scalesX) {
          if (this.scalesX.length === 1) {
            if (this.scalesX[0].type && this.scalesX[0].type !== 'time') {
              this.option.scales.xAxes[0] = this.mergeOptions(this.option.scales.xAxes[0], this.scalesX[0])
            }
          }
          this.option.scales.xAxes = this.mergeOptions(this.option.scales.xAxes, this.scalesX)
        }

        if (this.scalesY) {
          this.option.scales.yAxes = this.mergeOptions(this.option.scales.yAxes, this.scalesY)
        }

        if (this.option.scales.yAxes.length === 1) {
          if (!this.option.scales.yAxes[0].gridLines) {
            this.option.scales.yAxes[0].gridLines = { borderDash: [3, 4] }
          }
        }
      }

      let options = this.option
      if (this.customOpt) {
        options = this.mergeOptions(this.option, this.customOpt)
      }
      return options
    },
    generateChartColor () {
      const colors = this.getRandomColors(this.data.datasets.length)
      colors.forEach(({ rgb, border, background }, c) => {
        this.data.datasets[c].backgroundColor = background
        this.data.datasets[c].pointBackgroundColor = border
        this.data.datasets[c].borderColor = rgb
        this.data.datasets[c].fill = true
      })
    },
    computeScaleTicks (options) {
      const yScale = options.scales.yAxes
      const computingAxe = this.computeScaleAxe
      if (computingAxe === 'Y' || computingAxe === 'XY') {
        const datasets = this.data.datasets.map(({ data }) => data)
        let ranges = datasets.reduce((ranges, data, d) => {
          const isBeginAtZero = !!yScale[d].ticks && yScale[d].ticks.beginAtZero
          const yData = data.map(({ y }) => y)
          let [max, min] = [Math.max.apply(null, yData), Math.min.apply(null, yData)]
          const [maxWeight, minWeight] = [(max % 10 === 0) ? 10 : 5, (max % 10 === 0) ? 10 : 5]
          max = Math.ceil(max / maxWeight) * maxWeight
          min = isBeginAtZero ? 0 : Math.floor(min / minWeight) * minWeight
          const diff = max - min
          const [isStep5, isStep10] = [diff % 5 === 0, diff % 10 === 0]
          ranges.push({ max, min, isStep5, isStep10, isBeginAtZero, diff })
          return ranges
        }, [])

        const isAllPassStep5 = ranges.every(({ isStep5 }) => isStep5 === true)
        const isAllPassStep10 = ranges.every(({ isStep10 }) => isStep10 === true)
        let commonStepWeight = null

        if (isAllPassStep5 || isAllPassStep10) {
          const diffs = ranges.map(({ diff }) => diff)
          const maxDiff = Math.max.apply(null, diffs)
          if (maxDiff >= 10) {
            commonStepWeight = isAllPassStep5 && isAllPassStep10 ? 5 : isAllPassStep5 ? 5 : isAllPassStep10 ? 10 : 5
          } else {
            commonStepWeight = maxDiff % 5 === 0 ? 1 : maxDiff % 3 === 0 ? 3 : 2
          }
          ranges = ranges.map(({ min, max, diff }, r) => {
            if (diff !== maxDiff) {
              if (min >= maxDiff) {
                min -= commonStepWeight
              } else {
                max += commonStepWeight
              }
            }
            return { min, max, diff: max - min, beginAtZero: min === 0, stepSize: !commonStepWeight ? 0 : commonStepWeight }
          })
        }

        ranges.forEach(({ max, min, beginAtZero, stepSize }, r) => {
          yScale[r].ticks = this.mergeOptions(yScale[r].ticks, { min, max, beginAtZero, stepSize })
        })
      }
      // if (computingAxe === 'X' || computingAxe === 'XY') {
      // }
    },
    renderChart () {
      try {
        const ctx = document.getElementById(this.canvasId).getContext('2d')
        const options = this.mergeOption()
        if (this.mixed) {
          this.generateMixedChartColor()
        } else {
          this.generateChartColor()
        }

        if (this.computeScaleAxe) {
          this.computeScaleTicks(options)
        }

        this.$chartjs.createChart(ctx, {
          type: this.type,
          data: this.data,
          options
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
