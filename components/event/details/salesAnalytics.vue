<template>
  <b-row class="mb-4">
    <b-col cols md="4" class="mb-4 mb-md-0">
      <b-row no-gutters class="flex-column">
        <b-col cols class="mb-4">
          <dash-card
            title="Total Views"
            class="pb-3"
            icon="eye-fill"
            :index="formatedIndex.views"
            :rate="views.rate"
          />
        </b-col>
        <b-col cols>
          <dash-card
            title="Total Sales"
            class="pb-3"
            icon="credit-card-fill"
            :index="formatedIndex.sales"
            :rate="sales.rate"
          />
        </b-col>
      </b-row>
    </b-col>
    <b-col cols md="8">
      <dash-card title="Sales Analytics" class="h-100">
        <b-row id="salesAnalytics-chart-wrapper" align-v="center" class="h-100">
          <b-col cols class="h-100 chart__container-sm">
            <client-only>
              <LazyBarChart
                canvas-id="salesAnalytics-chart"
                class="pb-3"
                :data="salesViewsDataset"
                :custom-opt="salesViewsOptions"
                tooltip
                :legend-view="true"
              />
            </client-only>
          </b-col>
        </b-row>
      </dash-card>
    </b-col>
  </b-row>
</template>

<script>
import createChartColors from "~/mixins/chart/createChartColors"

export default {
  name: 'SalesAnalytics',
  mixins: [
    createChartColors
  ],
  props: {
    dates: {
      type: Array,
      required: false,
      default: (datesProps) => {
        return datesProps === undefined ? [] : datesProps
      }
    },
    sales: {
      type: [Array, Number, Object],
      required: false,
      default: (salesProps) => {
        return salesProps === undefined ? { rate: 0, total: 0 } : salesProps
      }
    },
    views: {
      type: [Array, Number, Object],
      required: false,
      default: (viewsProps) => {
        console.log('viewsProps: ', viewsProps)
        return viewsProps === undefined ? { rate: 0, total: 0 } : viewsProps
      }
    }
  },
  data: () => ({}),
  computed: {
    formatedIndex () {
      return {
        sales: this.formatNumber(this.sales.total),
        views: this.formatNumber(this.views.total)
      }
    },
    salesViewsDataset () {
      return {
        labels: this.dates,
        datasets: [
          {
            type: "bar",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            label: "Sales",
            data: this.sales.value,
            yAxisID: 'sales-yAxe'
          },
          {
            type: "line",
            label: "Views",
            data: this.views.value,
            fill: true,
            yAxisID: 'views-yAxe'
          }
        ]
      }
    },
    salesViewsOptions () {
      return {
        responsive: true,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day',
              distribution: 'series',
              displayFormats: {
                day: 'MMM DD'
              },
              stepSize: 2
            },
            scaleLabel: {
              display: false,
              labelString: 'Date'
            }
          }],
          yAxes: [
            {
              id: 'sales-yAxe',
              display: true,
              position: 'left',
              gridLines: {
                borderDash: [3, 4]
              },
              ticks: {
                stepSize: 2,
                padding: 10
              },
              labels: {
                show: true
              }
            },
            {
              id: 'views-yAxe',
              display: true,
              position: 'right',
              gridLines: false,
              ticks: {
                stepSize: 2,
                padding: 10
              },
              labels: {
                show: true
              }
            }
          ],
          ticks: {
            beginAtZero: false
          }
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
