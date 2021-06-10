<template>
  <b-col cols md="6">
    <dash-card
      title="Total Views"
      class="pb-3"
    >
      <b-row id="traffic-chart-wrapper" align-v="center" class="h-100">
        <b-col cols class="h-100 chart__container-sm">
          <client-only>
            <LazyDoughnutChart
              ref="traffic-chart"
              canvas-id="traffic-chart"
              :data="trafficDataset"
              :custom-opt="trafficOptions"
              height="200"
              :legend-view="true"
            />
          </client-only>
        </b-col>
      </b-row>
    </dash-card>
  </b-col>
</template>

<script>
import createChartColors from "~/mixins/chart/createChartColors"

export default {
  name: "TrafficSoureces",
  mixins: [
    createChartColors
  ],
  props: {
    traffic: {
      type: Object,
      required: true,
      default: (trafficProps) => {
        return trafficProps === undefined || trafficProps === {}
          ? { organic: 0, direct: 0, social: 0, paid: 0 }
          : trafficProps
      }
    }
  },
  computed: {
    trafficDataset () {
      const total = Object.values(this.traffic).reduce((sum, idx) => sum + idx, 0)
      const placeholderColor = this.getColors('placeholder')
      const colors = this.getRandomColors(Object.values(this.traffic).length + 1)
      const datasets = [
        {
          data: [total],
          backgroundColor: [colors[0].rgba],
          borderWidth: 3,
          hoverBorderWidth: 2,
          labels: ['total']
        }
      ]
      let colorIdx = 1
      for (const [key, value] of Object.entries(this.traffic)) {
        console.log(`${key}: ${value}`)
        const rest = total - value
        datasets.push({
          data: [rest, value],
          backgroundColor: [colors[colorIdx].rgba, placeholderColor.rgba],
          borderWidth: 7,
          hoverBorderWidth: 3,
          labels: [key, 'rest']
        })
        colorIdx++
      }
      return {
        datasets,
        labels: ['total', ...Object.keys(this.traffic)]
      }
    },
    trafficOptions () {
      return {
        responsive: true,
        cutoutPercentage: 20,
        legend: {
          display: true,
          position: 'right',
          labels: {
            generateLabels (chart) {
              const data = chart.data
              if (data.labels.length && data.datasets.length) {
                const labels = []
                for (const [d, dataset] of data.datasets.entries()) {
                  const meta = Object.values(dataset._meta)[0]
                  const metaHidden = meta.hidden
                  labels.push({
                    text: dataset.labels[0],
                    fillStyle: dataset.backgroundColor[0],
                    lineWidth: 0,
                    hidden: isNaN(dataset.data[0]) || metaHidden,
                    index: d
                  })
                }
                return labels
              }
            }
          },
          onClick (e, legendItem) {
            const index = legendItem.index
            const ci = this.chart
            const meta = ci.getDatasetMeta(index)
            const dataSetMetasHidden = ci.data.datasets.map(dataset => Object.values(dataset._meta)[0].hidden)
            const comparisonMetasHidden = ci.data.datasets.map(dataset => Object.values(dataset._meta)[0].hidden)
            comparisonMetasHidden[index] = meta.hidden === null ? !ci.data.datasets[index].hidden : null
            const comparisonMetasHiddenTrue = comparisonMetasHidden.filter(dataset => dataset === true)
            if (comparisonMetasHiddenTrue.length === dataSetMetasHidden.length) {
              return false
            }
            meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null
            ci.update()
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
