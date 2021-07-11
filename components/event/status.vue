<template>
  <b-row>
    <b-col cols md="5" lg="4" class="mb-4 mb-md-0">
      <dash-card title="Date Created" class="pb-3 h-100">
        <b-row>
          <b-col cols>
            <div class="">
              <b-iconstack font-scale="1.15" shift-v="2" class="mr-1">
                <b-icon stacked icon="circle-fill" class="text-gray-500" />
                <b-icon stacked icon="house-door-fill" scale="0.6" variant="white" />
              </b-iconstack>
              <span class="fs-4 text-gray-700 font-italic">
                {{ eventDate.publishedAt }}
              </span>
            </div>
            <div class="">
              <b-iconstack font-scale="1.15" shift-v="2" class="mr-1">
                <b-icon stacked icon="circle-fill" class="text-gray-500" />
                <b-icon stacked icon="pencil-fill" scale="0.5" variant="white" />
              </b-iconstack>
              <span class="fs-4 text-gray-700 font-italic">
                {{ eventDate.modifiedAt }}
              </span>
            </div>
          </b-col>
        </b-row>
      </dash-card>
    </b-col>
    <b-col cols md="auto" lg="4" class="mb-4 mb-md-0 flex-md-grow-1 flex-lg-grow-0">
      <dash-card title="Open" class="h-100">
        <b-row>
          <b-col cols>
            <div :class="dateClass" style="margin-bottom: -.2rem;">{{ openStatus.date }}</div>
            <div :class="dDateClass" style="">
              <strong class="text-gray-700"> {{ openStatus.daysLabel }} </strong>
              <span class="text-gray-600">from now</span>
            </div>
          </b-col>
        </b-row>
        <template #footer>
          <b-row class="mb-3">
            <b-col cols>
              <b-badge
                :variant="openStatus.badgeVariant"
                class="font-weight-normal text-white small"
                pill
              >
                {{ openStatus.label }}
              </b-badge>
            </b-col>
          </b-row>
        </template>
      </dash-card>
    </b-col>
    <b-col cols md="auto" lg="4" class="flex-md-grow-1 flex-lg-grow-0">
      <dash-card title="Close" class="h-100">
        <b-row>
          <b-col cols>
            <div :class="dateClass" style="margin-bottom: -.2rem;">{{ closeStatus.date }}</div>
            <div :class="dDateClass" style="">
              <strong class="text-gray-700"> {{ closeStatus.daysLabel }} </strong>
              <span class="text-gray-600">from now</span>
            </div>
          </b-col>
        </b-row>
        <template #footer>
          <b-row class="mb-3">
            <b-col cols>
              <b-badge
                :variant="closeStatus.badgeVariant"
                :class="[dBadgeClass, 'small']"
                pill
              >
                {{ closeStatus.label }}
              </b-badge>
            </b-col>
          </b-row>
        </template>
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
    dDateClass: 'font-italic small mb-2',
    dBadgeClass: 'font-weight-normal text-white'
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
