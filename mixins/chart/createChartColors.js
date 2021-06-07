export default {
  name: "createChartColors",
  data: () => ({
    colors: [
      { label: 'red', value: '#f44336' },
      { label: 'pink', value: '#e91e63' },
      { label: 'purple', value: '#e91e63' },
      { label: 'indigo', value: '#e91e63' },
      { label: 'blue', value: '#e91e63' },
      { label: 'teal', value: '#e91e63' },
      { label: 'green', value: '#4caf50' },
      { label: 'yellow', value: '#ffeb3b' },
      { label: 'orange', value: '#ff9800' },
      { label: 'brown', value: '#795548' },
      { label: 'dark', value: '#212121' },
      { label: 'gray', value: '#9e9e9e' }
    ]
  }),
  created () {},
  mounted () {},
  methods: {
    getColors (variants) {
      if (typeof variants === 'string') {
        return this.findColor(variants)
      } else {
        const palette = variants.reduce((filled, variant) => {
          const color = this.findColor(variant)
          filled.push(color)
          return filled
        }, [])
        return palette
      }
    },
    getRandomColors (count = 5) {
      const paletteIdx = []
      while (paletteIdx.length < count) {
        const random = Math.floor(Math.random() * count) + 1
        if (!paletteIdx.includes(random)) {
          paletteIdx.push(random)
        }
      }
      const palette = paletteIdx.reduce((filled, idx) => {
        filled.push(this.colors[idx])
        return filled
      }, [])
      return palette
    },
    findColor (variant) {
      const color = this.colors.find(color => color.label === variant)
      if (color === undefined) {
        return { label: 'gray', value: '#9e9e9e' }
      } else {
        return color
      }
    }
  }
}
