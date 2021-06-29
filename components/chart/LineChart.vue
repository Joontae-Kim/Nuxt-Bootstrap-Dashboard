<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>
<script>
import defaultProps from "~/mixins/chart/defaultProps_linebar"

export default {
  mixins: [defaultProps],
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
          this.option.scales.yAxes[0].gridLines = { gridLines: { borderDash: [3, 4] } }
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
    renderChart () {
      try {
        const ctx = document.getElementById(this.canvasId).getContext('2d')
        const options = this.mergeOption()
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
