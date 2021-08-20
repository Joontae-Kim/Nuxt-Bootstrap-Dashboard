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
import computeScheduledEvent from '~/mixins/event/computeScheduledEvent'

export default {
  name: "EventsStatics",
  components: { buttonOverlay },
  mixins: [
    computeScheduledEvent
  ],
  data: () => ({
    totalEvent: 0,
    todayEvent: 0,
    upcoming: 0,
    isSearching: {
      upcoming: false,
      today: false
    }
  }),
  async fetch () {
    try {
      const upcomingDate = this.computeUpcomingDate(this.upcomingValue)
      const { total, rate, upcoming } = await this.$axios.$get('/api/event/eventStatics', {
        params: { type: 'total,rate,upcoming', openAt: new Date(), upcomingDate }
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
  watch: {
    '$route.query.scheduled': {
      async handler (val) {
        if (val) {
          await this.requestScheduled()
        } else {
          this.initializeUpcoming()
        }
      }
    }
  },
  created () {
    if (this.$route.query.scheduled) {
      const queryScheduled = this.$route.query.scheduled
      const isValidSchedluedQuery = this.upcomingOpt.find(({ value }) => value === queryScheduled)
      if (isValidSchedluedQuery !== 'undefined') {
        this.upcomingValue = isValidSchedluedQuery.value
      } else {
        this.upcomingValue = 'days'
      }
    }
  },
  mounted () {},
  methods: {
    async searchTodayEvent () {
      this.isSearching.today = true
      const { rate } = await this.$axios.$get('/api/event/eventStatics', {
        params: { type: 'rate', openAt: new Date() }
      })
      this.todayEvent = this.computeEventString(rate)
      this.isSearching.today = false
    },
    selectScheduled () {
      this.$router.push({ query: { scheduled: this.upcomingValue } })
    },
    async requestScheduled () {
      this.isSearching.upcoming = true
      let updatedScheduled = []
      const upcomingDate = this.computeUpcomingDate(this.upcomingValue)
      if (this.$route.name === 'eventsStatics') {
        const { upcoming } = await this.$axios.$get('/api/event/eventStatics', {
          params: { type: 'upcoming', upcomingDate }
        })
        updatedScheduled = upcoming
      } else {
        const updatedUpcoming = await this.$axios.$get('/api/event', { params: { openAt: upcomingDate } })
        await this.$store.dispatch('events/DISPATCH_SET', updatedUpcoming.list)
        updatedScheduled = updatedUpcoming.list.length
      }

      this.upcoming = this.computeEventString(updatedScheduled)
      this.isSearching.upcoming = false
    },
    computeEventString (number) {
      return number < 2 ? `${number} event` : `${number} events`
    }
  }
}
</script>

<style>

</style>
