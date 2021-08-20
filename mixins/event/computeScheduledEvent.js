// computeScheduledEvent.js
import dayjs from "dayjs"

export default {
  data: () => ({
    upcomingValue: 'days',
    upcomingOpt: [
      { value: 'days', text: '3 days' },
      { value: 'week', text: '1 week' },
      { value: 'weeks', text: '3 week' },
      { value: 'month', text: '1 month' },
      { value: 'months', text: '3 month' }
    ]
  }),
  computed: {},
  methods: {
    initializeUpcoming () {
      this.upcomingValue = 'days'
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
        default:
          return dayjs().add(3, 'day').$d
      }
    }
  }
}
