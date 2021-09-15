<template>
  <b-container fluid>
    <dash-header
      title="User Analytics"
      :description="contentHeaderDes"
    />
    <b-row class="mb-4">
      <b-col cols lg="4" xxl="12" class="mb-4 mb-lg-0">
        <b-row class="flex-lg-column flex-xxl-row mb-xxl-4">
          <b-col cols sm="6" lg="12" xxl="4" class="mb-sm-4 mb-lg-0">
            <dash-card
              title="Users"
              icon="people-fill"
              :index="total.value"
              :rate="total.rate"
              class="mb-xxl-4"
            />
            <dash-card
              title="New Users"
              icon="person-check-fill"
              :index="newUsers.value"
              :rate="newUsers.rate"
              class="d-none d-xxl-flex"
              guide="Since last week"
            />
          </b-col>
          <b-col cols sm="6" lg="12" xxl="4" class="d-block d-xxl-none py-4 py-sm-0 py-lg-4">
            <dash-card
              title="New Users"
              icon="person-check-fill"
              :index="newUsers.value"
              :rate="newUsers.rate"
              guide="Since last week"
            />
          </b-col>
          <b-col cols>
            <dash-card title="Group by Status" class="h-100" table>
              <b-list-group class="rounded-0" flush>
                <b-list-group-item class="d-flex align-items-center">
                  <div class="w-50 text-gray-800 font-weight-bold">
                    Status
                  </div>
                  <div class="w-50 text-gray-800">
                    <div class="d-flex justify-content-between font-weight-bold">
                      <div class="w-50 text-right">Users</div>
                      <div class="w-100 text-right">Rate</div>
                    </div>
                  </div>
                </b-list-group-item>
                <template v-for="({ name, value, percent }, g) of grouping">
                  <b-list-group-item :key="g" class="d-flex align-items-center">
                    <div class="w-50 text-gray-700">
                      {{ name }}
                    </div>
                    <div class="w-50">
                      <div class="d-flex justify-content-between">
                        <div class="w-50 text-right text-gray-600">{{ value }}</div>
                        <div class="w-100 text-right text-success">{{ percent }} %</div>
                      </div>
                    </div>
                  </b-list-group-item>
                </template>
              </b-list-group>
            </dash-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols lg="8" xxl="12">
        <b-row class="flex-column flex-xxl-row h-100 justify-content-lg-between justify-content-xxl-start">
          <b-col cols xxl="6" class="h-lg-50 h-xxl-100 pb-4 pb-lg-0">
            <dash-card title="Weekly Traffic" class="h-100 pb-3 pb-lg-0">
              <b-row id="weeklyTraffic-chart-wrapper" align-v="center" class="h-100 pb-xxl-3">
                <b-col cols class="chart-container chart-h-20 chart-range-h-200 chart-range-h-md-300 chart-range-h-lg-250 chart-range-h-xxl-300">
                  <LazyLineChart
                    canvas-id="weeklyTraffic-chart"
                    :data="weekTrafficDataset"
                    :scales-x="[{ time: { stepSize: 1 } }]"
                    :scales-y="[{ticks: { beginAtZero: false }}]"
                    use-data-label
                    responsive
                    user-x-axes-as-time
                    tooltip
                    :data-label-opt="weekTrafficLabelOpt"
                    compute-scale-axe="Y"
                  />
                </b-col>
              </b-row>
            </dash-card>
          </b-col>
          <b-col cols xxl="6">
            <dash-card title="24 Hours Traffic" :useicon="false" class="h-100 pb-3 pb-lg-0 pb-xxl-3">
              <b-row id="hourlyTraffic-chart-wrapper" align-v="center" class="h-100">
                <b-col cols class="chart-container chart-h-20 chart-range-h-200 chart-range-h-md-250 chart-range-h-xxl-300">
                  <LazyBarChart
                    canvas-id="hourlyTraffic-chart"
                    :data="timeTrafficDataset"
                    :custom-opt="hoursTrafficOptions"
                    :scales-y="hoursTrafficOptionsYaxe"
                    :scales-x="hoursTrafficOptionsXaxe"
                    responsive
                    single-color
                    tooltip
                    compute-scale-axe="Y"
                  />
                </b-col>
              </b-row>
            </dash-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <UsersPaymentsStatics :raw-data="payments" />
    <UsersAuthStatics :raw-data="authentications" />
  </b-container>
</template>

<script>
import dayjs from "dayjs"
import { mapGetters } from "vuex"

export default {
  name: 'UserStatics',
  components: {
    UsersAuthStatics: () => import('~/components/users/static/authentication'),
    UsersPaymentsStatics: () => import('~/components/users/static/payments')
  },
  layout: 'dashboard',
  props: {},
  data: () => ({
    total: { rate: 0, value: 0 },
    activeUsers: { rate: 0, value: 0 },
    newUsers: { rate: 0, value: 0 },
    grouping: [{}],
    weekTrafficDataset: [],
    timeTrafficDataset: {},
    payments: [],
    authentications: [],
    contentHeaderDes: null
  }),
  async fetch () {
    try {
      const statics = await this.$axios.get('/api/users/statics', {
        params: { staticDate: new Date(), staticCount: 7 }
      })
      statics.data.activeUsers.value = this.formatNumber(statics.data.activeUsers.value)
      statics.data.newUsers.value = this.formatNumber(statics.data.newUsers.value)
      this.total = { value: this.formatNumber(statics.data.total.value), ...statics.data.total }
      this.activeUsers = statics.data.activeUsers
      this.newUsers = statics.data.newUsers
      const total = statics.data.total.value
      const groupBy = Object.entries(statics.data.groupByUsers).reduce((groupBy, [key, value]) => {
        const name = key.replace(/_/g, " ")
        const percent = Number(((value / total) * 100).toFixed(1))
        groupBy.push({ name, value, percent })
        return groupBy
      }, [])
      this.grouping = groupBy.sort((a, b) => b.value - a.value)
      this.weekTrafficDataset = {
        datasets: [{
          label: 'weekly',
          data: this.$createChartData.line(statics.data.weekSerial)
        }]
      }
      const timeSerial = statics.data.timeSerial
      this.timeTrafficDataset = {
        labels: timeSerial.map(time => Object.keys(time)[0]),
        datasets: [{
          data: timeSerial.map(time => Object.values(time)[0])
        }]
      }
      this.authentications = statics.data.authentications
      this.payments = statics.data.payments
      const todaySales = Object.values(statics.data.weekSerial[statics.data.weekSerial.length - 1])[0]
      this.contentHeaderDes = `Today Sales is $ ${todaySales}. and New Users Rate increased by ${this.newUsers.rate}% over the past 7 days`
    } catch (err) {
      console.log(err)
      console.log(err.message)
    }
  },
  computed: {
    ...mapGetters({}),
    hoursTrafficOptions () {
      return {
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              let title = data.labels[tooltipItem[0].index]
              title = dayjs(title).format('HH:00 A')
              return title
            }
          }
        }
      }
    },
    hoursTrafficOptionsXaxe () {
      return [{
        type: 'time',
        time: {
          unit: 'hour',
          distribution: 'series',
          displayFormats: {
            minute: 'h:mm a'
          },
          stepSize: 3
        },
        gridLines: {
          display: false
        }
      }]
    },
    hoursTrafficOptionsYaxe () {
      return [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    weekTrafficLabelOpt () {
      return {
        clip: false,
        align: 'center',
        anchor: 'center',
        formatter (value, context) {
          return value.y
        }
      }
    },
    weeklyTrafficOptions () {
      return [{
        ticks: {
          beginAtZero: true
        }
      }]
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
  methods: {}
}
</script>

<style>

</style>
