<template>
  <b-col cols md="6" class="mb-4 mb-md-0">
    <dash-card
      title="Total Views"
      class="pb-3"
    >
      <b-row id="traffic-chart-wrapper" align-v="center" class="h-100">
        <b-col cols="6" lg="7" class="chart-container chart-h-md-25 chart-h-lg-45 chart-h-xl-35 chart-max-h-md-150 chart-max-h-lg-200 chart-max-h-xl-250">
          <client-only>
            <LazyDoughnutChart
              ref="traffic-chart"
              canvas-id="traffic-chart"
              :data="trafficDataset"
              :custom-opt="trafficOptions"
              :legend-view="false"
              :custom-legend="true"
              custom-legend-id="traffic-chart-lengend"
              :legend-callback="trafficLegendCb"
              :custom-legend-click="trafficLegendClick"
              responsive
            />
          </client-only>
        </b-col>
        <b-col cols="6" lg="5">
          <div id="traffic-chart-lengend" />
        </b-col>
      </b-row>
    </dash-card>
  </b-col>
</template>

<script>
export default {
  name: "TrafficSoureces",
  mixins: [],
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
      let _traffic = Object.entries(this.traffic).map(([key, value]) => ({ name: key, value }))
      _traffic = _traffic.sort((b, a) => a.value - b.value)
      const datasets = [{ data: [total, 0], labels: ['total'] }]
      for (const { name, value } of _traffic) {
        datasets.push({
          data: [value, total - value],
          labels: [name, 'rest']
        })
      }
      return {
        datasets,
        labels: ['total', ...Object.keys(this.traffic)]
      }
    },
    trafficOptions () {
      return {
        cutoutPercentage: 20,
        legend: {
          display: false
        }
      }
    }
  },
  methods: {
    trafficLegendCb (chart) {
      const datasets = chart.data.datasets
      const legendGroup = datasets.reduce((group, label, l) => {
        const backgroundColor = label.backgroundColor[0]
        const labelText = label.labels[0]
        const data = label.data[0]
        group.push(`
        <div id="traffic-legend-${l}" data-legend-role="parent" data-chart-dataset="${l}" data-chart-idx="0" class="d-flex align-items-center mb-2 user-select-none" style="color:${backgroundColor}; font-size: 0.8rem">
          <div data-legend-parent="traffic-legend-${l}" class="legend-content">
            <span class="legend-dot legend-dot--circle" style="background-color:${backgroundColor}"></span>
            <span class="ml-2">${labelText}</span>
          </div>
          <div data-legend-parent="traffic-legend-${l}" class="legend-value ml-auto">${data}</div>
        </div>
        `)
        return group
      }, [])
      return legendGroup.join('')
    },
    trafficLegendClick (chart, event) {
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
        const dataSetMetasHidden = new Array(chart.config.data.labels.length).fill(null).reduce((datasetsHidden, dataset, d) => {
          const meta = chart.getDatasetMeta(d)
          datasetsHidden.push(meta.data[0].hidden)
          return datasetsHidden
        }, [])
        dataSetMetasHidden[datasetIdx] = !dataSetMetasHidden[datasetIdx]
        const isAllHidden = dataSetMetasHidden.filter(metaHidden => metaHidden === true)
        if (isAllHidden.length === dataSetMetasHidden.length) {
          return false
        }
        const meta = chart.getDatasetMeta(datasetIdx)
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
</script>

<style>

</style>
