<template>
  <b-row>
    <b-col cols>
      <b-form
        :aria-disabled="disabled"
        class="p-3 mb-4 mx-3 border bg-light rounded"
        @submit.prevent="onSubmit"
        @reset="onReset"
      >
        <b-form-row>
          <b-col cols="12" md="4">
            <b-form-group
              id="filter-group-title"
              label="Title"
              label-for="filter-title"
            >
              <b-form-input
                id="filter-title"
                v-model="form.title"
                placeholder="Enter event title"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group
              id="filter-group-id"
              label="Id"
              label-for="filter-id"
            >
              <b-form-input
                id="filter-id"
                v-model="form.id"
                placeholder="Enter event id"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group
              id="filter-group-publishedAt"
              label="Published Date"
              label-for="filter-publishedAt"
            >
              <b-form-datepicker
                id="filter-publishedAt"
                v-model="form.publishedAt"
                boundary="window"
                no-close-on-select
                today-button
                reset-button
                :hide-header="true"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols="6">
            <b-form-group
              id="filter-group-open"
              label="Open Date"
              label-for="filter-open"
            >
              <b-form-datepicker
                id="filter-open"
                v-model="form.openAt"
                boundary="window"
                no-close-on-select
                today-button
                reset-button
                :hide-header="true"
                :date-disabled-fn="openDateDisabled"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              id="filter-group-close"
              label="Close Date"
              label-for="filter-close"
            >
              <b-form-datepicker
                id="filter-close"
                v-model="form.closedAt"
                boundary="window"
                no-close-on-select
                today-button
                reset-button
                :hide-header="true"
                :date-disabled-fn="closeDateDisabled"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols="12" md="4">
            <b-form-row class="align-items-end">
              <b-col cols>
                <b-form-group
                  id="filter-group-views"
                  label="Views"
                  label-for="filter-views"
                >
                  <b-form-spinbutton
                    id="filter-views"
                    v-model="form.views"
                    v-bind="formSpinBtnConfig"
                    :disabled="disabled"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="auto" class="mb-3">
                <b-form-select
                  id="filter-viewsCondition"
                  v-model="form.viewsCondition"
                  title="View Condition"
                  :options="viewsConditionSet"
                  :disabled="disabled"
                />
              </b-col>
            </b-form-row>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-row class="align-items-end">
              <b-col>
                <b-form-group
                  id="filter-group-bounce"
                  label="Bounce"
                  label-for="filter-bounce"
                >
                  <b-form-spinbutton
                    id="filter-bounce"
                    v-model="form.bounce"
                    v-bind="formSpinBtnConfig"
                    :disabled="disabled"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="auto" class="mb-3">
                <b-form-select
                  id="filter-bounceCondition"
                  v-model="form.bounceCondition"
                  title="Bounce Condition"
                  :options="bounceConditionSet"
                  :disabled="disabled"
                />
              </b-col>
            </b-form-row>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-row class="align-items-end">
              <b-col>
                <b-form-group
                  id="filter-group-sales"
                  label="Sales"
                  label-for="filter-sales"
                >
                  <b-form-spinbutton
                    id="filter-sales"
                    v-model="form.sales"
                    v-bind="formSpinBtnConfig"
                    :disabled="disabled"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="auto" class="mb-3">
                <b-form-select
                  id="filter-salesCondition"
                  v-model="form.salesCondition"
                  title="Sales Condition"
                  :options="salesConditionSet"
                  :disabled="disabled"
                />
              </b-col>
            </b-form-row>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols>
            <b-form-group
              id="filter-group-eventType"
              v-slot="{ ariaDescribedby }"
              label="Event Type"
              label-for="filter-eventType"
            >
              <b-form-checkbox-group
                id="filter-eventType"
                v-model="form.eventType"
                :options="eventTypeOpt"
                :aria-describedby="ariaDescribedby"
                name="filter-eventType-chckbx"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols class="text-right">
            <b-btn type="submit" variant="primary" :disabled="disabled" class="mr-2">
              Submit
            </b-btn>
            <b-btn type="reset" variant="danger" :disabled="disabled">
              Reset
            </b-btn>
          </b-col>
        </b-form-row>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import searchEvent from '~/mixins/event/searchEvent'
const conditionOpts = [
  { value: 'st', text: '>=' },
  { value: 'eq', text: '=' },
  { value: 'gt', text: '<=' }
]

const filterForm = {
  title: null,
  id: null,
  publishedAt: null,
  openAt: null,
  closedAt: null,
  views: 0,
  bounce: 0,
  sales: 0,
  viewsCondition: 'gt',
  bounceCondition: 'gt',
  salesCondition: 'gt',
  eventType: []
}

export default {
  name: 'EventFilter',
  mixins: [
    searchEvent
  ],
  props: {
    disabled: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    form: Object.assign({}, filterForm),
    viewsConditionSet: conditionOpts,
    bounceConditionSet: conditionOpts,
    salesConditionSet: conditionOpts,
    eventTypeOpt: [
      { text: 'Recommended', value: 'Recommended' },
      { text: 'Theme & Template', value: 'Theme & Template' },
      { text: 'Hottest', value: 'Hottest' },
      { text: 'Package', value: 'Package' },
      { text: 'Bargains', value: 'Bargains' },
      { text: 'Newest', value: 'Newest' }
    ],
    formSpinBtnConfig: {
      step: 25,
      min: 0,
      max: 1000,
      placeholder: "0"
    }
  }),
  methods: {
    async onSubmit () {
      try {
        const queryRes = await this.searchEvent(this.form)
        this.$store.dispatch('events/DISPATCH_SET', queryRes.list)
        this.$emit('setSearchingState', false)
      } catch (err) {
        console.log(`         ~ err => `, err)
      }
    },
    onReset () {
      this.form = Object.assign({}, filterForm)
    },
    openDateDisabled (ymd, date) {
      return !this.form.closedAt || this.form.closedAt === ''
        ? false
        : this.form.closedAt <= ymd
    },
    closeDateDisabled (ymd, date) {
      return !this.form.openAt || this.form.openAt === ''
        ? false
        : this.form.openAt > ymd
    }
  }
}
</script>

<style>

</style>
