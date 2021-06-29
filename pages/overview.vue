<template>
  <b-container fluid>
    <b-row class="mb-4">
      <b-col cols md="6">
        <b-row>
          <b-col cols md="6" class="mb-4">
            <dash-card
              title="Total visits"
              icon="people-fill"
              :index="totalVists.visits"
              :rate="totalVists.rate"
            />
          </b-col>
          <b-col cols md="6" class="mb-4">
            <dash-card
              title="New Users"
              :index="newUsers.users"
              :rate="newUsers.rate"
              useicon
            >
              <template #icon>
                <b-iconstack font-scale="2.3">
                  <b-icon stacked icon="square-fill" variant="info" />
                  <b-icon
                    stacked
                    icon="plus"
                    variant="light"
                    scale="0.5"
                    shift-h="-4"
                  />
                  <b-icon
                    stacked
                    icon="people-fill"
                    variant="light"
                    scale="0.5"
                    shift-h="3"
                  />
                </b-iconstack>
              </template>
            </dash-card>
          </b-col>
          <b-col cols md="6" class="mb-4 mb-md-0">
            <dash-card
              title="Active Users"
              icon="people-fill"
              :index="activeUsers.users"
              :rate="totalVists.rate"
            />
          </b-col>
          <b-col cols md="6" class="mb-4 mb-md-0">
            <dash-card title="Traffic Share" class="h-100">
              <b-row no-gutters>
                <b-col cols>
                  <LazyPieChart
                    canvas-id="traffic-share-chart"
                    :data="shares"
                    :height="99"
                    :width="100"
                    :custom-opt="{responsive: false}"
                    :data-label-opt="{ color: '#fff' }"
                    :legend-view="false"
                    use-data-label
                    class="h-100 pb-3"
                  />
                </b-col>
                <b-col cols class="pl-2">
                  <div :style="{ color: 'rgb(54, 162, 235)', fontSize: '0.8rem' }">
                    <b-icon icon="display-fill" font-scale="1" class="mr-1" />
                    DeskTop
                  </div>
                  <div :style="{ color: 'rgb(255, 99, 132)', fontSize: '0.8rem' }">
                    <b-icon icon="phone-fill" font-scale="1" class="mr-1" />
                    Mobile
                  </div>
                </b-col>
              </b-row>
            </dash-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols md="6">
        <dash-card title="Sales" class="mb-4 mb-md-0 h-100">
          <b-row id="sales-chart-wrapper" align-v="center" class="h-100">
            <b-col cols class="h-100 chart__container-sm">
              <LazyLineChart
                canvas-id="sales-chart"
                :data="sales"
                :y-max="salesMax"
                class="pb-3"
                :scales-x="[{ time: { stepSize: 3 } }]"
                user-x-axes-as-time
                tooltip
              />
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col cols md="6" class="mb-4 mb-md-0">
        <dash-card title="Traffic Channels" class="h-100">
          <b-row id="trafficChannel-chart-wrapper" align-v="center" class="h-100">
            <b-col cols class="chart__container">
              <LazyBarChart
                canvas-id="trafficChannel-chart"
                class="pb-3"
                :data="channels"
                :custom-opt="{ responsive: true }"
                tooltip
              />
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
      <b-col cols md="6">
        <dash-card title="Visit by Notification" class="h-100">
          <b-row id="noti-chart-wrapper" align-v="center" class="h-100">
            <b-col cols md="6" class="vh-100 chart__container">
              <LazyPolarArea
                canvas-id="noti-chart"
                :data="noti"
                :custom-opt="{ responsive: true }"
                :data-label-opt="{ color: '#fff' }"
                use-data-label
                tooltip
              />
            </b-col>
            <b-col cols md="6">
              <i>legend</i>
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols md="12">
        <dash-card title="Top 5 Event" class="h-100">
          <b-table
            :sort-by.sync="eventRankSortBy"
            :sort-desc.sync="eventRanksortDesc"
            :items="eventRank"
            :fields="eventRankField"
            head-variant="light"
            responsive="sm"
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
        data: Object.values(res.share),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ]
      }]
    }
    this.channels = {
      labels: Object.keys(res.channels),
      datasets: [{
        data: Object.values(res.channels),
        backgroundColor: ["rgba(220, 53, 69, 0.85)", "rgba(111, 66, 193, 0.85)", "rgba(23, 162, 184, 0.85)", "rgba(0, 123, 255, 0.85)"],
        barPercentage: 0.3
      }]
    }
    this.noti = {
      labels: Object.keys(res.visitbyNotification),
      datasets: [{
        data: Object.values(res.visitbyNotification),
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#cc65fe',
          '#ffce56'
        ]
      }]
    }
    this.sales = {
      datasets: [{
        label: 'Sales:',
        backgroundColor: 'red',
        borderColor: 'red',
        fill: false,
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
  methods: {}
}
</script>

<style>

</style>
