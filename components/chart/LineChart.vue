<template>
  <div :style="{'position: relative; height:30vh; width:50vw': option.responsive}">
    <canvas :id="canvasId" v-bind="{width, height}" class="pb-3" />
  </div>
</template>
<script>
import defaultProps from "../../mixins/chart/defaultProps"

export default {
  mixins: [defaultProps],
  props: {
    yMax: {
      type: [Number, Boolean],
      required: false,
      default: false
    }
  },
  data: () => ({
    type: 'line',
    option: {
      scales: {
        xAxes: [{
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
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: false,
            labelString: 'Value'
          },
          ticks: {
            beginAtZero: false
          },
          title: {
            display: false
          }
        }]
      }
    }
  }),
  watch: {},
  created () {
    if (this.yMax) {
      this.option.scales.yAxes[0].ticks.stepSize = this.yMax > 50 ? 15 : 10
    }
  },
  mounted () {},
  beforeDestroy () {},
  methods: {}
}
</script>
