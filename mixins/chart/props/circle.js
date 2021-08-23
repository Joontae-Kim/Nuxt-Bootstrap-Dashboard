export default {
  props: {
    halfSize: {
      type: Boolean,
      required: false,
      default: (halfChartProps) => {
        return typeof halfChartProps === 'undefined' ? false : halfChartProps
      }
    },
    rotation: {
      type: Number,
      required: false,
      default: 1
    },
    circumference: {
      type: Number,
      required: false,
      default: 1
    },
    restMode: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
