<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>

<script>
import defaultProps from "~/mixins/chart/defaultProps_linebar"

export default {
  mixins: [defaultProps],
  data: () => ({
    type: 'bar',
    option: {
      scales: {
        xAxes: [{
          gridLines: false,
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
      // merge Default Options ~ defaultProps.js
      this.mergeDefaultOptions()

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
