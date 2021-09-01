import mergeOptions from '~/mixins/chart/mergeOptions'
import createChartColor from "~/mixins/chart/createChartColor"
import { datalabelsFontSize, datalabelsFontColor, datalabelsCircleLabel } from '~/lib/chart.lib'

const defaultCircleDatalabelsOpt = datalabelsCircleLabel()

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
      type: [Object, Array],
      required: false,
      default: (dtLabelOptProps) => {
        return typeof dtLabelOptProps === 'undefined' ? {} : dtLabelOptProps
      }
    },
    useCustomDataLabelsOpt: {
      type: Boolean,
      required: false,
      default: (useCustomDataLabelsOptProps) => {
        return typeof useCustomDataLabelsOptProps === 'undefined' ? false : useCustomDataLabelsOptProps
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
    borderWidth: 6,
    hoverBorderWidth: 3,
    option: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          color: datalabelsFontColor,
          font: {
            size: datalabelsFontSize
          }
        }
      },
      tooltips: {
        enabled: true
      },
      legend: {
        display: false
      }
    }
  }),
  computed: {
    pieDatalabels () {
      const pieDefaultDatalabelsOpt = {
        anchor: 'end',
        backgroundColor (context) {
          return context.dataset.backgroundColor
        }
      }
      const mergedPieDatalabels = this.mergeOptions(defaultCircleDatalabelsOpt, pieDefaultDatalabelsOpt)
      return mergedPieDatalabels
    },
    polarAreaDatalabels () {
      const defaultCircleDatalabelsOpt = datalabelsCircleLabel()
      const polarDefaultDatalabelsOpt = {
        anchor: 'end',
        backgroundColor (context) {
          return context.dataset.backgroundColor
        },
        font: {
          size: datalabelsFontSize
        }
      }
      const mergedOpt = this.mergeOptions(defaultCircleDatalabelsOpt, polarDefaultDatalabelsOpt)
      return mergedOpt
    }
  },
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
      this.option.responsive = this.responsive
      this.option.maintainAspectRatio = !this.responsive

      if (!this.useDataLabel) {
        this.option.plugins.datalabels = false
      }

      if (!this.tooltip) {
        this.option.tooltips.enabled = false
      } else {
        this.option.tooltips = typeof this.tooltip === 'object'
          ? this.mergeOptions(this.tooltip, this.option.tooltips)
          : this.tooltip === false
            ? { enabled: false }
            : this.option.tooltips
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
      if (['doughnut', 'pie'].includes(this.type) && this.halfSize) {
        this.option.rotation = this.rotation * Math.PI
        this.option.circumference = this.circumference * Math.PI
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
