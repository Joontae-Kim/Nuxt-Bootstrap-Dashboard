<template>
  <b-row>
    <b-col cols>
      <dash-card title="Duration" class="pb-3">
        <b-row>
          <b-col cols>
            <h5 :class="titleClass">Created At</h5>
            <div class="text-gray-800 fs-6">{{ eventDate.publishedAt }}</div>
            <div class="text-gray-800">
              <span class="fs-6">{{ eventDate.modifiedAt }}</span>
              <span class="small font-italic">(Modified)</span>
            </div>
          </b-col>
          <b-col cols>
            <h5 :class="titleClass">Open</h5>
            <div :class="dateClass" style="margin-bottom: -.2rem;">{{ openStatus.date }}</div>
            <div :class="dDateClass" style="">
              <strong class="text-gray-700"> {{ openStatus.daysLabel }} </strong>
              <span class="text-gray-600">from now</span>
            </div>
            <b-badge
              :variant="openStatus.badgeVariant"
              class="font-weight-normal fs-6 text-white"
              pill
            >
              {{ openStatus.label }}
            </b-badge>
          </b-col>
          <b-col cols>
            <h5 :class="titleClass">Close</h5>
            <div :class="dateClass" style="margin-bottom: -.2rem;">{{ closeStatus.date }}</div>
            <div :class="dDateClass" style="">
              <strong class="text-gray-700"> {{ closeStatus.daysLabel }} </strong>
              <span class="text-gray-600">from now</span>
            </div>
            <b-badge
              :variant="closeStatus.badgeVariant"
              :class="dBadgeClass"
              pill
            >
              {{ closeStatus.label }}
            </b-badge>
          </b-col>
        </b-row>
      </dash-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'EventStatus',
  props: {
    eventDate: {
      required: true,
      type: Object,
      default: (eventDateProps) => {
        return eventDateProps === undefined ? { publishedAt: 'publishedAt', modifiedAt: 'modifiedAt' } : eventDateProps
      }
    },
    open: {
      required: true,
      type: Object,
      default: (openProps) => {
        return openProps === undefined ? { status: 'open status', days: 0 } : openProps
      }
    },
    close: {
      required: true,
      type: Object,
      default: (closeProps) => {
        return closeProps === undefined ? { status: 'close status', days: 0 } : closeProps
      }
    }
  },
  data: () => ({
    titleClass: 'text-gray-600',
    dateClass: 'font-italic fs-4 text-gray-700',
    dDateClass: 'font-italic small mb-3',
    dBadgeClass: 'font-weight-normal fs-6 text-white'
  }),
  computed: {
    openStatus () {
      const badgeVariant = this.close.status ? 'secondary' : this.open.days > -1 ? 'primary' : 'warning'
      const label = this.open.status ? 'Opened' : 'Scheduled to open'
      const daysLabel = Math.abs(this.open.days) > 1 ? 'days' : 'day'
      return {
        badgeVariant,
        label,
        days: this.open.days,
        daysLabel: `${this.open.days} ${daysLabel}`,
        date: this.open.date
      }
    },
    closeStatus () {
      const badgeVariant = this.close.status ? 'danger' : this.open.days > -1 ? 'primary' : 'warning'
      const label = !this.open.status ? 'Scheduled to open' : this.close.status ? 'Closed' : 'Ongoing'
      const daysLabel = Math.abs(this.close.days) > 1 ? 'days' : 'day'
      return {
        badgeVariant,
        label,
        days: this.open.days,
        daysLabel: `${this.close.days} ${daysLabel}`,
        date: this.close.date
      }
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style>

</style>
