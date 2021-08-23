export default {
  methods: {
    generateRestModeColor () {
      if (!this.data.datasets.length) {
        return this.data
      }

      const colors = this.getRandomColors(this.data.datasets.length)
      this.data.datasets.forEach((dataset, d) => {
        dataset.backgroundColor = [colors[d].rgb, this.placeholder.rgb]
        dataset.borderWidth = this.borderWidth
        dataset.hoverBorderWidth = this.hoverBorderWidth
      })
    },
    generateDefaultColor () {
      if (!this.data.datasets.length) {
        return this.data
      }

      const dataCount = this.data.datasets.reduce((count, { data }) => count + data.length, 0)
      let colorLastIdx = 0
      const colors = this.getRandomColors(dataCount)
      this.data.datasets.forEach((dataset, d) => {
        const dataColors = colors.slice(colorLastIdx, colorLastIdx + dataset.data.length)
        dataset.backgroundColor = dataColors.map(({ rgb }) => rgb)
        colorLastIdx = d + (dataset.data.length)
      })
    }
  }
}
