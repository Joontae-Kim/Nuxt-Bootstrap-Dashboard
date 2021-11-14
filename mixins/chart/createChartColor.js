// /chart/createChartColor.js
import { extendedColors, placeholderColor } from './colorSet'

export default {
  data: () => ({
    colorSet: extendedColors,
    placeholder: placeholderColor
  }),
  computed: {
    totalColorCount () {
      return this.colorSet.length
    }
  },
  created () {},
  mounted () {},
  methods: {
    getRandomIntInclusive (max = this.totalColorCount - 1, min = 0) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    getRandomColor () {
      const random = this.getRandomIntInclusive()
      return this.colorSet[random]
    },
    getRandomColors (count = 5) {
      const randomStart = this.getRandomIntInclusive()
      let randomPalette = this.colorSet.slice(randomStart, count)
      if (Math.abs(count - randomPalette.length) > 0) {
        const overPalette = this.colorSet.slice(0, count - randomPalette.length)
        randomPalette = [...overPalette, ...randomPalette]
      }
      return randomPalette
    }
  }
}
