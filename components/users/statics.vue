<template>
  <b-row>
    <b-col cols md="4" class="mb-4 mb-md-0">
      <b-row class="flex-column h-100">
        <b-col cols>
          <dash-card
            title="Users"
            icon="people-fill"
            :index="total.value"
            :rate="total.rate"
          />
        </b-col>
        <b-col cols class="py-4">
          <dash-card
            title="New Users"
            icon="person-check-fill"
            :index="newUsers.value"
            :rate="newUsers.rate"
          />
        </b-col>
        <b-col cols>
          <dash-card title="Group by Status" class="h-100" table>
            <!-- {{ grouping }} -->
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
    <b-col cols md="8">
      <b-row class="flex-column h-100">
        <b-col cols class="pb-4 h-50">
          <dash-card title="Weekly Traffic" class="h-100">
            <b-row id="weeklyTraffic-chart-wrapper" align-v="center" class="h-100">
              <b-col cols class="h-100 chart__container">
                <LazyLineChart
                  canvas-id="weeklyTraffic-chart"
                  :data="weekTrafficDataset"
                  :custom-opt="weekTrafficOptions"
                  class="pb-3"
                  tooltip
                />
              </b-col>
            </b-row>
          </dash-card>
        </b-col>
        <b-col cols class="h-50">
          <dash-card title="24 Hours Traffic" :useicon="false" class="h-100">
            <b-row id="hourlyTraffic-chart-wrapper" align-v="center" class="h-100">
              <b-col cols class="h-100 chart__container-sm">
                <LazyBarChart
                  canvas-id="hourlyTraffic-chart"
                  class="pb-3"
                  :data="timeTrafficDataset"
                  :custom-opt="hoursTrafficOptions"
                  tooltip
                />
              </b-col>
            </b-row>
          </dash-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import dayjs from "dayjs"
import { mapGetters } from "vuex"
import createChartColors from "~/mixins/chart/createChartColors"

export default {
  name: "UserStatics",
  mixins: [
    createChartColors
  ],
  props: {},
  data: () => ({
    total: { rate: 0, value: 0 },
    activeUsers: { rate: 0, value: 0 },
    newUsers: { rate: 0, value: 0 },
    grouping: [{}],
    weekTrafficDataset: [],
    timeTrafficDataset: {}
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
          backgroundColor: 'red',
          borderColor: 'red',
          fill: false,
          data: this.$createChartData.line(statics.data.weekSerial)
        }]
      }
      const timeSerial = statics.data.timeSerial
      const timeSerialColors = this.getColors('indigo')
      this.timeTrafficDataset = {
        labels: timeSerial.map(time => Object.keys(time)[0]),
        datasets: [{
          data: timeSerial.map(time => Object.values(time)[0]),
          backgroundColor: new Array(timeSerial.length).fill(timeSerialColors.rgba),
          barPercentage: 0.6
        }]
      }
    } catch (err) {
      console.log(err)
      console.log(err.message)
    }
  },
  computed: {
    ...mapGetters({}),
    weekTrafficOptions () {
      return {
        responsive: true
      }
    },
    hoursTrafficOptions () {
      return {
        responsive: true,
        scales: {
          xAxes: [{
            type: 'time',
            gridLines: {
              borderDash: [3, 4]
            },
            time: {
              unit: 'hour',
              distribution: 'series',
              displayFormats: {
                minute: 'h:mm a'
              },
              stepSize: 4
            }
          }],
          yAxes: [{
            gridLines: {
              borderDash: [3, 4]
            },
            ticks: {
              beginAtZero: true,
              stepSize: 5,
              padding: 10
            }
          }]
        },
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
    }
  }
}
</script>

<style>

</style>
