<template>
  <b-container fluid>
    <b-row class="mb-3">
      <b-col cols="6" md="3">
        <dash-card
          title="Total Visitor"
          icon="people-fill"
          :index="totalVistor.visitor"
          :rate="totalVistor.rate"
        />
      </b-col>
      <b-col cols="6" md="3">
        <dash-card
          title="New Visotores & Users"
          :index="newVistor.visitor"
          :rate="newVistor.rate"
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
      <b-col cols="6" md="3">
        <dash-card title="Traffic Share">
          {{ shares }}
          <BarChart :data="barChartData" :height="400" />
        </dash-card>
      </b-col>
      <b-col cols="6" md="3">
        <dash-card title="Views Per Minute">
          {{ viewsPerMinute }}
        </dash-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols md="4" class="mb-3">
        <dash-card title="Channels">
          {{ channels }}
        </dash-card>
      </b-col>
      <b-col cols md="8" class="mb-3">
        <dash-card title="Visit by Notification">
          <slot>
            {{ noti }}
          </slot>
        </dash-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols md="6">
        <dash-card title="Sales Value">
          <slot>
            {{ sales }}
          </slot>
        </dash-card>
      </b-col>
      <b-col cols md="6">
        <dash-card title="Event Rank">
          <slot>
            {{ eventRank }}
          </slot>
        </dash-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import DoughnutChart from '~/components/chart/pie'

export default {
  // components: {
  //   DoughnutChart
  // },
  layout: 'dashboard',
  data: () => ({
    totalVistor: null,
    newVistor: null,
    shares: null,
    viewsPerMinute: null,
    channels: null,
    noti: null,
    sales: null,
    eventRank: null,
    barChartData: {
      labels: [
        "2019-06",
        "2019-07",
        "2019-08",
        "2019-09",
        "2019-10",
        "2019-11",
        "2019-12",
        "2020-01",
        "2020-02",
        "2020-03"
      ],
      datasets: [
        {
          label: "Visualizaciones",
          data: [2, 1, 16, 3, 4, 5, 0, 0, 4, 12, 2],
          backgroundColor: "rgba(20, 255, 0, 0.3)",
          borderColor: "rgba(100, 255, 0, 1)",
          borderWidth: 2
        }
      ]
    }
  }),
  async fetch () {
    console.log(`fetch ~ `)
    // console.log(`          ~ `)
    const res = await this.$axios.$get('/over/')
    console.log(`      ~ res => `, res)
    this.totalVistor = { ...res.total, visitor: this.formatNumber(res.total.visitor) }
    this.newVistor = { ...res.newVisitor, visitor: this.formatNumber(res.newVisitor.visitor) }
    this.shares = {
      labels: Object.keys(res.share),
      datasets: [{
        data: Object.values(res.share),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    }
    this.viewsPerMinute = res.visitbyNotification
    this.channels = res.channels
    this.noti = res.viewsPerMinute
    this.sales = res.sales
    this.eventRank = res.eventRank
    // return res
    console.log(`          ~ fetch done`)
  },
  watch: {
    // '$fetchState.pending' (state) {
    // }
  },
  mounted () {
    console.log(`overview ~ mounted`)
    // console.log(`         ~ `)
  },
  methods: {
    async callAPI () {
      try {
        console.log('callAPITest ~ ')
        // console.log(`            ~ `)
        const res = await this.$axios.$get('/over/')
        console.log('            ~ res => ', res)
      } catch (e) {
        console.log('            ~ e => ', e)
        console.log('            ~ e.response => ', e.response)
      }
    }
  }
}
</script>

<style>

</style>
