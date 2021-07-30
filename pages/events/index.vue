<template>
  <b-container fluid>
    <EventStatics />
    <b-row>
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
          <b-col cols class="my-auto">
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
        <dash-card title="Sales Segment Table" class="" table>
          <b-table
            :sort-by.sync="salesSegmentSortBy"
            :sort-desc.sync="salesSegmentSortDesc"
            :items="salesSegment"
            :fields="salesSegmentField"
            head-variant="light"
            responsive
            hover
            class="mb-0"
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
    <b-row>
      <b-col>
        totalViews {{ totalViews }}
        <pre>{{ viewsSegment }}</pre>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols>
        {{ openMonthSegment }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
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
    totalViews: 0,
    viewsSegment: null,
    openMonthSegment: null
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
    const totalViews = res.viewsSegment.reduce((totalViews, { total }) => totalViews + total, 0)
    this.viewsSegment = res.viewsSegment.map(view => ({ ...view, dis_total: this.formatNumber(view.total), percent: Number(Number((view.total / totalViews) * 100).toFixed(1)) }))
    this.totalViews = this.formatNumber(totalViews)
    this.openMonthSegment = res.openMonthSegment.reverse().map(monthData => ({ ...monthData, sales: this.formatNumber(monthData.sales) }))
  },
  computed: {
    ...mapGetters({
      events: 'events/getEvents',
      totalEvent: 'events/getTotalEventCount'
    })
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
  methods: {}
}
</script>

<style lang="scss">
</style>
