<template>
  <b-col cols md="6">
    <dash-card
      title="View Analytics"
      class="pb-3"
    >
      <b-row id="view-chart-wrapper" align-v="center" class="h-100">
        <b-col cols class="h-100 chart__container-sm">
          <client-only>
            <LazyPieChart
              canvas-id="view-chart"
              :data="viewsDataset"
              :custom-opt="viewsOptions"
              :legend-view="true"
              :data-label-opt="{ color: '#fff' }"
              use-data-label
              height="200"
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
  name: "VisitorsAnalytics",
  mixins: [
    createChartColors
  ],
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
      let colors = this.getRandomColors(Object.values(this.visitors).length)
      colors = colors.map(color => color.rgba)
      return {
        labels: Object.keys(this.visitors).reverse(),
        datasets: [{
          data: Object.values(this.visitors).reverse(),
          backgroundColor: colors
        }]
      }
    },
    viewsOptions () {
      return {
        responsive: true,
        legend: {
          display: true,
          position: 'right'
        }
      }
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style>

</style>
