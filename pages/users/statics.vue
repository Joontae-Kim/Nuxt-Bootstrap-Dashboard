<template>
  <b-container fluid>
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
            />
          </b-col>
          <b-col cols sm="6" lg="12" xxl="4" class="d-block d-xxl-none py-4 py-sm-0 py-lg-4">
            <dash-card
              title="New Users"
              icon="person-check-fill"
              :index="newUsers.value"
              :rate="newUsers.rate"
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
    <b-row class="mb-4">
      <b-col cols md="5">
        <dash-card title="Payment - Chart" class="h-100 pb-3 pb-lg-0">
          <b-row id="payment-amount-chart-wrapper" align-v="center" class="flex-column h-100 px-md-3 pt-md-3" no-gutters>
            <b-col cols class="chart-container chart-h-20 chart-range-h-200">
              <LazyPieChart
                canvas-id="payment-amount-chart"
                :data="paymentsChartData"
                :legend-view="false"
                :custom-legend="true"
                custom-legend-id="payment-amount-chart-lengend"
                :legend-callback="paymentsLegendCb"
                :use-custom-legend-click="true"
                custom-legend-click="default"
                responsive
                use-data-label
                :data-label-opt="paymentsLabelOpt"
                half-size
              />
              <!-- :rotation="1.5"
              :circumference="0.75" -->
            </b-col>
            <b-col cols>
              <div id="payment-amount-chart-lengend" class="d-flex flex-wrap justify-content-between align-content-around h-100 py-md-3 px-md-0" />
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
      <b-col cols md="7">
        <dash-card title="Payment - List" class="h-100" table>
          <b-table
            :sort-by.sync="paymentsSortBy"
            :sort-desc.sync="paymentssortDesc"
            :items="payments"
            :fields="paymentsField"
            head-variant="light"
            responsive
            hover
            class="mb-0"
          >
            <template #cell(amount)="data">
              {{ data.value }}
            </template>
            <template #cell(amountPercent)="data">
              {{ data.value }} %
            </template>
            <template #cell(count)="data">
              {{ data.value }}
            </template>
            <template #cell(countPercent)="data">
              {{ data.value }} %
            </template>
          </b-table>
        </dash-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col cols md="5">
        <dash-card title="Authentication - Chart" class="h-100 pb-3 pb-lg-0">
          <b-row id="authShare-chart-wrapper" align-v="center" class="flex-column h-100 p-lg-3" no-gutters>
            <b-col cols class="chart-container chart-h-20 chart-range-h-200">
              <LazyPieChart
                canvas-id="authShare-chart"
                :data="authChartData"
                :legend-view="false"
                :custom-legend="true"
                custom-legend-id="authShare-chart-lengend"
                :legend-callback="paymentsLegendCb"
                :use-custom-legend-click="true"
                custom-legend-click="default"
                use-data-label
                :data-label-opt="authLabelOpt"
                half-size
                responsive
              />
            </b-col>
            <b-col cols>
              <div id="authShare-chart-lengend" class="d-flex flex-wrap justify-content-between align-content-around h-100 pb-md-2 px-md-0" />
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
      <b-col cols md="7">
        <b-row no-gutters class="h-100">
          <b-col cols>
            <dash-card title="Authentication - Table" class="h-100" table>
              <b-table
                :sort-by.sync="authSortBy"
                :sort-desc.sync="authsortDesc"
                :items="authentications"
                :fields="authField"
                head-variant="light"
                responsive
                hover
                class="mb-0 h-100"
                table-class="h-100"
              >
                <template #cell(count)="data">
                  {{ data.value }}
                </template>
                <template #cell(percent)="data">
                  {{ data.value }} %
                </template>
              </b-table>
            </dash-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import dayjs from "dayjs"
import { mapGetters } from "vuex"

export default {
  name: 'UserStatics',
  layout: 'dashboard',
  props: {},
  data: () => ({
    total: { rate: 0, value: 0 },
    activeUsers: { rate: 0, value: 0 },
    newUsers: { rate: 0, value: 0 },
    grouping: [{}],
    weekTrafficDataset: [],
    timeTrafficDataset: {},
    paymentsChartData: [],
    payments: [],
    paymentsSortBy: 'amount',
    paymentssortDesc: true,
    paymentsField: [
      {
        label: 'Payment',
        key: 'payment',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600'
      },
      {
        label: 'Amount',
        key: 'amount',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600'
      },
      {
        label: '- Share',
        key: 'amountPercent',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600'
      },
      {
        label: 'Count',
        key: 'count',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600'
      },
      {
        label: '- Share',
        key: 'countPercent',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600'
      }
    ],
    authChartData: [],
    authentications: [],
    authSortBy: 'count',
    authsortDesc: true,
    authField: [
      {
        label: 'Authentication',
        key: 'authentication',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600 align-middle'
      },
      {
        label: 'Count',
        key: 'count',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600 align-middle'
      },
      {
        label: 'Share`',
        key: 'percent',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600 align-middle'
      }
    ]
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
      this.authChartData = {
        labels: statics.data.authentications.map(({ authentication }) => authentication),
        datasets: [{
          data: statics.data.authentications.map(({ percent }) => percent)
        }]
      }
      const paymentsSet = statics.data.payments.map(({ amountPercent }) => amountPercent)
      this.authentications = statics.data.authentications
      this.paymentsChartData = {
        labels: statics.data.payments.map(({ payment }) => payment),
        datasets: [{
          data: paymentsSet
        }]
      }
      this.payments = statics.data.payments
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
        }
      }]
    },
    hoursTrafficOptionsYaxe () {
      return [{
        ticks: {
          beginAtZero: false
          // stepSize: 3
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
    },
    paymentsLabelOpt () {
      return {
        anchor: 'end',
        align ({ chart, dataIndex }) {
          const dataPeer = chart.data.labels.length - 1
          if (dataIndex === 0 || dataIndex === dataPeer || dataIndex === dataPeer - 1) {
            if (dataIndex !== dataPeer - 1) {
              return 'start'
            } else {
              const data = chart.data.datasets[0].data[dataIndex]
              return data < 13 ? 'start' : 'center'
            }
          } else {
            return 'center'
          }
        },
        borderRadius: 16,
        borderWidth: 2,
        color: "white",
        borderColor: "white",
        backgroundColor (context) {
          return context.dataset.backgroundColor
        },
        offset ({ chart, dataIndex }) {
          const dataPeer = chart.data.labels.length - 1
          if (dataIndex === 0) {
            return -10
          } else if (dataIndex === dataPeer || dataIndex === (dataPeer - 1)) {
            const data = chart.data.datasets[0].data[dataIndex]
            return data < 13
              ? dataIndex === (dataPeer - 1) ? -10 : -4
              : -6.5
          } else {
            return 3
          }
        },
        formatter (value, context) {
          const formerLetter = context.chart.data.labels[context.dataIndex].split(' ')[0]
          return formerLetter
        }
      }
    },
    authLabelOpt () {
      return {
        anchor: 'end',
        align ({ chart, dataIndex }) {
          const dataPeer = chart.data.labels.length - 1
          return dataIndex === 0 || dataIndex === dataPeer ? 'start' : 'center'
        },
        borderRadius: 16,
        borderWidth: 2,
        color: "white",
        borderColor: "white",
        backgroundColor (context) {
          return context.dataset.backgroundColor
        },
        offset ({ chart, dataIndex }) {
          const dataPeer = chart.data.labels.length - 1
          return dataIndex === 0 ? -10 : dataIndex === dataPeer ? -7 : 3
        },
        formatter (value, context) {
          return context.chart.data.labels[context.dataIndex]
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
  methods: {
    paymentsLegendCb (chart) {
      const ds = chart.data.datasets[0]
      const labels = chart.data.labels
      const text = ds.data.reduce((legendHtml, data, d) => {
        legendHtml.push(`<div id="payment-amount-legend-${d}"
          data-legend-role="parent" data-legend-parent="payment-amount-legend-${d}"
          data-chart-dataset="0" data-chart-idx="${d}"
          class="d-flex align-items-center user-select-none text-nowrap mb-2 mb-md-0 w-50" style="color:${ds.backgroundColor[d]}; font-size: 0.8rem">
          <span class="legend-dot legend-dot--circle" style="background-color:${ds.backgroundColor[d]}"></span>
          <span class="ml-2">${labels[d]}</span>
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
