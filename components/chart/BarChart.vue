<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>

<script>
import defaultProps from "~/mixins/chart/defaultProps_linebar"
import computingYScaleBarLine from "~/mixins/chart/computingScaleTicksBarLine"
import { yAxesBorderColor, yAxesGridLine, yAxesTicks, xAxesGridLine, xAxesTicks } from "~/mixins/chart/utils/axisDefaultConfig"

const [
  defaultyAxesGridLine,
  defaultyAxesTicks,
  defaultxAxesGridLine,
  defaultxAxesTicks
] = [{ ...yAxesGridLine }, { ...yAxesTicks }, { ...xAxesGridLine }, { ...xAxesTicks }]

export default {
  mixins: [
    defaultProps,
    computingYScaleBarLine
  ],
  props: {
    singleColor: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    type: 'bar',
    borderWidth: 1.5,
    option: {
      elements: {
        rectangle: {
          borderSkipped: false,
          borderRadius: 15
        }
      },
      scales: {
        xAxes: [{
          gridLines: defaultxAxesGridLine,
          ticks: defaultxAxesTicks
        }],
        yAxes: [{
          color: yAxesBorderColor,
          gridLines: defaultyAxesGridLine,
          ticks: defaultyAxesTicks
        }]
      }
    },
    barSetting: {
      single: {
        barPercentage: 1,
        maxBarThickness: 25
      },
      multi: {
        barPercentage: 0.75,
        maxBarThickness: 30
      }
    }
  }),
  methods: {
    mergeOption () {
      this.mergeDefaultOptions()
      if (this.mixed) {
        this.option.scales.xAxes = this.scalesX.reduce((updatedX, scale) => {
          scale.gridLines = defaultxAxesGridLine
          scale.ticks = scale.ticks ? { ...scale.ticks, ...xAxesTicks } : defaultxAxesTicks
          updatedX.push(scale)
          return updatedX
        }, [])
        this.option.scales.yAxes = this.scalesY.reduce((updatedY, scale) => {
          scale.gridLines = scale.gridLines ? { ...scale.gridLines, ...defaultyAxesGridLine } : defaultyAxesGridLine
          scale.ticks = scale.ticks ? { ...scale.ticks, ...defaultyAxesTicks } : defaultyAxesTicks
          updatedY.push(scale)
          return updatedY
        }, [])
      } else {
        if (this.scalesX) {
          if (this.scalesX.length === 1) {
            if (this.scalesX[0].type && this.scalesX[0].type === 'time') {
              this.option.scales.xAxes[0] = this.scalesX[0]
              if (!this.scalesX[0].time) {
                this.option.scales.xAxes[0].time = { unit: 'hour', distribution: 'series', displayFormats: { minute: 'h:mm a' }, stepSize: 4 }
              }
            } else {
              this.option.scales.xAxes[0] = this.mergeOptions(this.option.scales.xAxes[0], this.scalesX[0])
            }
          } else {
            this.option.scales.xAxes = this.mergeOptions(this.option.scales.xAxes, this.scalesX)
          }
        }

        if (this.scalesY) {
          if (this.scalesY.length === 1) {
            if (this.scalesY[0].type && this.scalesY[0].type === 'time') {
              this.option.scales.yAxes[0] = this.scalesY[0]
            } else {
              this.option.scales.yAxes[0] = this.mergeOptions(this.option.scales.yAxes[0], this.scalesY[0])
            }
          } else {
            this.option.scales.yAxes = this.mergeOptions(this.option.scales.yAxes, this.scalesY)
          }
        }
      }

      let options = this.option
      if (this.customOpt) {
        options = this.mergeOptions(this.option, this.customOpt)
      }
      return options
    },
    generateChartColor () {
      if (!this.data.datasets.length) {
        return this.data
      }

      if (this.singleColor) {
        const colors = this.getRandomColors(this.data.datasets.length)
        const rgbs = colors.map(({ rgb }) => rgb)
        this.data.datasets.forEach((dataset, d) => {
          const color = new Array(dataset.data.length).fill(rgbs[d])
          dataset.borderWidth = this.borderWidth
          dataset.backgroundColor = color
          dataset.borderColor = color
        })
      } else {
        const singleDataSet = this.data.datasets.length < 2
        const colors = this.getRandomColors(this.data.datasets[0].data.length)
        const rgbs = colors.map(({ rgb }) => rgb)
        this.data.datasets.forEach((dataset, d) => {
          const rgb = singleDataSet ? rgbs : rgbs[d]
          dataset.borderWidth = this.borderWidth
          dataset.backgroundColor = rgb
          dataset.borderColor = rgb
        })
      }
    },
    computeScaleTicks (options) {
      const computingAxe = this.computeScaleAxe
      if (computingAxe === 'Y' || computingAxe === 'XY') {
        const yScale = options.scales.yAxes
        let ranges = this.data.datasets.reduce((ranges, { data }, d) => {
          const isBeginAtZero = !!yScale[d].ticks && yScale[d].ticks.beginAtZero
          const range = this.computeDatasetRange(data, isBeginAtZero)
          ranges.push(range)
          return ranges
        }, [])

        ranges = this.computingYScale(ranges)
        ranges.forEach(({ max, min, beginAtZero, stepSize }, r) => {
          yScale[r].ticks = this.mergeOptions(yScale[r].ticks, { min, max, beginAtZero, stepSize })
        })
      }
      // if (computingAxe === 'X' || computingAxe === 'XY') {
      // }
    },
    settingBarConfig () {
      const datasetDefaultConfig = this.mixed || this.singleColor
        ? { borderWidth: this.borderWidth, ...this.barSetting.multi }
        : { borderWidth: this.borderWidth, ...this.barSetting.single }

      if (this.mixed) {
        const barDataSetIndex = this.data.datasets.findIndex(({ type }) => type === 'bar')
        if (barDataSetIndex < 0) {
          return false
        }
        this.data.datasets[barDataSetIndex] = this.mergeOptions(this.data.datasets[barDataSetIndex], datasetDefaultConfig)
      } else {
        this.data.datasets.forEach((dataset, d) => {
          dataset = this.mergeOptions(dataset, datasetDefaultConfig)
        })
      }
    },
    renderChart () {
      try {
        const ctx = document.getElementById(this.canvasId).getContext('2d')
        const options = this.mergeOption()
        if (this.mixed) {
          this.generateMixedChartColor()
        } else {
          this.generateChartColor()
        }
        if (this.computeScaleAxe) {
          this.computeScaleTicks(options)
        }
        this.settingBarConfig()
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
</script>
