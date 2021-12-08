<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>
<script>
import defaultProps from "~/mixins/chart/defaultProps"
import drawChart from "~/mixins/chart/drawChart"
import circleChartProps from '~/mixins/chart/props/circle'
import chartColorCircle from '~/mixins/chart/color/circle'
import { tooltipStyleObj, tooltipValueFontColor } from "~/lib/chart.lib"

export default {
  mixins: [
    defaultProps,
    drawChart,
    circleChartProps,
    chartColorCircle
  ],
  data: () => ({
    chartInstance: null,
    type: 'pie'
  }),
  computed: {
    pieTooltipOpt () {
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
      options.tooltips = options.tooltips.enabled
        ? this.mergeOptions(this.pieTooltipOpt, options.tooltips)
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
          dataset.datalabels = this.useCustomDataLabelsOpt
            ? this.dataLabelOpt
            : this.mergeOptions(this.pieDatalabels, this.dataLabelOpt)
        })
        this.drawChart(ctx, options)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
