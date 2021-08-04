<template>
  <b-container fluid>
    <EventStatics />
    <b-row class="mb-4">
      <b-col cols="12" md="4">
        <b-row class="flex-column h-100">
          <b-col cols>
            <dash-card
              title="Total Sales"
              icon="cash-stack"
              :index="`$ ${totalSales}`"
              :guide="null"
            />
          </b-col>
          <b-col cols class="my-4">
            <dash-card
              title="Average of Sales"
              icon="cash"
              :index="`$ ${avrSales}`"
              :guide="null"
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
      <b-col cols>
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
            <b-col cols md="10" class="chart-container chart-h-30 chart-h-lg-40 chart-h-xl-25 chart-range-h-250">
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
                tooltip
                responsive
                class="pb-xxl-3"
              />
            </b-col>
            <b-col cols md="2" class="mt-3 mt-md-0">
              <div id="traffic-chart-lengend" class="d-flex justify-content-around flex-md-column" />
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col cols="12" md="6" class="mb-4 mb-md-0">
        <dash-card title="Event Open Segment - Chart" class="h-100 pb-2">
          <b-row id="openSegment-chart-wrapper" align-v="center" class="h-100">
            <b-col cols class="chart-container chart-h-30 chart-h-lg-40 chart-range-h-200 chart-range-h-250 chart-range-h-md-200 chart-range-h-lg-250">
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
        <dash-card title="Event Open Segment - Table" class="h-100 pb-2" table>
          <b-row>
            <b-col cols>
              <b-table
                :sort-by.sync="openMonthSegmentSortBy"
                :sort-desc.sync="openMonthSegmentSortDesc"
                :items="openMonthSegmentRaw"
                :fields="openMonthSegmentField"
                head-variant="light"
                responsive
                hover
                small
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
        tdClass: 'text-gray-600'
      },
      {
        label: 'Segment',
        key: 'label',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-gray-600'
      },
      {
        label: 'Total Sales',
        key: 'total',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-gray-600'
      },
      {
        label: 'Shares (%)',
        key: 'percent',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-gray-600'
      },
      {
        label: 'Events',
        key: 'count',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-gray-600'
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
        tdClass: 'text-gray-600 py- pl-3'
      },
      {
        label: 'Sales',
        key: 'sales',
        sortable: true,
        thClass: 'text-nowrap pl-3',
        tdClass: 'text-gray-600 py-2 pl-3'
      },
      {
        label: 'Events',
        key: 'count',
        sortable: true,
        thClass: 'text-nowrap pl-3',
        tdClass: 'text-gray-600 py-2 pl-3'
      }
    ]
  }),
  async fetch () {
    const res = await this.$axios.$get('/api/event/statics')
    console.log(res)
    const sortedSalesSegment = res.salesSegment.sort((b, a) => a.total - b.total)
    const totalSales = sortedSalesSegment.reduce((totalSales, { total }) => totalSales + total, 0)
    this.salesSegment = sortedSalesSegment.map((sale, s) => ({ ...sale, rank: s + 1, dis_total: this.formatNumber(sale.total), percent: Number(Number((sale.total / totalSales) * 100).toFixed(1)) }))
    this.topSalesSegment = this.salesSegment[0]
    this.totalSales = this.formatNumber(totalSales)
    this.avrSales = this.formatNumber(Math.floor(totalSales / res.salesSegment.length))
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
        <div id="traffic-legend-${d}" data-legend-role="parent" data-chart-dataset="${d}" class="d-inline-flex d-md-flex align-items-center mb-2 user-select-none" style="color:${backgroundColor}; font-size: 0.8rem">
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
