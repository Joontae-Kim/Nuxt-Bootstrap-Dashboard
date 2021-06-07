<template>
  <b-row class="flex-column mb-4">
    <template v-if="!eventOpened">
      <b-col cols class="mb-4">
        <dash-card
          :use-title="false"
          class="pb-3 bg-warning fs-5 font-weight-bold text-gray-800 text-center"
        >
          Performance will be measured when the event is open.
        </dash-card>
      </b-col>
      <b-col cols>
        <b-row class="px-0">
          <b-col
            v-for="indexEle of computedIndex"
            :key="`event-index-${indexEle.name}`"
          >
            <dash-card
              :title="indexEle.name"
              :icon="indexEle.icon"
              :index="indexEle.value"
              :rate="indexEle.value"
              class="pb-3"
            />
          </b-col>
        </b-row>
      </b-col>
    </template>
    <template v-else>
      <b-col cols class="mb-4">
        <dash-card title="Performance">
          <template v-slot:header-right>
            <i class="small">(graph type)</i>
          </template>
        </dash-card>
      </b-col>
      <b-col cols class="mb-4">
        <b-row class="px-0">
          <b-col
            v-for="indexEle of computedIndex"
            :key="`event-index-${indexEle.name}-chart`"
            cols
            md="4"
          >
            <dash-card :title="indexEle.name" class="mb-4 mb-md-0 h-100">
              <b-row :id="`${indexEle.name.toLowerCase()}-chart-wrapper`" align-v="center" class="h-100">
                <b-col cols class="vh-100 chart__container">
                  <LazyLineChart
                    :canvas-id="`${indexEle.name.toLowerCase()}-chart`"
                    :data="indexEle.value"
                    :custom-opt="{ responsive: true }"
                    class="pb-3"
                    tooltip
                  />
                </b-col>
              </b-row>
            </dash-card>
          </b-col>
        </b-row>
      </b-col>
    </template>
  </b-row>
</template>

<script>
import createChartColors from "~/mixins/chart/createChartColors"

export default {
  name: 'EventPerformanceIndex',
  mixins: [
    createChartColors
  ],
  props: {
    eventOpened: {
      required: true,
      type: Boolean,
      default: (eventOpenedProps) => {
        return eventOpenedProps === undefined ? false : eventOpenedProps
      }
    },
    index: {
      required: true,
      type: Object,
      default: (indexProps) => {
        return indexProps === undefined ? null : indexProps
      }
    },
    indexKey: {
      required: true,
      type: Array,
      default: (indexKeyProps) => {
        return indexKeyProps === undefined ? null : indexKeyProps
      }
    },
    indexIcon: {
      required: true,
      type: Object,
      default: (indexIconProps) => {
        return indexIconProps === undefined ? null : indexIconProps
      }
    },
    indexDates: {
      required: false,
      type: Array,
      default: (indexDatesProps) => {
        return indexDatesProps === undefined ? null : indexDatesProps
      }
    }
  },
  data: () => ({
    computedIndex: [],
    charView: 'single',
    charViewOpt: [
      // 'Single', 'Mixed'
      { text: 'Single', value: 'single' },
      { text: 'Mixed', value: 'mixed' }
    ],
    chartField: {
      label: null,
      backgroundColor: null,
      borderColor: null,
      // fill: false,
      data: null // this.$createChartData.line()
    }
  }),
  computed: {},
  watch: {},
  created () {
    this.computeIndex()
  },
  mounted () {},
  methods: {
    computeIndex () {
      console.log(`computeIndex ~ `)
      // console.log(`             ~ `)
      console.log(`             ~ !this.eventOpened => ${!this.eventOpened}`)
      if (!this.eventOpened) {
        this.computeIndex_simple()
      } else {
        console.log(`             ~ this.$route.query => `, this.$route.query)
        const chartMode = this.$route.query.chmd
        console.log(`             ~ chartMode => `, chartMode)
        if (!chartMode || chartMode === 'indi') {
          this.computeIndex_chart_individual()
        } else if (chartMode === 'mixed') {
          this.computeIndex_chart_mixed()
        }
      }
    },
    computeIndex_simple () {
      for (const key of this.indexKey) {
        const _key = key.toLowerCase()
        if (Object.prototype.hasOwnProperty.call(this.index, _key)) {
          this.computedIndex.push({
            name: key,
            value: this.index[_key],
            icon: this.indexIcon[_key]
          })
        }
      }
    },
    computeIndex_chart_individual () {
      console.log('computeIndex_chart_individual ~ ')
      // console.log(`                              ~ `)
      const colorSet = this.getRandomColors(this.indexKey.length)
      for (const [k, key] of this.indexKey.entries()) {
        const _key = key.toLowerCase()
        if (Object.prototype.hasOwnProperty.call(this.index, _key)) {
          if (this.index[_key].length) {
            this.computedIndex.push({
              name: key,
              value: {
                labels: this.indexDates,
                datasets: [{
                  label: key,
                  backgroundColor: new Array(this.index[_key].length).fill([colorSet[k].value]),
                  borderColor: new Array(this.index[_key].length).fill([colorSet[k].value]),
                  fill: false,
                  data: this.index[_key],
                  barPercentage: 0.3
                }]
              }
            })
          }
        }
      }
    },
    computeIndex_chart_mixed () {
      console.log('computeIndex_chart_mixed ~ ')
      console.log('                         ~ ')
    }
  }
}
</script>

<style>

</style>
