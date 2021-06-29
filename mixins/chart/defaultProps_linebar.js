import mergeOptions from '~/mixins/chart/mergeOptions'

export default {
  mixins: [
    mergeOptions
  ],
  props: {
    canvasId: {
      type: String,
      required: true,
      default: (idProps) => {
        return typeof idProps === 'undefined' ? null : idProps
      }
    },
    data: {
      type: [Object, Array],
      required: true,
      default: (dataProps) => {
        return typeof dataProps === 'undefined' ? null : dataProps
      }
    },
    customOpt: {
      type: [Object, String],
      required: false,
      default: (customOptProps) => {
        return typeof customOptProps === 'undefined' ? null : customOptProps
      }
    },
    width: {
      type: [Number, Boolean, String],
      required: false,
      default: false
    },
    height: {
      type: [Number, Boolean, String],
      required: false,
      default: false
    },
    legendView: {
      type: Boolean,
      required: false,
      default: false
    },
    tooltip: {
      type: [Object, Boolean],
      required: false,
      default: false
    },
    useDataLabel: {
      type: Boolean,
      required: false,
      default: (dtLabelProps) => {
        return typeof dtLabelProps === 'undefined' ? false : dtLabelProps
      }
    },
    dataLabelOpt: {
      type: Object,
      required: false,
      default: (dtLabelOptProps) => {
        return typeof dtLabelOptProps === 'undefined' ? {} : dtLabelOptProps
      }
    },
    scalesX: {
      type: [Array, Boolean],
      required: false,
      default: (scalesXProps) => {
        return typeof scalesXProps === 'undefined' ? false : scalesXProps
      }
    },
    scalesY: {
      type: [Array, Boolean],
      required: false,
      default: (scalesYProps) => {
        return typeof scalesYProps === 'undefined' ? false : scalesYProps
      }
    }
  },
  data: () => ({
    option: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {}
      },
      tooltips: {
        enabled: true
      }
    }
  }),
  computed: {},
  watch: {
    data (dt) {
      if (dt.datasets[0].data.length) {
        this.renderChart()
      }
    }
  },
  mounted () {
    if (!!this.data.datasets && this.data.datasets.length) {
      this.renderChart()
    }
  },
  beforeDestroy () {},
  methods: {
    mergeDefaultOptions () {
      if (!this.useDataLabel) {
        this.option.plugins.datalabels = false
      } else {
        this.option.plugins.datalabels = this.dataLabelOpt
      }

      if (!this.tooltip) {
        this.option.tooltips.enabled = false
      } else {
        this.option.tooltips = { enabled: true, ...this.tooltip }
      }
    }
  }
}
