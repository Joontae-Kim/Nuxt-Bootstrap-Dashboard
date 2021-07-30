<template>
  <b-row class="mb-4">
    <b-col cols md="4" class="mb-4 mb-md-0">
      <dash-card
        title="Total Event"
        icon="house-door-fill"
        :index="totalEvent"
        :guide="null"
        class="h-100 pt-3 px-3"
        no-padding
      >
        <template #footer>
          <b-row class="border-top h-100" align-v="center">
            <b-col cols>
              <div class="d-flex align-items-center justify-content-between py-3 py-md-0">
                <div class="dsCard__guide">At</div>
                <div class="small font-italic text-gray-600 text-right">
                  {{ now }}
                </div>
              </div>
            </b-col>
          </b-row>
        </template>
      </dash-card>
    </b-col>
    <b-col cols md="4" class="mb-4 mb-md-0">
      <dash-card
        title="Event on Today"
        :index="todayEvent"
        icon="calendar-check"
        class="h-100 pt-3 px-3"
        no-padding
        :guide="null"
      >
        <template #footer>
          <b-row class="h-100 py-2 border-top" align-v="center">
            <b-col cols>
              <div class="d-flex justify-content-end align-items-center">
                <button-overlay
                  button-ref="searchTodayEventBtn"
                  :show="isSearching.today"
                  spinner-variant="dark"
                >
                  <b-btn ref="searchTodayEventBtn" size="sm" variant="secondary" @click="searchTodayEvent">View Details</b-btn>
                </button-overlay>
              </div>
            </b-col>
          </b-row>
        </template>
      </dash-card>
    </b-col>
    <b-col cols md="4">
      <dash-card
        title="The Scheduled events"
        icon="clock-history"
        :index="upcoming"
        class="h-100 pt-3 px-3"
        no-padding
        :guide="null"
      >
        <template #footer>
          <b-row class="h-100 py-2 border-top" align-v="center">
            <b-col cols>
              <div class="d-flex justify-content-between align-items-center">
                <div class="dsCard__guide">In</div>
                <button-overlay
                  button-ref="upcomingBtn"
                  :show="isSearching.upcoming"
                  spinner-variant="dark"
                >
                  <b-form-select
                    ref="upcomingBtn"
                    v-model="upcomingValue"
                    :options="upcomingOpt"
                    class="w-auto"
                    size="sm"
                    @change="selectScheduled"
                  />
                </button-overlay>
              </div>
            </b-col>
          </b-row>
        </template>
      </dash-card>
    </b-col>
  </b-row>
</template>

<script>
import dayjs from "dayjs"
import buttonOverlay from '../common/button-overlay.vue'

export default {
  name: "EventsStatics",
  components: { buttonOverlay },
  data: () => ({
    totalEvent: 0,
    todayEvent: 0,
    upcoming: 0,
    upcomingValue: 'days',
    upcomingOpt: [
      { value: 'days', text: '3 days' },
      { value: 'week', text: '1 week' },
      { value: 'weeks', text: '3 week' },
      { value: 'month', text: '1 month' },
      { value: 'months', text: '3 month' }
    ],
    isSearching: {
      upcoming: false,
      today: false
    }
  }),
  async fetch () {
    try {
      const upcomingDate = this.computeUpcomingDate(this.upcomingValue)
      const { total, rate, upcoming } = await this.$axios.$get('/api/event/eventStatics', {
        params: { openAt: new Date(), upcomingDate }
      })
      this.totalEvent = this.computeEventString(total)
      this.todayEvent = this.computeEventString(rate)
      this.upcoming = this.computeEventString(upcoming)
    } catch (err) {
      console.log('                  ~ err => ', err)
      console.log('                  ~ err.message => ', err.message)
    }
  },
  computed: {
    now () {
      return dayjs().format('YYYY-MM-DD hh:mm:ss A')
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async searchTodayEvent () {
      this.isSearching.today = true
      const { rate } = await this.$axios.$get('/api/event/statics', { params: { openAt: new Date() } })
      this.todayEvent = this.computeEventString(rate)
      this.isSearching.today = false
    },
    async selectScheduled () {
      this.isSearching.upcoming = true
      const upcomingDate = this.computeUpcomingDate(this.upcomingValue)
      const { upcoming } = await this.$axios.$get('/api/event/statics', { params: { upcomingDate } })
      this.upcoming = this.computeEventString(upcoming)
      this.isSearching.upcoming = false
    },
    computeUpcomingDate (unit) {
      switch (unit) {
        case 'days':
          return dayjs().add(3, 'day').$d
        case 'week':
          return dayjs().add(1, 'week').$d
        case 'weeks':
          return dayjs().add(3, 'week').$d
        case 'month':
          return dayjs().add(1, 'month').$d
        case 'months':
          return dayjs().add(3, 'month').$d
      }
    },
    computeEventString (number) {
      return number < 2 ? `${number} event` : `${number} events`
    }
  }
}
</script>

<style>

</style>
