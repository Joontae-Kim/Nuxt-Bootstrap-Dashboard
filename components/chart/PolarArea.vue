<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>
<script>
import defaultProps from "~/mixins/chart/defaultProps"
import chartColorCircle from '~/mixins/chart/color/circle'
import { borderDash, ticksFontColor, zeroLineColor } from "~/lib/chart.lib"

export default {
  mixins: [
    defaultProps,
    chartColorCircle
  ],
  data: () => ({
    type: 'polarArea'
  }),
  mounted () {},
  methods: {
    mergeOption (options) {
      if (!options.scale) {
        options.scale = {}
      }

      if (!options.scale.pointLabels) {
        options.scale.pointLabels = {}
      }

      options.scale.gridLines = !options.scale.gridLines
        ? { color: zeroLineColor, borderDash }
        : this.mergeOptions(options.scale.gridLines, { color: zeroLineColor, borderDash })

      options.scale.ticks = !options.scale.ticks
        ? { fontColor: ticksFontColor }
        : this.mergeOptions(options.scale.ticks, { fontColor: ticksFontColor })
      return options
    },
    renderChart () {
      try {
        const ctx = document.getElementById(this.canvasId).getContext('2d')
        this.mergeDefaultOptions()
        let options = this.mergeOptions(this.option, this.customOpt)
        options = this.mergeOption(options)
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
