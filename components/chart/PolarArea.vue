<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>
<script>
import defaultProps from "~/mixins/chart/defaultProps"
import drawChart from "~/mixins/chart/drawChart"
import chartColorCircle from '~/mixins/chart/color/circle'
import { borderDash, ticksFontColor, zeroLineColor, tooltipStyleObj, tooltipValueFontColor } from "~/lib/chart.lib"

export default {
  mixins: [
    defaultProps,
    drawChart,
    chartColorCircle
  ],
  data: () => ({
    type: 'polarArea',
    chartInstance: null
  }),
  computed: {
    polarAreaTooltipOpt () {
      return {
        callbacks: {
          title (tooltipItem, data) {
            return data.labels[tooltipItem[0].index]
          },
          label (tooltipItem, data) {
            return `  ${data.datasets[0].data[tooltipItem.index]}`
          }
        },
        ...tooltipStyleObj,
        bodyFontColor: tooltipValueFontColor
      }
    }
  },
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

      options.tooltips = options.tooltips.enabled
        ? this.mergeOptions(this.polarAreaTooltipOpt, options.tooltips)
        : options.tooltips

      return options
    },
    renderChart () {
      try {
        const ctx = document.getElementById(this.canvasId).getContext('2d')
        this.mergeDefaultOptions()
        let options = this.mergeOptions(this.option, this.customOpt)
        options = this.mergeOption(options)
        this.generateDefaultColor()
        this.data.datasets.forEach((dataset) => {
          dataset.datalabels = !this.dataLabelOpt
            ? this.polarAreaDatalabels
            : this.mergeOptions(this.polarAreaDatalabels, this.dataLabelOpt)
        })
        this.drawChart(ctx, options)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
