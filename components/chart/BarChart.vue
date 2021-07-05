<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>

<script>
import defaultProps from "~/mixins/chart/defaultProps_linebar"
import createChartColor from "~/mixins/chart/createChartColor"

export default {
  mixins: [
    defaultProps,
    createChartColor
  ],
  props: {
    singleColor: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    type: 'bar',
    global: {
      single: {
        borderWidth: 1.5,
        barPercentage: 0.4
      },
      multi: {
        borderWidth: 1.5,
        barPercentage: 0.5
      }
    },
    option: {
      elements: {
        rectangle: {
          borderSkipped: false
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            borderDash: [3, 4]
          },
          ticks: {
            padding: 7
          }
        }],
        yAxes: [{
          gridLines: {
            borderDash: [3, 4]
          },
          ticks: {
            beginAtZero: false,
            padding: 7
          }
        }]
      }
    }
  }),
  methods: {
    mergeOption () {
      this.mergeDefaultOptions()
      if (this.mixed) {
        this.option.scales.xAxes = this.scalesX
        this.option.scales.yAxes = this.scalesY
      } else {
        if (this.scalesX) {
          if (this.scalesX.length === 1) {
            if (this.scalesX[0].type && this.scalesX[0].type === 'time') {
              this.option.scales.xAxes[0] = this.scalesX[0]
              if (!this.scalesX[0].time) {
                this.option.scales.xAxes[0].time = { unit: 'hour', distribution: 'series', displayFormats: { minute: 'h:mm a' }, stepSize: 4 }
              }
            } else {
              this.option.scales.xAxes[0] = this.mergeOptions(this.option.scales.xAxes[0], this.scalesX[0])
            }
          } else {
            this.option.scales.xAxes = this.mergeOptions(this.option.scales.xAxes, this.scalesX)
          }
        }

        if (this.scalesY) {
          if (this.scalesY.length === 1) {
            if (this.scalesY[0].type && this.scalesY[0].type === 'time') {
              this.option.scales.yAxes[0] = this.scalesY[0]
            } else {
              this.option.scales.yAxes[0] = this.mergeOptions(this.option.scales.yAxes[0], this.scalesY[0])
            }
          } else {
            this.option.scales.yAxes = this.mergeOptions(this.option.scales.yAxes, this.scalesY)
          }
        }
      }

      let options = {
        legend: {
          display: this.legendView
        },
        ...this.option
      }

      if (this.customOpt) {
        options = this.mergeOptions(options, this.customOpt)
      }
      return options
    },
    generateChartColor () {
      if (!this.data.datasets.length) {
        return []
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.singleColor) {
          const colors = this.getRandomColors(this.data.datasets.length)
          const rgbs = colors.map(({ rgb }) => rgb)
          const option = this.global.single
          this.data.datasets.forEach((dataset, d) => {
            dataset.borderWidth = option.borderWidth
            dataset.barPercentage = option.barPercentage
            const color = new Array(dataset.data.length).fill(rgbs[d])
            dataset.backgroundColor = color
            dataset.borderColor = color
            dataset.hoverBackgroundColor = color
            dataset.hoverBorderColor = color
          })
        } else if (this.data.datasets.length < 2) {
          const dataCount = this.data.datasets[0].data.length
          const counts = this.colorTypes.length >= dataCount
            ? Math.floor(this.colorTypes.length / dataCount)
            : Math.floor(this.colorTypes.length * 4 / dataCount)
          const option = this.global.single
          let randomType = this.getRandomType()
          let colors = this.getColorsByType(randomType)
          let rgbs = []
          if (counts < 2) {
            randomType = this.getRandomType(counts)
            colors = this.getColorsByType(randomType)
            rgbs = colors.map(({ rgb }) => rgb)
          } else {
            randomType = this.getRandomType(counts, true)
            colors = this.getColorsByType(randomType)
            rgbs = colors.map(({ rgb }) => rgb)
          }
          this.data.datasets[0].borderWidth = option.borderWidth
          this.data.datasets[0].barPercentage = option.barPercentage
          this.data.datasets[0].backgroundColor = rgbs
          this.data.datasets[0].borderColor = rgbs
          this.data.datasets[0].hoverBackgroundColor = rgbs
          this.data.datasets[0].hoverBorderColor = rgbs
        } else {
          const option = this.global.multi
          const colors = this.getRandomColors(this.data.datasets[0].data.length)
          const rgbs = colors.map(({ rgb }) => rgb)
          this.data.datasets.forEach((dataset, d) => {
            dataset.borderWidth = option.borderWidth
            dataset.barPercentage = option.barPercentage
            dataset.backgroundColor = rgbs[d]
            dataset.borderColor = rgbs[d]
            dataset.hoverBackgroundColor = rgbs[d]
            dataset.hoverBorderColor = rgbs[d]
          })
        }
      }
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
