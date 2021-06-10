<template>
  <b-container fluid>
    <template v-if="eventOpen.status">
      <client-only>
        <SalesAnalytics
          v-bind="{ views, sales, dates: indexDates }"
        />
      </client-only>
      <b-row class="mb-4">
        <TrafficSoureces v-bind="{ traffic }" />
      </b-row>
    </template>
    <LazyEventStatus
      v-bind="{ eventDate }"
      :open="eventOpen"
      :close="eventClose"
      class="mb-4"
    />
    <b-row class="mb-4">
      <b-col cols>
        <dash-card title="Information" no-overflow class="pb-3">
          <b-row>
            <b-col cols>
              <b-form>
                <b-form-row>
                  <b-col cols>
                    <b-form-group
                      id="form-group-id"
                      label="Event Id"
                      label-for="form-id"
                    >
                      <b-form-input
                        id="form-id"
                        v-model="id"
                        readonly
                        disabled
                        trim
                      />
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols>
                    <b-form-group
                      id="form-group-title"
                      label="Event name"
                      label-for="form-title"
                    >
                      <b-form-input
                        id="form-title"
                        v-model="information.title"
                        :state="formState.title"
                        placeholder="Enter event name"
                        :disabled="!formEditable"
                        required
                        trim
                      />
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols="12" md>
                    <b-form-group
                      id="form-group-open"
                      label="Open Date"
                      label-for="form-open"
                    >
                      <b-form-datepicker
                        id="form-open"
                        v-model="information.openAt"
                        :state="formState.openAt"
                        boundary="window"
                        :disabled="eventOpen.status || disabled"
                        no-close-on-select
                        today-button
                        reset-button
                        :hide-header="true"
                        :date-disabled-fn="openDateDisabled"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md>
                    <b-form-group
                      id="form-group-close"
                      label="Close Date"
                      label-for="form-close"
                    >
                      <b-form-datepicker
                        id="form-close"
                        v-model="information.closedAt"
                        :state="formState.closedAt"
                        boundary="window"
                        :disabled="eventOpen.status || disabled"
                        no-close-on-select
                        today-button
                        reset-button
                        :hide-header="true"
                        :date-disabled-fn="closeDateDisabled"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md>
                    <b-form-group
                      id="form-group-duration"
                      label="Duration (based on Saved Date)"
                      label-for="form-duration"
                    >
                      <b-form-input
                        id="form-duration"
                        :value="durationText"
                        readonly
                        disabled
                        trim
                      />
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols>
                    <b-form-group
                      id="form-group-eventType"
                      v-slot="{ ariaDescribedby }"
                      label="Event Type"
                      label-for="form-eventType"
                    >
                      <b-form-checkbox-group
                        id="form-eventType"
                        v-model="information.eventType"
                        :state="formState.eventType"
                        :options="eventTypeOpt"
                        :aria-describedby="ariaDescribedby"
                        :disabled="!formEditable"
                        name="form-eventType-chckbx"
                      />
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row class="mt-3">
                  <b-col cols class="text-right">
                    <b-btn variant="dark" :disabled="disabledIngoreButton || disabled" @click="ignoreOpened">Ignore Already opened</b-btn>
                    <b-btn variant="danger" :disabled="!isUpdated || disabled" @click="reset">Reset</b-btn>
                    <button-overlay :show="isSaving" button-ref="saveButton">
                      <b-btn ref="saveButton" variant="primary" :disabled="!isUpdated || disabled" @click="save">Save</b-btn>
                    </button-overlay>
                  </b-col>
                </b-form-row>
              </b-form>
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
    <template v-if="!eventOpen.status">
      <b-row class="mb-4">
        <b-col cols>
          <dash-card
            :use-title="false"
            class="pb-3 bg-warning fs-5 font-weight-bold text-gray-800 text-center"
          >
            Performance will be measured when the event is open.
          </dash-card>
        </b-col>
      </b-row>
      <SalesAnalytics
        v-bind="{ views, sales }"
      />
    </template>
    <b-row>
      <b-col cols>
        relative count {{ relative.length }}
      </b-col>
      <b-col cols>
        relative <pre>{{ relative }}</pre>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import dayjs from "dayjs"
import { generateEventDurationObject, generateEventDate } from "~/lib/event.lib"

export default {
  name: 'EventDetailed',
  components: {
    SalesAnalytics: () => {
      if (process.client) { return import('../../components/event/details/salesAnalytics.vue') }
    },
    TrafficSoureces: () => {
      if (process.client) { return import('../../components/event/details/trafficSoureces') }
    }
  },
  provide () {
    return {
      parentRef: this.$refs
    }
  },
  layout: 'dashboard',
  middleware: [
    'check-renderer'
  ],
  async asyncData ({ params, $axios, renderServer }) {
    try {
      console.log(`asyncData ~ `)
      // console.log(`          ~ `)
      const res = await $axios.$get(`/api/event/${params.id}`)
      const event = res.event
      const info = {
        title: event.title,
        openAt: !event.openAt ? null : event.openAt,
        closedAt: !event.closedAt ? null : event.closedAt,
        eventType: event.eventType
      }
      return {
        isServerRender: renderServer,
        id: event._id,
        information: info,
        information_clone: Object.assign({}, info),
        eventOpen: generateEventDurationObject(event.isOpened, event.openAt),
        eventClose: generateEventDurationObject(event.isClosed, event.closedAt),
        eventDate: generateEventDate(event.publishedAt, event.modifiedAt),
        duration: event.duration,
        views: event.views,
        sales: event.sales,
        traffic: event.traffic,
        indexDates: event.indexDates,
        relative: event.relative
      }
    } catch (err) {
      console.log(`          ~ err => `, err)
    }
  },
  data: () => ({
    isServerRender: false,
    id: null,
    information: {},
    informationClone: {},
    eventDate: {
      publishedAt: null,
      modifiedAt: null
    },
    eventOpen: {
      date: null,
      status: null,
      days: null
    },
    eventClose: {
      date: null,
      status: null,
      days: null
    },
    views: [],
    sales: [],
    traffic: {},
    indexDates: [],
    relative: [],
    eventTypeOpt: [
      { text: 'Recommended', value: 'Recommended' },
      { text: 'Theme & Template', value: 'Theme & Template' },
      { text: 'Hottest', value: 'Hottest' },
      { text: 'Package', value: 'Package' },
      { text: 'Bargains', value: 'Bargains' },
      { text: 'Newest', value: 'Newest' }
    ],
    isUpdated: false,
    formState: {
      title: null,
      openAt: null,
      closedAt: null,
      eventType: null
    },
    ignoreOpenedState: false,
    isSaving: false
  }),
  computed: {
    formEditable () {
      return (!this.eventOpen.status || (this.eventOpen.status && this.ignoreOpenedState)) && !this.isSaving
    },
    disabled () {
      return (!this.eventOpen.status || (this.eventOpen.status && this.ignoreOpenedState)) && this.isSaving
    },
    disabledIngoreButton () {
      return !this.eventOpen.status
    },
    durationText () {
      const dayFix = this.duration > 1 ? 'days' : 'day'
      return `${this.duration} ${dayFix}`
    }
  },
  watch: {
    'information.title': {
      handler (updated) {
        this.isUpdated = this.information_clone.title !== updated
      }
    },
    'information.openAt': {
      handler (updated) {
        this.isUpdated = this.information_clone.openAt !== updated
      }
    },
    'information.closedAt': {
      handler (updated) {
        this.isUpdated = this.information_clone.closedAt !== updated
      }
    },
    'information.eventType': {
      handler (updated) {
        const updatedString = [...updated].sort().toString()
        this.isUpdated = [...this.information_clone.eventType].sort().toString() !== updatedString
      }
    }
  },
  created () {},
  mounted () {
    if (this.isServerRender) {
      this.$nuxt.$emit('pageLoading', false)
    }
  },
  beforeDestroy () {},
  methods: {
    openDateDisabled (ymd, date) {
      const todayLastDay = dayjs().subtract(1, 'day').$d
      return !this.information.closedAt || this.information.closedAt === ''
        ? false
        : this.information.closedAt <= ymd || todayLastDay > date
    },
    closeDateDisabled (ymd, date) {
      return !this.information.openAt || this.information.openAt === ''
        ? false
        : new Date(this.information.openAt) > date
    },
    validateForm (isUpdated) {
      // formState: {
      //   title: null,
      //   openAt: null,
      //   closedAt: null,
      //   eventType: null
      // }
      if (!this.information.title) {
        this.formState.title = false
        return false
      }

      if (!this.eventOpen.status && this.information.openAt && isUpdated) {
        const isOpenDatePast = dayjs().isAfter(this.information.openAt, 'day')
        if (isOpenDatePast) {
          this.formState.openAt = false
          return false
        }

        if (this.information.closedAt && isUpdated) {
          const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
          dayjs.extend(isSameOrBefore)
          const isCloseDateFuture = dayjs(this.information.openAt).isSameOrBefore(this.information.closedAt, 'day')
          if (!isCloseDateFuture) {
            this.formState.closedAt = false
            return false
          }
        }

        const isToday = require('dayjs/plugin/isToday')
        dayjs.extend(isToday)
        const isOpenDateToday = dayjs(this.information.openAt).isToday()
        if (isOpenDateToday) {
          if (!this.information.closedAt) {
            this.formState.closedAt = false
            return false
          }

          if (!this.information.eventType.length) {
            this.formState.eventType = false
            return false
          }
        }
      }

      if (!this.eventOpen.status && isUpdated && (!this.information.openAt || this.information.openAt === '') && this.information.closedAt) {
        const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
        dayjs.extend(isSameOrAfter)
        const isCloseDatePast = dayjs().isSameOrAfter(this.information.closedAt, 'day')
        if (isCloseDatePast) {
          this.formState.closedAt = false
          return false
        }
      }

      if (this.information.openAt && this.information.closedAt) {
        const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
        dayjs.extend(isSameOrAfter)
        const isPassed = dayjs().isSameOrAfter(this.information.openAt, 'day')
        if (isPassed && !this.information.eventType.length) {
          this.formState.eventType = false
          return false
        }
      }
      return true
    },
    async save () {
      try {
        this.isSaving = true
        this.initializeFormState()
        const validated = this.validateForm(this.isUpdated)
        if (validated) {
          const updated = await this.$axios.put(`/api/event/${this.id}`, {
            data: {
              title: this.information.title,
              eventType: this.information.eventType,
              openAt: this.information.openAt,
              closedAt: this.information.closedAt
            }
          })
          const _event = updated.data.event
          const _info = {
            title: _event.title,
            openAt: !_event.openAt ? null : _event.openAt,
            closedAt: !_event.closedAt ? null : _event.closedAt,
            eventType: _event.eventType
          }
          this.information = _info
          this.information_clone = Object.assign({}, _info)
          this.eventOpen = generateEventDurationObject(_event.isOpened, _event.openAt)
          this.eventClose = generateEventDurationObject(_event.isClosed, _event.closedAt)
          this.eventDate = generateEventDate(_event.publishedAt, _event.modifiedAt)
          this.duration = _event.duration
          this.relative = _event.relative
        }
      } catch (err) {
        console.log('     ~ err => ', err)
      } finally {
        this.isSaving = false
      }
    },
    reset () {
      this.information = Object.assign({}, this.information_clone)
      this.initializeFormState()
    },
    initializeFormState () {
      this.formState = {
        title: null,
        openAt: null,
        closedAt: null,
        eventType: null
      }
    },
    ignoreOpened () {
      this.ignoreOpenedState = !this.ignoreOpenedState
    }
  }
}
</script>

<style>

</style>
