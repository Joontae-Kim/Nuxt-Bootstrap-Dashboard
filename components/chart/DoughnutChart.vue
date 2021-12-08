<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>
<script>
import defaultProps from "~/mixins/chart/defaultProps"
import drawChart from "~/mixins/chart/drawChart"
import circleChartProps from '~/mixins/chart/props/circle'
import chartColorCircle from '~/mixins/chart/color/circle'

export default {
  mixins: [
    defaultProps,
    drawChart,
    circleChartProps,
    chartColorCircle
  ],
  data: () => ({
    type: 'doughnut'
  }),
  mounted () {},
  methods: {
    generateChartColor () {
      if (this.restMode) {
        this.generateRestModeColor()
      } else {
        this.generateDefaultColor()
      }
    },
    renderChart () {
      try {
        const ctx = document.getElementById(this.canvasId).getContext('2d')
        this.mergeDefaultOptions()
        const options = this.mergeOptions(this.option, this.customOpt)
        this.generateChartColor()
        this.drawChart(ctx, options)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
