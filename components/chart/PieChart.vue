<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>
<script>
import defaultProps from "~/mixins/chart/defaultProps"
import circleChartProps from '~/mixins/chart/props/circle'
import chartColorCircle from '~/mixins/chart/color/circle'
import { tooltipStyleObj, tooltipValueFontColor, datalabelsCircleLabel } from "~/lib/chart.lib"

export default {
  mixins: [
    defaultProps,
    circleChartProps,
    chartColorCircle
  ],
  data: () => ({
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
    },
    pieDatalabels () {
      const defaultCircleDatalabelsOpt = datalabelsCircleLabel()
      const pieDefaultDatalabelsOpt = {
        anchor: 'end'
      }
      const mergedPieDatalabels = this.mergeOptions(defaultCircleDatalabelsOpt, pieDefaultDatalabelsOpt)
      return mergedPieDatalabels
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
