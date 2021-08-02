<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>
<script>
import createChartColor from "~/mixins/chart/createChartColor"
import defaultProps from "~/mixins/chart/defaultProps_linebar"
import computingYScaleBarLine from "~/mixins/chart/computingScaleTicksBarLine"

export default {
  mixins: [
    defaultProps,
    createChartColor,
    computingYScaleBarLine
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
      let colors = null
      if (this.data.datasets.length > 1) {
        const colorsTypes = this.getRandomType(this.data.datasets.length)
        colors = this.getColorsByType(colorsTypes)
      } else {
        colors = this.getRandomColors(this.data.datasets.length)
      }
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
          const range = this.computeDatasetRange(yData, isBeginAtZero)
          ranges.push(range)
          return ranges
        }, [])

        ranges = this.computingYScale(ranges)
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
