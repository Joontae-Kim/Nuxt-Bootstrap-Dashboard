<template>
  <b-container fluid>
    <dash-header
      title="Event Analytics"
      :description="`Today has no event. Total Sales is $ ${totalSales.index} and increased by ${totalSales.rate} % over the past 30 days.`"
    />

    <EventStatics />
    <b-row class="mb-4 h-100">
      <b-col cols="12" md="5" lg="4" class="h-100">
        <b-row class="flex-column h-100 mb-4 mb-md-0">
          <b-col colszz>
            <dash-card
              title="Total Sales"
              icon="cash-stack"
              :index="`$ ${totalSales.index}`"
              :rate="totalSales.rate"
            />
          </b-col>
          <b-col cols class="my-4">
            <dash-card
              title="Average of Sales"
              icon="cash"
              :index="`$ ${avrSales.index}`"
              :rate="avrSales.rate"
            />
          </b-col>
          <b-col cols>
            <dash-card
              title="1st of Sales Segment"
              custom
              class="pb-3"
            >
              <div class="d-flex align-items-center justify-content-between text-muted">
                <strong class="">Segment</strong><span>$ {{ topSalesSegment.label }}</span>
              </div>
              <div class="d-flex align-items-center justify-content-between mt-2 text-muted">
                <strong class="">Events of Segment</strong><span>{{ topSalesSegment.count }} Events</span>
              </div>
              <div class="d-flex align-items-center justify-content-between mt-2 text-muted">
                <strong class="">Total Sales (Shares)</strong><span>$ {{ topSalesSegment.dis_total }} ({{ topSalesSegment.percent }} %)</span>
              </div>
            </dash-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols md="7" lg="8">
        <dash-card title="Sales Segment Table" class="h-100" table>
          <b-table
            :sort-by.sync="salesSegmentSortBy"
            :sort-desc.sync="salesSegmentSortDesc"
            :items="salesSegment"
            :fields="salesSegmentField"
            head-variant="light"
            responsive
            hover
            class="mb-0 h-100"
            table-class="h-100"
          >
            <template #cell(total)="data">
              {{ data.item.dis_total }}
            </template>

            <template #cell(percent)="data">
              {{ data.value }} %
            </template>
          </b-table>
        </dash-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col cols>
        <dash-card title="Total Event Traffic" class="h-100 pb-2">
          <b-row id="traffic-chart-wrapper" align-v="center" class="h-100">
            <b-col cols md="12" xxl="10" order-xxl="2" class="chart-container chart-range-h-250 chart-range-h-lg-300 chart-range-h-xl-350">
              <LazyLineChart
                canvas-id="traffic-chart"
                :data="eventTraffics"
                :custom-opt="{ fill: false }"
                :scales-x="[{ time: { stepSize: 3 } }]"
                use-data-label
                :data-label-opt="trafficLableOpt"
                user-x-axes-as-time
                :legend-view="false"
                :custom-legend="true"
                custom-legend-id="traffic-chart-lengend"
                :legend-callback="trafficLegendCb"
                :custom-legend-click="trafficLegendClick"
                :tooltip="trafficTooltipOpt"
                responsive
              />
            </b-col>
            <b-col cols md="12" xxl="1" class="mt-3 my-md-2" order-xxl="1">
              <div id="traffic-chart-lengend" class="d-flex justify-content-around flex-xxl-column chart-range-h-xxl-200 px-md-5 pl-xxl-4 pl-sxl-4 pr-xxl-0 pl-sxl-5" />
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col cols="12" md="6" class="mb-4 mb-md-0">
        <dash-card title="Event Open Segment - Chart" class="h-100 pb-2">
          <b-row id="openSegment-chart-wrapper" align-v="center" class="h-100">
            <b-col cols class="chart-container chart-range-h-200 chart-range-h-250 chart-range-h-md-200 chart-range-h-lg-250 chart-range-h-xl-350">
              <LazyBarChart
                canvas-id="openSegment-chart"
                :data="openMonthSegment"
                :scales-y="[{ticks: { display: false, beginAtZero: true, stepSize: 2 }}]"
                :data-label-opt="{ color: '#fff' }"
                user-x-axes-as-time
                responsive
                tooltip
                use-data-label
              />
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
      <b-col>
        <dash-card title="Event Open Segment - Table" class="h-100" table>
          <b-row no-gutters class="h-100">
            <b-col cols class="h-100">
              <b-table
                :sort-by.sync="openMonthSegmentSortBy"
                :sort-desc.sync="openMonthSegmentSortDesc"
                :items="openMonthSegmentRaw"
                :fields="openMonthSegmentField"
                head-variant="light"
                responsive
                hover
                small
                table-class="h-100"
                class="mb-0 h-100"
              >
                <template #cell(total)="data">
                  {{ data.item.dis_total }}
                </template>

                <template #cell(sales)="data">
                  $ {{ data.item.dis_sales }}
                </template>
              </b-table>
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import dayjs from "dayjs"
import { mapGetters } from "vuex"

export default {
  name: 'Events',
  components: {
    EventStatics: () => import('~/components/event/statics.vue')
  },
  mixins: [],
  provide () {
    return {
      parentRef: this.$refs
    }
  },
  layout: 'dashboard',
  data: () => ({
    salesSegment: null,
    salesSegmentSortBy: 'rank',
    salesSegmentSortDesc: false,
    salesSegmentField: [
      {
        label: 'Rank',
        key: 'rank',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-gray-600 align-middle'
      },
      {
        label: 'Segment',
        key: 'label',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-gray-600 align-middle'
      },
      {
        label: 'Total Sales',
        key: 'total',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-gray-600 align-middle'
      },
      {
        label: 'Shares (%)',
        key: 'percent',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-gray-600 align-middle'
      },
      {
        label: 'Events',
        key: 'count',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-gray-600 align-middle'
      }
    ],
    totalSales: 0,
    avrSales: 0,
    topSalesSegment: {},
    eventTraffics: {},
    openMonthSegmentRaw: null,
    openMonthSegment: {},
    openMonthSegmentSortBy: 'sales',
    openMonthSegmentSortDesc: false,
    openMonthSegmentField: [
      {
        label: 'Month',
        key: 'label',
        sortable: true,
        thClass: 'text-nowrap pl-3',
        tdClass: 'text-gray-600 py-2 pl-3 align-middle'
      },
      {
        label: 'Sales',
        key: 'sales',
        sortable: true,
        thClass: 'text-nowrap pl-3',
        tdClass: 'text-gray-600 py-2 pl-3 align-middle'
      },
      {
        label: 'Events',
        key: 'count',
        sortable: true,
        thClass: 'text-nowrap pl-3',
        tdClass: 'text-gray-600 py-2 pl-3 align-middle'
      }
    ]
  }),
  async fetch () {
    const res = await this.$axios.$get('/api/event/statics')
    const sortedSalesSegment = res.salesSegment.sort((b, a) => a.total - b.total)
    const totalSales = sortedSalesSegment.reduce((totalSales, { total }) => totalSales + total, 0)
    this.salesSegment = sortedSalesSegment.map((sale, s) => ({ ...sale, rank: s + 1, dis_total: this.formatNumber(sale.total), percent: Number(Number((sale.total / totalSales) * 100).toFixed(1)) }))
    this.topSalesSegment = this.salesSegment[0]
    this.avrSales = {
      index: this.formatNumber(Math.floor(totalSales / res.salesSegment.length)),
      rate: Number(Math.random() * 10).toFixed(1)
    }
    this.totalSales = { index: this.formatNumber(totalSales), rate: Number((Math.random() * 10) + 10).toFixed(1) }
    this.eventTraffics = {
      labels: res.eventDailyTraffic.dates,
      datasets: res.eventDailyTraffic.traffics.map(({ source, data }) => ({ label: source, data, fill: false }))
    }
    this.openMonthSegmentRaw = res.openMonthSegment.reverse().map(monthData => ({ ...monthData, label: dayjs(monthData.label).format('YYYY-MM'), dis_sales: this.formatNumber(monthData.sales) }))
    this.openMonthSegment = {
      labels: this.openMonthSegmentRaw.map(({ label }) => dayjs(label).format('MM/YY')),
      datasets: [{
        data: this.openMonthSegmentRaw.map(({ count }) => count)
      }]
    }
  },
  computed: {
    ...mapGetters({
      events: 'events/getEvents',
      totalEvent: 'events/getTotalEventCount'
    }),
    trafficLableOpt () {
      return {
        clip: false,
        align: 'center',
        anchor: 'center',
        formatter (value, context) {
          return value.y
        },
        display (context) {
          return window.innerWidth >= 992 && context.dataIndex % 2
        }
      }
    },
    trafficTooltipOpt () {
      return {
        intersect: false,
        mode: 'index',
        callbacks: {
          label (tooltipItem, data) {
            const dataset = data.datasets[tooltipItem.datasetIndex]
            const label = dataset.label
            const dataValue = dataset.data[tooltipItem.index]
            return `  ${label}: ${dataValue}`
          }
        }
      }
    },
    eventTrafficsCustomOpt () {
      return new Array(this.eventTraffics.datasets.length).fill({ fill: false })
    }
  },
  watch: {
    '$fetchState.pending': {
      immediate: true,
      handler (state) {
        if (typeof state !== 'undefined') {
          this.$nuxt.$emit('pageLoading', state)
        }
      }
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {
    this.$store.commit('events/add', null)
  },
  methods: {
    trafficLegendCb (chart) {
      const datasets = chart.data.datasets
      const legendGroup = datasets.reduce((group, dataset, d) => {
        const backgroundColor = dataset.borderColor
        group.push(`
        <div id="traffic-legend-${d}" data-legend-role="parent" data-chart-dataset="${d}" class="d-inline-flex d-md-flex align-items-center user-select-none" style="color:${backgroundColor}; font-size: 0.8rem">
          <div data-legend-parent="traffic-legend-${d}" class="legend-content">
            <span class="legend-dot legend-dot--circle" style="background-color:${backgroundColor}"></span>
            <span class="ml-2">${dataset.label}</span>
          </div>
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
        const datasetIdx = target.dataset.chartDataset
        const dataSetMetasHidden = new Array(chart.data.datasets.length).fill(null).reduce((datasetsHidden, dataset, d) => {
          const meta = chart.getDatasetMeta(d)
          datasetsHidden.push(meta.hidden)
          return datasetsHidden
        }, [])
        dataSetMetasHidden[datasetIdx] = !dataSetMetasHidden[datasetIdx]
        const isAllHidden = dataSetMetasHidden.filter(metaHidden => metaHidden === true)
        if (isAllHidden.length === dataSetMetasHidden.length) {
          return false
        }
        const meta = chart.getDatasetMeta(datasetIdx)
        if (meta.hidden === null || meta.hidden === false) {
          target.classList.add('legend-hidden')
        } else {
          target.classList.remove('legend-hidden')
        }
        meta.hidden = !meta.hidden
        chart.update()
      }
    }
  }
}
</script>

<style lang="scss">
</style>
