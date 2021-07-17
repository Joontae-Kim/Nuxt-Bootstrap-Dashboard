<template>
  <b-container fluid>
    <dash-header
      title="Analytics Overview"
      description="Your bounce rate increased by 5.25% over the past 30 days."
    />
    <b-row class="mb-4 h-xxl-100">
      <b-col cols lg="6" class="mb-md-4 mb-lg-0">
        <b-row>
          <b-col cols="12" md="6" class="mb-4 mb-xxl-auto">
            <dash-card
              title="Total visits"
              icon="people-fill"
              :index="totalVists.visits"
              :rate="totalVists.rate"
            />
          </b-col>
          <b-col cols="12" md="6" class="mb-4">
            <dash-card
              title="New Users"
              :index="newUsers.users"
              :rate="newUsers.rate"
              icon="person-plus-fill"
            />
          </b-col>
          <b-col cols="12" md="6" class="mb-4 mb-md-0">
            <dash-card
              title="Active Users"
              icon="person-check-fill"
              :index="activeUsers.users"
              :rate="totalVists.rate"
            />
          </b-col>
          <b-col cols="12" md="6" class="mb-4 mb-md-0">
            <dash-card title="Traffic Share" class="h-100 pb-3 pb-lg-0">
              <b-row id="traffic-share-chart-wrapper" align-v="center" class="flex-column flex-sm-row h-100 pb-lg-3">
                <b-col cols="6" md="6" class="chart-container chart-h-20 chart-h-md-5 chart-h-lg-10 chart-range-h-100 chart-range-sm-h-200 chart-range-h-md-100 mb-3 mb-sm-0 mt-xxl-0">
                  <LazyPieChart
                    canvas-id="traffic-share-chart"
                    :data="shares"
                    :data-label-opt="{ color: '#fff' }"
                    :legend-view="false"
                    :custom-legend="true"
                    custom-legend-id="trafficShare-chart-lengend"
                    :legend-callback="trafficShareLegendCb"
                    :use-custom-legend-click="true"
                    custom-legend-click="default"
                    responsive
                    use-data-label
                  />
                </b-col>
                <b-col cols md="6">
                  <div id="trafficShare-chart-lengend" class="d-flex flex-sm-column justify-content-around" />
                </b-col>
              </b-row>
            </dash-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols lg="6">
        <dash-card title="Sales" class="mb-4 mb-md-0 h-100 pb-md-3 pb-lg-0">
          <b-row id="sales-chart-wrapper" align-v="center" class="h-100">
            <b-col cols class="chart-container chart-h-30 chart-h-md-30 chart-h-lg-40 chart-h-xl-25 chart-range-h-250 chart-range-h-xxl-300 chart-range-h-sxl-250">
              <LazyLineChart
                canvas-id="sales-chart"
                :data="sales"
                :scales-x="[{ time: { stepSize: 3 } }]"
                user-x-axes-as-time
                tooltip
                responsive
                class="pb-xxl-3"
                compute-scale-axe="Y"
                use-data-label
                :data-label-opt="salesOpt"
              />
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col cols="12" md="6" class="mb-4 mb-md-0">
        <dash-card title="Traffic Channels" class="h-100 pb-3">
          <b-row id="trafficChannel-chart-wrapper" align-v="center" class="h-100">
            <b-col cols class="chart-container chart-h-30 chart-h-md-20 chart-h-lg-40 chart-range-h-200 chart-range-h-250 chart-range-h-md-200 chart-range-h-lg-250">
              <LazyBarChart
                canvas-id="trafficChannel-chart"
                :data="channels"
                :scales-y="[{ticks: { beginAtZero: true }}]"
                :data-label-opt="{ color: '#fff' }"
                responsive
                tooltip
                use-data-label
                compute-scale-axe="Y"
              />
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
      <b-col cols="12" md="6">
        <dash-card title="Visit by Notification" class="h-100 pb-3">
          <b-row id="noti-chart-wrapper" align-v="center" class="h-100">
            <b-col cols sm="6" lg="6" class="chart-container chart-h-30 chart-h-md-15 chart-h-lg-30 chart-h-xl-20 chart-range-h-200 chart-range-h-md-150 chart-range-h-xl-200 chart-range-h-xxl-200 chart-range-h-sxl-250 mx-md-0">
              <LazyPolarArea
                canvas-id="noti-chart"
                :data="noti"
                use-data-label
                :data-label-opt="notiLabelOpt"
                :custom-legend="true"
                custom-legend-id="noti-chart-lengend"
                :legend-callback="notiChartLegendCb"
                :use-custom-legend-click="true"
                custom-legend-click="default"
                responsive
                tooltip
              />
            </b-col>
            <b-col
              cols
              sm="5"
              md="6"
              offset-xxl="1"
              xxl="4"
              class="h-sm-100 chart-range-h-sm-150"
            >
              <div id="noti-chart-lengend" class="h-md-100 d-flex flex-sm-column justify-content-between mt-4 my-sm-0 h-100" />
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols md="12">
        <dash-card title="Top 5 Event" class="h-100" table>
          <b-table
            :sort-by.sync="eventRankSortBy"
            :sort-desc.sync="eventRanksortDesc"
            :items="eventRank"
            :fields="eventRankField"
            head-variant="light"
            responsive
            hover
          >
            <template #cell(bounce)="data">
              {{ data.value }} %
            </template>

            <template #cell(sales)="data">
              $ {{ data.value }} <small>({{ data.item.saleRate }} %)</small>
              <b-progress height="2px" :value="data.item.saleRate" max="50" />
            </template>
          </b-table>
        </dash-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  layout: 'dashboard',
  data: () => ({
    res: null,
    totalVists: {},
    newUsers: {},
    activeUsers: {},
    shares: {},
    channels: {},
    noti: {},
    sales: {},
    salesMax: null,
    eventRank: [],
    eventRankSortBy: 'sales',
    eventRanksortDesc: true,
    eventRankField: [
      {
        label: 'Name',
        key: 'name',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap w-50 text-gray-600'
      },
      {
        label: 'Views',
        key: 'views',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600'
      },
      {
        label: 'Bounce (%)',
        key: 'bounce',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600'
      },
      {
        label: 'Sales',
        key: 'sales',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap w-25 text-gray-600'
      }
    ]
  }),
  async fetch () {
    const res = await this.$axios.$get('/over/')
    this.res = res
    this.totalVists = { ...res.total, visits: this.formatNumber(res.total.visits) }
    this.newUsers = { ...res.newUser, users: this.formatNumber(res.newUser.users) }
    this.activeUsers = { ...res.activeUser, users: this.formatNumber(res.activeUser.users) }
    this.shares = {
      labels: Object.keys(res.share),
      datasets: [{
        data: Object.values(res.share)
      }]
    }
    this.channels = {
      labels: Object.keys(res.channels),
      datasets: [{
        data: Object.values(res.channels)
      }]
    }
    let _noti = Object.entries(res.visitbyNotification).map(([key, value]) => ({ name: key, value }))
    _noti = _noti.sort((b, a) => a.value - b.value)
    _noti = _noti.reduce((obj, { name, value }) => {
      obj[name] = value
      return obj
    }, {})
    this.noti = {
      labels: Object.keys(_noti),
      datasets: [{
        data: Object.values(_noti).reverse()
      }]
    }
    this.sales = {
      datasets: [{
        label: 'Sales',
        fill: true,
        data: this.$createChartData.line(res.sales.list)
      }]
    }
    this.salesMax = res.sales.maxSales

    const eventRankTotalSales = res.eventRank.reduce((tt, t) => {
      tt += t.sales
      return tt
    }, 0)
    this.eventRank = res.eventRank.reduce((ranks, ele) => {
      const rate = Number((ele.sales / eventRankTotalSales) * 100).toFixed(2)
      ranks.push({ ...ele, saleRate: Number(rate) })
      return ranks
    }, [])
  },
  computed: {
    notiLabelOpt () {
      return {
        anchor: 'end',
        borderRadius: 16,
        borderWidth: 2,
        color: "white",
        borderColor: "white",
        backgroundColor (context) {
          return context.dataset.backgroundColor
        },
        display (context) {
          return context.chart.width >= 200 && context.chart.data.datasets[0].data[context.dataIndex] > 15
        },
        formatter (value, context) {
          return context.chart.data.labels[context.dataIndex]
        }
      }
    },
    salesOpt () {
      return {
        align: 'end',
        anchor: 'end',
        formatter (value, context) {
          return value.y
        },
        display (context) {
          return window.innerWidth >= 992 && context.dataIndex % 2
        },
        offset: 10,
        padding: 6,
        color: "#343a40",
        borderWidth: 2,
        borderRadius: 14,
        borderColor: "white",
        backgroundColor (context) {
          return context.dataset.backgroundColor
        }
      }
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
  methods: {
    trafficShareLegendCb (chart) {
      const ds = chart.data.datasets[0]
      const labels = chart.data.labels
      const icons = {
        mobile: `<svg data-legend-parent="trafficShare-legend-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone-fill" viewBox="0 0 16 16">
          <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"/>
        </svg>`,
        desktop: `<svg data-legend-parent="trafficShare-legend-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-display-fill" viewBox="0 0 16 16">
          <path d="M6 12c0 .667-.083 1.167-.25 1.5H5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-.75c-.167-.333-.25-.833-.25-1.5h4c2 0 2-2 2-2V4c0-2-2-2-2-2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h4z"/>
        </svg>`
      }
      const text = ds.data.reduce((legendHtml, data, d) => {
        legendHtml.push(`<div id="trafficShare-legend-${d}"
          data-legend-parent="trafficShare-legend-${d}" data-chart-dataset="0" data-chart-idx="${d}"
          class="d-flex align-items-center ${d === 0 ? 'mb-sm-2' : ''} user-select-none" style="color:${ds.backgroundColor[d]}; font-size: 0.8rem">
          ${icons[labels[d]]}
          <span class="ml-2">${labels[d]}</span>
          <span class="d-md-none legend-value ml-2">(${data} %)</span>
        </div>`)
        return legendHtml
      }, [])
      return text.join("")
    },
    notiChartLegendCb (chart) {
      const ds = chart.data.datasets[0]
      const labels = chart.data.labels
      const icons = {
        push: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-app-indicator" viewBox="0 0 16 16">
          <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"/>
          <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        </svg>`,
        sns: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-quote-fill" viewBox="0 0 16 16">
          <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.194 6.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 5.734 6C4.776 6 4 6.746 4 7.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.461 2.461 0 0 0-.227-.4zM11 9.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.466 2.466 0 0 0-.228-.4 1.686 1.686 0 0 0-.227-.273 1.466 1.466 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 10.07 6c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z"/>
        </svg>`,
        email: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
        </svg>`,
        link: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
          <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
          <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
        </svg>`,
        ads: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layout-sidebar-inset-reverse" viewBox="0 0 16 16">
        <path d="M2 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h12z"/>
        <path d="M13 4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V4z"/>
      </svg>`
      }
      const length = ds.data.length - 1
      const text = [...ds.data].reverse().reduce((legendHtml, data, d) => {
        legendHtml.push(
        `<div id="noti-legend-${d}"
          data-chart-dataset="0" data-chart-idx="${length - d}" data-legend-role="parent"
          data-legend-parent="noti-legend-${d}"
          class="d-flex flex-column flex-sm-row align-items-center user-select-none"
          style="font-size: 0.8rem;color:${ds.backgroundColor[length - d]};"
        >
          <div class="d-flex align-items-center ${d === 0 ? '' : 'mt-2'} mt-sm-0" data-legend-parent="noti-legend-${d}">
            <span class="legend-icon mr-2 mr-md-0">${icons[labels[d]]}</span>
            <span class="ml-md-2">${labels[d]}</span>
          </div>
          <div data-legend-parent="noti-legend-${d}" class="legend-value mx-auto ml-sm-auto mr-sm-0">${data} %</div>
        </div>`)
        return legendHtml
      }, [])
      return text.join("")
    }
  }
}
</script>

<style>

</style>
