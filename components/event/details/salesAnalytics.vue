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
                :scales-x="salesViewsXscales"
                :scales-y="salesViewsYscales"
                mixed
              />
            </client-only>
          </b-col>
        </b-row>
      </dash-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'SalesAnalytics',
  mixins: [],
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
            type: "line",
            borderWidth: 1,
            label: "Sales",
            data: this.sales.value,
            yAxisID: 'sales-yAxe',
            fill: true,
            order: 1
          },
          {
            type: "bar",
            label: "Views",
            data: this.views.value,
            fill: true,
            yAxisID: 'views-yAxe',
            order: 2
          }
        ]
      }
    },
    salesViewsOptions () {
      return {
        responsive: true,
        scales: {
          ticks: {
            beginAtZero: false
          }
        }
      }
    },
    salesViewsXscales () {
      return [{
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
      }]
    },
    salesViewsYscales () {
      return [
        {
          id: 'sales-yAxe',
          display: true,
          position: 'left',
          gridLines: {
            borderDash: [3, 4]
          },
          ticks: {
            stepSize: 2,
            padding: 10,
            beginAtZero: false
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
            padding: 10,
            beginAtZero: false
          },
          labels: {
            show: true
          }
        }
      ]
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
