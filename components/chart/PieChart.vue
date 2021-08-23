<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>
<script>
import defaultProps from "~/mixins/chart/defaultProps"
import circleChartProps from '~/mixins/chart/props/circle'
import chartColorCircle from '~/mixins/chart/color/circle'

export default {
  mixins: [
    defaultProps,
    circleChartProps,
    chartColorCircle
  ],
  data: () => ({
    type: 'pie'
  }),
  mounted () {},
  methods: {
    renderChart () {
      try {
        const ctx = document.getElementById(this.canvasId).getContext('2d')
        this.mergeDefaultOptions()
        const options = this.mergeOptions(this.option, this.customOpt)
        this.generateDefaultColor()
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
