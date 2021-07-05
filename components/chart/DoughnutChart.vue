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
    type: 'doughnut'
  }),
  mounted () {},
  methods: {
    generateChartColor () {
      const [borderWidth, hoverBorderWidth] = [6, 3]
      if (!this.data.datasets.length) {
        return this.data
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.data.datasets.length < 2) {
          const randomTypeIdx = this.getRandomIntInclusive(this.doughnutPieColorSets.length)
          const colors = this.getColorsByType(this.doughnutPieColorSets[randomTypeIdx])
          this.data.datasets[0].backgroundColor = colors
          this.data.datasets[0].borderWidth = borderWidth
          this.data.datasets[0].hoverBorderWidth = hoverBorderWidth
        } else {
          const counts = Math.round(this.totalColorCount / this.data.datasets.length)
          const colors = new Array(counts).fill(null).reduce((colorSet, color, c) => {
            const typeColors = this.getColorsByType(this.doughnutPieColorSets[c])
            colorSet = colorSet.concat(typeColors)
            return colorSet
          }, [])
          this.data.datasets.forEach((dataset, d) => {
            dataset.backgroundColor = [colors[d].rgb, this.placeholderColor.rgb]
            dataset.borderWidth = borderWidth
            dataset.hoverBorderWidth = hoverBorderWidth
          })
        }
      }
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
