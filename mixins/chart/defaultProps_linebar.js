import mergeOptions from '~/mixins/chart/mergeOptions'
import createChartColor from "~/mixins/chart/createChartColor"

export default {
  mixins: [
    mergeOptions,
    createChartColor
  ],
  props: {
    responsive: {
      type: Boolean,
      required: false,
      default: false
    },
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
      type: [Object, Array],
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
    },
    mixed: {
      type: Boolean,
      required: false,
      default: (mixedProps) => {
        return typeof mixedProps === 'undefined' ? false : mixedProps
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
    },
    computeScaleAxe: {
      type: [Boolean, String],
      required: false,
      default: (computeScaleAxeProps) => {
        // undefined, X, Y, XY
        return typeof computeScaleAxeProps === 'undefined' ? false : computeScaleAxeProps.toLocaleLowerCase()
      }
    },
    computeSameStepSizeX: {
      type: Boolean,
      required: false,
      default: (computeSameStepSizeXProps) => {
        return typeof computeSameStepSizeXProps === 'undefined' ? false : computeSameStepSizeXProps
      }
    }
  },
  data: () => ({
    borderWidth: 6,
    hoverBorderWidth: 3,
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
        display: true
      }
    },
    dataLabelMap: {
      line: 'lineDataLableOpt',
      bar: 'barDataLableOpt'
    },
    lineDataLableOpt: {
      padding: 6,
      color: "white",
      font: {
        size: 10,
        padding: 5
      },
      borderWidth: 2,
      borderRadius: 25,
      borderColor: '#fff',
      backgroundColor (context) {
        return context.dataset.borderColor
      },
      display () {
        return window.innerWidth >= 992
      }
    },
    barDataLableOpt: {}
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
    generateMixedChartColor () {
      const colors = this.getRandomColors(this.data.datasets.length)
      this.data.datasets.forEach((dataset, d) => {
        const color = colors[d]
        if (dataset.type === 'line') {
          dataset.backgroundColor = color.border // 'rgba(206, 212, 218, 0.8)'
          dataset.pointBackgroundColor = color.rgb
          dataset.borderColor = color.rgb
          dataset.borderWidth = 1
        } else if (dataset.type === 'bar') {
          dataset.backgroundColor = color.background
          dataset.pointBackgroundColor = color.rgb
          dataset.borderColor = color.background
          dataset.borderWidth = 0
        }
        dataset.fill = typeof dataset.fill === 'undefined' ? true : dataset.fill
      })
    },
    mergeDefaultOptions () {
      this.option.responsive = this.responsive
      this.option.maintainAspectRatio = !this.responsive

      if (!this.useDataLabel) {
        this.option.plugins.datalabels = false
      } else {
        const chartDatalabels = this[this.dataLabelMap[this.type]]
        this.option.plugins.datalabels = !this.mixed ? this.mergeOptions(chartDatalabels, this.dataLabelOpt) : this.dataLabelOpt
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
      if (this.customLegendClick) {
        this.option.customLegendClick = (typeof this.customLegendClick === 'string' && this.customLegendClick.toLocaleLowerCase() === 'default') ? this.customLegendDefaultClick : this.customLegendClick
      }
    }
  }
}
