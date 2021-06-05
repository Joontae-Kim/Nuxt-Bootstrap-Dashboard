<template>
  <b-container fluid>
    <event-status
      v-bind="{ eventDate }"
      :open="eventOpen"
      :close="eventClose"
      class="mb-4"
    />
    <b-row>
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
                  <b-col cols="12" md="6">
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
                        :disabled="eventOpen.status"
                        no-close-on-select
                        today-button
                        reset-button
                        :hide-header="true"
                        :date-disabled-fn="openDateDisabled"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="6">
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
                        :disabled="eventOpen.status"
                        no-close-on-select
                        today-button
                        reset-button
                        :hide-header="true"
                        :date-disabled-fn="closeDateDisabled"
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
                <b-form-row>
                  <b-col cols class="text-right">
                    <b-btn variant="dark" :disabled="disabledIngoreButton" @click="ignoreOpened">Ignore Already opened</b-btn>
                    <b-btn variant="danger" :disabled="!isUpdated || disabled" @click="reset">Reset</b-btn>
                    <b-btn variant="primary" :disabled="!isUpdated || disabled" @click="save">Save</b-btn>
                  </b-col>
                </b-form-row>
              </b-form>
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols>
        views <pre>{{ views }}</pre>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols>
        bounce <pre>{{ bounce }}</pre>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols>
        sales <pre>{{ sales }}</pre>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols>
        relative <pre>{{ relative }}</pre>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import dayjs from "dayjs"

export default {
  name: 'EventDetailed',
  layout: 'dashboard',
  middleware: [
    'check-renderer'
  ],
  async asyncData ({ params, $axios, renderServer }) {
    try {
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
        event: res.event,
        id: event._id,
        information: info,
        information_clone: Object.assign({}, info),
        eventOpen: {
          date: dayjs(info.openAt).format('YYYY-MM-DD'),
          status: event.isOpened,
          days: !event.openAt ? 0 : dayjs(new Date()).diff(event.openAt, 'day')
        },
        eventClose: {
          date: dayjs(info.closedAt).format('YYYY-MM-DD'),
          status: event.isClosed,
          days: !event.closedAt ? 0 : dayjs(new Date()).diff(event.closedAt, 'day')
        },
        eventDate: {
          publishedAt: dayjs(event.publishedAt).format('YYYY-MM-DD hh:mm'),
          modifiedAt: dayjs(event.modifiedAt).format('YYYY-MM-DD hh:mm')
        },
        duration: event.duration,
        views: event.views,
        bounce: event.bounce,
        sales: event.sales,
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
    bounce: [],
    sales: [],
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
        this.isUpdated = this.information_clone.eventType !== updated
      }
    }
    // openBadgeText () {
    //   const status = null
    //   const days = null
    // }
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

      if (this.information.openAt && this.information.closedAt && !this.information.eventType.length) {
        this.formState.eventType = false
        return false
      }
    },
    save () {
      console.log('save ~ ')
      // console.log('     ~ ')
      this.initializeFormState()
      console.log('     ~ this.information => ', this.information)
      const validated = this.validateForm(this.isUpdated)
      console.log('     ~ validated => ', validated)
      if (validated) {
        console.log(`     ~ this.information => `, this.information)
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
