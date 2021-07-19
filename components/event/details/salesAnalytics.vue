<template>
  <b-row class="mb-4">
    <b-col cols md="4" class="mb-4 mb-md-0">
      <b-row class="flex-md-column">
        <b-col cols sm="6" md class="mb-4 mb-sm-0 mb-md-4 pr-sm-3">
          <dash-card
            title="Total Views"
            class="pb-3"
            icon="eye-fill"
            :index="formatedIndex.views"
            :rate="views.rate"
          />
        </b-col>
        <b-col cols sm="6" md class="pl-sm-3">
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
        <b-row id="salesAnalytics-chart-wrapper" align-v="center" class="h-100 flex-column">
          <b-col cols class="flex-grow-0">
            <div id="salesAnalytics-chart-lengend" class="d-flex justify-content-around w-50 mx-auto" />
          </b-col>
          <b-col cols class="chart-container chart-h-10 chart-h-md-20 chart-h-lg-30 chart-range-h-200 chart-range-h-md-250">
            <client-only>
              <LazyBarChart
                canvas-id="salesAnalytics-chart"
                :data="salesViewsDataset"
                :legend-view="false"
                :custom-legend="true"
                :scales-x="salesViewsXscales"
                :scales-y="salesViewsYscales"
                custom-legend-id="salesAnalytics-chart-lengend"
                :legend-callback="salesAnalyticsLegendCb"
                :use-custom-legend-click="true"
                :custom-legend-click="salesAnalyticsLegendClick"
                use-data-label
                class="pb-3 pb-md-0"
                responsive
                mixed
                compute-scale-axe="Y"
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
            fill: false,
            order: 1,
            datalabels: {
              display () {
                return window.innerWidth >= 927
              },
              anchor: 'start',
              align: 'top',
              color: 'white',
              offset: 10,
              padding: 3,
              borderRadius: 4,
              backgroundColor (context) {
                return context.dataset.borderColor
              }
            }
          },
          {
            type: "bar",
            label: "Views",
            data: this.views.value,
            fill: true,
            yAxisID: 'views-yAxe',
            order: 2,
            datalabels: {
              display () {
                return window.innerWidth >= 927
              },
              anchor: 'start',
              align: 'end',
              padding: 3,
              offset: 10,
              color: 'white',
              borderRadius: 4,
              backgroundColor (context) {
                return context.dataset.pointBackgroundColor
              }
            }
          }
        ]
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
        ticks: {
          beginAtZero: false
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
            beginAtZero: true,
            callback: (value, index, values) => {
              return Math.round(value)
            }
          },
          labels: {
            show: true
          }
        },
        {
          id: 'views-yAxe',
          display: true,
          position: 'right',
          gridLines: {
            borderDash: [3, 4]
          },
          ticks: {
            stepSize: 2,
            padding: 10,
            beginAtZero: true, // false.
            callback: (value, index, values) => {
              return Math.round(value)
            }
          },
          labels: {
            show: false
          }
        }
      ]
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    salesAnalyticsLegendCb (chart) {
      const datasets = chart.data.datasets
      const datasetsInfo = datasets.reduce((info, dataset) => {
        info.push({
          label: dataset.label,
          backgroundColor: dataset.label === 'Sales' ? dataset.borderColor : dataset.pointBackgroundColor
        })
        return info
      }, [])
      const legendGroup = datasetsInfo.reduce((group, data, d) => {
        group.push(`
          <div id="sales-legend-${d}" data-legend-role="parent" data-chart-dataset="${d}" class="d-flex align-items-center mb-2 user-select-none" style="color:${data.backgroundColor}; font-size: 0.8rem">
            <div data-legend-parent="sales-legend-${d}" class="legend-content">
              <span class="legend-dot legend-dot--circle" style="background-color:${data.backgroundColor}"></span>
              <span class="ml-2">${data.label}</span>
            </div>
          </div>
        `)
        return group
      }, [])
      return legendGroup.join('')
    },
    salesAnalyticsLegendClick (chart, event) {
      event = event || window.event
      let target = event.target || event.srcElement
      if (target) {
        if (!target.dataset.legendRole) {
          while (!target.dataset.legendParent) {
            target = target.parentElement
          }
          target = document.getElementById(target.dataset.legendParent)
        }
        const chartDataSetIdx = target.dataset.chartDataset
        const chartMetaHiddens = new Array(chart.config.data.datasets.length).fill(null).reduce((metas, metaIdx, m) => {
          const meta = chart.getDatasetMeta(m)
          metas.push(meta.hidden)
          return metas
        }, [])
        chartMetaHiddens[chartDataSetIdx] = !chartMetaHiddens[chartDataSetIdx]
        const chartAllHidden = chartMetaHiddens.filter(chart => chart === true)
        if (chartAllHidden.length === chartMetaHiddens.length) {
          return false
        }
        const meta = chart.getDatasetMeta(chartDataSetIdx)
        const item = meta
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
