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
      type: Object,
      required: false,
      default: (customOptProps) => {
        return typeof customOptProps === 'undefined' ? {} : customOptProps
      }
    },
    legendView: {
      type: Boolean,
      required: false,
      default: false
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
      },
      legend: {
        display: false
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

      this.option.legend.display = this.legendView
    },
    renderChart () {
      try {
        const ctx = document.getElementById(this.canvasId).getContext('2d')
        const options = this.mergeOptions(this.option, this.customOpt)
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
