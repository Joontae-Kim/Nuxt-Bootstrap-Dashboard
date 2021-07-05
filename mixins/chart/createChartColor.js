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
    getRandomType (count = this.colorTypes.length, multi = false) {
      if (!multi) {
        const randomTypeIdx = this.getRandomIntInclusive(this.colorTypes.length)
        return this.colorTypes[randomTypeIdx]
      } else {
        const [typesIdx, max] = [[], this.colorTypes.length]
        let r = 0
        do {
          let random = this.getRandomIntInclusive(max)
          random = random === 0 ? 0 : random - 1
          const accumulated = typesIdx[r - 1] === random
          if ((!typesIdx.includes(random) || (typesIdx.includes(random) && typesIdx.length < count)) && !accumulated) {
            typesIdx.push(random)
            r = ++r
          }
        } while (typesIdx.length < count)
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
      if (typeof types === 'string') {
        if (!types || !colorTypes.includes(types)) {
          types = colorTypes[Math.floor(Math.random() * colorTypes.length)]
        }
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
        const typeColors = this.colorSet.filter(({ type }) => types.includes(type))
        return typeColors
      }
    }
  }
}
