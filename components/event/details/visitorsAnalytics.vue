<template>
  <b-col cols md="6">
    <dash-card
      title="View Analytics"
      class="pb-3"
    >
      <b-row id="view-chart-wrapper" align-v="center" class="h-100">
        <b-col cols="6" lg="7" class="chart-container chart-h-25 chart-range-h-sm-150 chart-range-h-lg-200">
          <client-only>
            <LazyPieChart
              ref="view-chart"
              canvas-id="view-chart"
              :data="viewsDataset"
              :legend-view="false"
              :custom-legend="true"
              :data-label-opt="{ color: '#fff' }"
              use-data-label
              custom-legend-id="view-chart-lengend"
              :legend-callback="viewLegendCb"
              custom-legend-click="default"
              :half-size="true"
              :rotation="1.5"
              :circumference="0.5"
              responsive
            />
          </client-only>
        </b-col>
        <b-col cols="6" lg="5">
          <div id="view-chart-lengend" />
        </b-col>
      </b-row>
    </dash-card>
  </b-col>
</template>

<script>
export default {
  name: "VisitorsAnalytics",
  props: {
    visitors: {
      type: Object,
      required: true,
      default: (visitorsProps) => {
        return typeof visitorsProps === 'undefined' || visitorsProps === {}
          ? { users: 0, visitors: 0, total: 0 }
          : visitorsProps
      }
    }
  },
  data: () => ({}),
  computed: {
    viewsDataset () {
      let statics = Object.entries(this.visitors).map(([k, v]) => ({ name: k, value: v }))
      statics = statics.sort((b, a) => a.value - b.value)
      return {
        labels: statics.map(({ name }) => name),
        datasets: [{
          data: statics.map(({ value }) => value)
        }]
      }
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    viewLegendCb (chart) {
      const datasets = chart.data.datasets[0]
      const [datas, backgrounds, labels] = [datasets.data, datasets.backgroundColor, chart.data.labels]
      const legendGroup = datas.reduce((group, data, d) => {
        group.push(`
          <div
            id="views-legend-${d}"
            data-legend-role="parent" data-chart-dataset="0" data-chart-idx="${d}"
            class="d-flex align-items-center mb-2 user-select-none" style="color:${backgrounds[d]}; font-size: 0.8rem"
          >
            <div data-legend-parent="views-legend-${d}" class="legend-content">
              <span class="legend-dot legend-dot--circle" style="background-color:${backgrounds[d]}"></span>
              <span class="ml-2">${labels[d]}</span>
            </div>
            <div data-legend-parent="views-legend-${d}" class="legend-value ml-auto">${data}</div>
          </div>
        `)
        return group
      }, [])
      return legendGroup.join('')
    }
  }
}
</script>

<style>

</style>
