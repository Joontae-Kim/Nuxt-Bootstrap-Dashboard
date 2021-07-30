<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>
<script>
import defaultProps from "../../mixins/chart/defaultProps"
import createChartColor from "~/mixins/chart/createChartColor"

export default {
  mixins: [
    defaultProps,
    createChartColor
  ],
  data: () => ({
    type: 'pie'
  }),
  mounted () {},
  methods: {
    generateChartColor () {
      const dataCount = this.data.datasets.reduce((count, dataset) => {
        count += dataset.data.length
        return count
      }, 0)
      const counts = this.doughnutPieColorSets.length >= dataCount
        ? Math.floor(this.doughnutPieColorSets.length / dataCount)
        : Math.ceil(this.totalColorCount / dataCount)
      const colors = new Array(counts).fill(null).reduce((colorSet, color, c) => {
        const typeColors = this.getColorsByType(this.doughnutPieColorSets[c])
        colorSet = colorSet.concat(typeColors)
        return colorSet
      }, [])
      let colorLastIdx = 0
      this.data.datasets = this.data.datasets.reduce((colored, dataset, d) => {
        const dataColors = colors.slice(colorLastIdx, colorLastIdx + dataset.data.length)
        dataset.backgroundColor = dataColors.map(({ rgb }) => rgb)
        colored.push(dataset)
        colorLastIdx = d + (dataset.data.length)
        return colored
      }, [])
    },
    renderChart () {
      try {
        const ctx = document.getElementById(this.canvasId).getContext('2d')
        this.mergeDefaultOptions()
        const options = this.mergeOptions(this.option, this.customOpt)
        this.generateChartColor()
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
