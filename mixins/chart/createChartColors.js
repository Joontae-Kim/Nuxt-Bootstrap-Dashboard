export default {
  name: "createChartColors",
  data: () => ({
    colors: [
      { label: 'red', hex: '#f44336', rgba: 'rgba(244, 67, 54, 1)' },
      { label: 'pink', hex: '#e91e63', rgba: 'rgba(233, 30, 99, 1)' },
      { label: 'purple', hex: '#9c27b0', rgba: 'rgba(155, 39, 175, 1)' },
      { label: 'indigo', hex: '#3f51b5', rgba: 'rgba(63, 81, 181, 1)' },
      { label: 'blue', hex: '#2196f3', rgba: 'rgba(33, 150, 243, 1)' },
      { label: 'teal', hex: '#009688', rgba: 'rgba(0, 150, 136, 1)' },
      { label: 'green', hex: '#4caf50', rgba: 'rgba(0, 150, 136, 1)' },
      { label: 'yellow', hex: '#ffeb3b', rgba: 'rgba(255, 235, 59, 1)' },
      { label: 'orange', hex: '#ff9800', rgba: 'rgba(255, 152, 0, 1)' },
      { label: 'brown', hex: '#795548', rgba: 'rgba(121, 85, 72, 1)' },
      { label: 'dark', hex: '#212121', rgba: 'rgba(33, 33, 33, 1)' },
      { label: 'gray', hex: '#9e9e9e', rgba: 'rgba(158, 158, 158, 1)' },
      { label: 'placeholder', hex: '#ced4da', rgba: 'rgba(206, 212, 218, 1)' }
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
        return { label: 'gray', hex: '#9e9e9e' }
      } else {
        return color
      }
    }
  }
}
