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
    },
    customLegend: {
      type: Boolean,
      required: false,
      default: (clProps) => {
        return typeof clProps === 'undefined' ? false : clProps
      }
    },
    customLegendId: {
      type: String,
      required: false,
      default: (clIdProps) => {
        return typeof clIdProps === 'undefined' ? null : clIdProps
      }
    },
    legendCallback: {
      type: [Function, Object],
      required: false,
      default: (legendcbProps) => {
        return typeof legendcbProps === 'undefined' ? null : legendcbProps
      }
    },
    customLegendClick: {
      type: [Function, Boolean, String],
      required: false,
      default: (customLegendClickProps) => {
        return typeof customLegendClickProps === 'undefined' ? false : customLegendClickProps
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

      this.option.legend.display = this.legendView && !this.customLegend

      this.option.customLegend = this.customLegend

      if (this.customLegend && !!this.customLegendId) {
        this.option.customLegendId = this.customLegendId
      }

      if (this.legendCallback) {
        this.option.legendCallback = this.legendCallback
      }
      this.option.useCustomLegendClick = !!this.customLegendClick
      if (this.option.useCustomLegendClick) {
        this.option.customLegendClick = (typeof this.customLegendClick === 'string' && this.customLegendClick.toLocaleLowerCase() === 'default') ? this.customLegendDefaultClick : this.customLegendClick
      }
    },
    customLegendDefaultClick (chart, event) {
      event = event || window.event
      let target = event.target || event.srcElement
      if (target) {
        if (!target.dataset.legendRole) {
          while (!target.dataset.legendParent) {
            target = target.parentElement
          }
          target = document.getElementById(target.dataset.legendParent)
        }
        const [datasetIdx, idx] = [target.dataset.chartDataset, target.dataset.chartIdx]
        const meta = chart.getDatasetMeta(datasetIdx)
        const comparisonMetasHidden = meta.data.map(data => data.hidden)
        comparisonMetasHidden[idx] = !comparisonMetasHidden[idx]
        const comparisonMetasHiddenTrue = comparisonMetasHidden.filter(dataset => dataset === true)
        if (comparisonMetasHiddenTrue.length === comparisonMetasHidden.length) {
          return false
        }
        const item = meta.data[idx]
        if (item.hidden === null || item.hidden === false) {
          target.classList.add('legend-hidden')
        } else {
          target.classList.remove('legend-hidden')
        }
        item.hidden = !item.hidden
        chart.update()
      }
    }
  }
}
