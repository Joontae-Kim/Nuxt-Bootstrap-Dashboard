<template>
  <b-row>
    <b-col cols>
      <b-form
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
                v-model="form.open"
                boundary="window"
                no-close-on-select
                today-button
                reset-button
                :hide-header="true"
                :date-disabled-fn="openDateDisabled"
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
                v-model="form.closed"
                boundary="window"
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
          <b-col cols="12" md="4">
            <b-form-group
              id="filter-group-views"
              label="Views"
              label-for="filter-views"
            >
              <b-form-spinbutton
                id="filter-views"
                v-model="form.views"
                v-bind="formSpinBtnConfig"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group
              id="filter-group-bounce"
              label="Bounce"
              label-for="filter-bounce"
            >
              <b-form-spinbutton
                id="filter-bounce"
                v-model="form.bounce"
                v-bind="formSpinBtnConfig"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group
              id="filter-group-sales"
              label="Sales"
              label-for="filter-sales"
            >
              <b-form-spinbutton
                id="filter-sales"
                v-model="form.sales"
                v-bind="formSpinBtnConfig"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols class="text-right">
            <b-btn type="submit" variant="primary">
              Submit
            </b-btn>
            <b-btn type="reset" variant="danger">
              Reset
            </b-btn>
          </b-col>
        </b-form-row>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
const filterForm = {
  title: null,
  id: null,
  publishedAt: null,
  open: null,
  closed: null,
  views: null,
  bounce: null,
  sales: null
}

export default {
  name: 'EventFilter',
  data: () => ({
    form: Object.assign({}, filterForm),
    formSpinBtnConfig: {
      step: 25,
      min: "0",
      max: "1000",
      placeholder: "0"
    }
  }),
  methods: {
    onSubmit () {
      console.log(`onSubmit ~ `)
      // console.log(`         ~ `)
      console.log(`         ~ this.form => `, this.form)
    },
    onReset () {
      this.form = Object.assign({}, filterForm)
    },
    openDateDisabled (ymd, date) {
      return !this.form.closed || this.form.closed === ''
        ? false
        : this.form.closed <= ymd
    },
    closeDateDisabled (ymd, date) {
      return !this.form.open || this.form.open === ''
        ? false
        : this.form.open > ymd
    }
  }
}
</script>

<style>

</style>
