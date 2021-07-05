// /chart/createChartColor.js
import { colorTypes, colorSet } from './colorSet'

export default {
  data: () => ({
    colorTypes,
    colorSet,
    doughnutPieColorSets: [
      'Blue',
      'Indigo',
      'BlueGray'
    ]
  }),
  computed: {
    totalColorCount () {
      return this.doughnutPieColorSets.length * 4
    },
    placeholderColor () {
      return this.colorSet.find(color => color.type === 'placeholder')
    }
  },
  created () {},
  mounted () {},
  methods: {
    getRandomIntInclusive (max = this.colorSet.length - 1, min = 0) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    getRandomType (multi = false, count = this.colorTypes.length) {
      if (!multi) {
        const randomTypeIdx = this.getRandomIntInclusive(this.colorTypes.length)
        return this.colorTypes[randomTypeIdx]
      } else {
        const typesIdx = []
        const max = this.colorTypes.length
        while (typesIdx.length < count) {
          const randomIdx = this.getRandomIntInclusive(max)
          if (!typesIdx.includes(randomIdx)) {
            typesIdx.push(randomIdx)
          }
        }
        const types = typesIdx.reduce((filled, idx) => {
          filled.push(this.colorTypes[idx])
          return filled
        }, [])
        return types
      }
    },
    getRandomColor () {
      const random = this.getRandomIntInclusive()
      return this.colorSet[random]
    },
    getRandomColors (count = 5) {
      const paletteIdx = []
      while (paletteIdx.length < count) {
        const random = this.getRandomIntInclusive()
        if (!paletteIdx.includes(random)) {
          paletteIdx.push(random)
        }
      }
      const palette = paletteIdx.reduce((filled, idx) => {
        filled.push(this.colorSet[idx])
        return filled
      }, [])
      return palette
    },
    getColorsByType (types) {
      if (!types || !colorTypes.includes(types)) {
        types = colorTypes[Math.floor(Math.random() * colorTypes.length)]
      }

      if (typeof types === 'string') {
        const typeColors = this.colorSet.filter(({ type }) => types === type)
        return typeColors
      } else {
        types = types.map((type) => {
          if (!colorTypes.includes(type)) {
            return colorTypes[Math.floor(Math.random() * colorTypes.length)]
          } else {
            return type
          }
        })
        const typeColors = this.colorSet.filter(([type]) => colorTypes.includes(type))
        return typeColors
      }
    }
  }
}