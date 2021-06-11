<template>
  <b-row>
    <b-col cols class="overflow-auto">
      <dash-card title="Relative Events" no-padding no-overflow table>
        <template #header-right>
          <div class="d-flex justify-content-end justify-content-md-start align-items-center">
            <span class="d-none d-md-block mr-2">Display</span>
            <b-form-select
              v-model="perPage"
              :options="perPageOpt"
              class="mr-1 w-auto"
              size="sm"
              :disabled="globalDisabled"
            />
            <b-btn v-b-toggle.collapse-filter variant="light" size="sm" :disabled="globalDisabled">
              <b-icon
                icon="filter"
                font-scale="0.95"
                aria-hidden="true"
                aria-label="Refresh"
                shift-v="2"
              />
            </b-btn>
          </div>
        </template>
        <b-collapse id="collapse-filter">
          <b-row no-gutters>
            <b-col cols>
              <b-form
                :disabled="globalDisabled"
                class="p-3 mb-4 mx-3 border bg-light rounded"
                @submit.prevent="onSubmit"
                @reset="onReset"
              >
                <b-form-row>
                  <b-col cols="12" md="6">
                    <b-form-group
                      id="filter-group-title"
                      label="Title"
                      label-for="filter-title"
                    >
                      <b-form-input
                        id="filter-title"
                        v-model="form.title"
                        placeholder="Enter event title"
                        :disabled="globalDisabled"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="6">
                    <b-form-group
                      id="filter-group-id"
                      label="Id"
                      label-for="filter-id"
                    >
                      <b-form-input
                        id="filter-id"
                        v-model="form.id"
                        placeholder="Enter event id"
                        :disabled="globalDisabled"
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
                        :disabled="globalDisabled"
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
                        :disabled="globalDisabled"
                      />
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols="12" md="6">
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
                            :disabled="globalDisabled"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col cols="auto" class="mb-3">
                        <b-form-select
                          id="filter-viewsCondition"
                          v-model="form.viewsCondition"
                          title="View Condition"
                          :options="viewsConditionSet"
                          :disabled="globalDisabled"
                        />
                      </b-col>
                    </b-form-row>
                  </b-col>
                  <b-col cols="12" md="6">
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
                            :disabled="globalDisabled"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col cols="auto" class="mb-3">
                        <b-form-select
                          id="filter-salesCondition"
                          v-model="form.salesCondition"
                          title="Sales Condition"
                          :options="salesConditionSet"
                          :disabled="globalDisabled"
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
                        :disabled="globalDisabled"
                      />
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols class="text-right">
                    <button-overlay :show="isSearching" button-ref="saveButton">
                      <b-btn type="submit" variant="primary" :disabled="globalDisabled" class="mr-2">
                        Submit
                      </b-btn>
                    </button-overlay>
                    <b-btn type="reset" variant="danger" :disabled="globalDisabled">
                      Reset
                    </b-btn>
                  </b-col>
                </b-form-row>
              </b-form>
            </b-col>
          </b-row>
        </b-collapse>
        <b-row no-gutters>
          <b-col cols>
            <b-table
              ref="relTable"
              :busy="isSearching || isGenerating"
              :sort-by.sync="relTableOpt.SortBy"
              :sort-desc.sync="relTableOpt.SortDesc"
              :items="relEvents"
              :per-page="perPage"
              :current-page="currentPage"
              :fields="eventField"
              select-mode="multi"
              head-variant="light"
              responsive
              hover
              show-empty
              selectable
              class="eventTable border-bottom"
            >
              <template #table-busy>
                <div class="text-center my-4">
                  <b-spinner class="align-middle" />
                  <strong v-show="isSearching">Searching...</strong>
                  <strong v-show="isGenerating">Loading...</strong>
                </div>
              </template>

              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>

              <template #cell(title)="data">
                <div class="h6 mb-2">
                  <div class="text-gray-700 mb-1">
                    {{ data.value }}
                  </div>
                  <div class="text-gray-600 small">
                    <div>{{ data.item._id }}</div>
                  </div>
                </div>
                <div class="mb-3">
                  <b-badge
                    v-for="label in data.item.eventType"
                    :key="`event-${data.index}-label-${label}`"
                    class="mr-1 mb-1 px-2 py-1"
                    variant="secondary"
                    pill
                  >
                    {{ label }}
                  </b-badge>
                </div>
                <div class="text-gray-600 small mt-3">
                  <div>Created at {{ data.item.publishedAt }}</div>
                </div>
              </template>

              <template #cell(openAt)="data">
                {{ data.value || '-' }}
              </template>

              <template #cell(closedAt)="data">
                {{ data.value || '-' }}
              </template>

              <template #cell(sales)="data">
                $ {{ data.value }}
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-row no-gutters class="px-3">
          <b-col cols class="d-flex justify-content-end">
            <b-pagination
              v-model="currentPage"
              :total-rows="getRelativeCount"
              :per-page="perPage"
              :disabled="globalDisabled"
            />
          </b-col>
        </b-row>
      </dash-card>
    </b-col>
  </b-row>
</template>

<script>
import searchEvent from '~/mixins/event/searchEvent'
import { transformMultiEvent } from '~/lib/event.lib'

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
  sales: 0,
  viewsCondition: 'gt',
  salesCondition: 'gt',
  eventType: []
}

export default {
  name: "RelativeEvents",
  mixins: [
    searchEvent
  ],
  props: {
    relatives: {
      type: Array,
      required: true,
      default: (relProps) => {
        return typeof relProps === 'undefined' ? [] : relProps
      }
    },
    types: {
      type: Array,
      required: true,
      default: (typesProps) => {
        return typeof typesProps === 'undefined' ? [] : typesProps
      }
    }
  },
  data: () => ({
    isGenerating: false,
    isSearching: false,
    form: Object.assign({}, filterForm),
    viewsConditionSet: conditionOpts,
    salesConditionSet: conditionOpts,
    eventTypeOpt: [
      { text: 'Recommended', value: 'Recommended', disabled: true },
      { text: 'Theme & Template', value: 'Theme & Template', disabled: true },
      { text: 'Hottest', value: 'Hottest', disabled: true },
      { text: 'Package', value: 'Package', disabled: true },
      { text: 'Bargains', value: 'Bargains', disabled: true },
      { text: 'Newest', value: 'Newest', disabled: true }
    ],
    formSpinBtnConfig: {
      step: 25,
      min: 0,
      max: 1000,
      placeholder: "0"
    },
    relEvents: [],
    relTableOpt: {
      SortBy: 'openAt',
      SortDesc: true
    },
    perPage: 10,
    perPageOpt: [
      { text: '10 events', value: 10 },
      { text: '15 events', value: 15 },
      { text: '30 events', value: 30 },
      { text: '45 events', value: 45 },
      { text: '100 events', value: 100 }
    ],
    currentPage: 1,
    eventField: [
      {
        label: 'Index',
        key: 'index',
        sortable: true,
        thClass: '',
        tdClass: 'text-center'
      },
      {
        label: 'Title',
        key: 'title',
        sortable: true,
        thClass: '',
        tdClass: 'eventTable__column-title align-middle w-50'
      },
      {
        label: 'Open',
        key: 'openAt',
        sortable: true,
        thClass: '',
        tdClass: 'align-middle text-gray-700 text-nowrap'
      },
      {
        label: 'Close',
        key: 'closedAt',
        sortable: true,
        thClass: '',
        tdClass: 'align-middle text-gray-700 text-nowrap'
      },
      {
        label: 'Views',
        key: 'views',
        sortable: true,
        thClass: '',
        tdClass: 'align-middle text-gray-700'
      },
      {
        label: 'Sales',
        key: 'sales',
        sortable: true,
        thClass: 'pr-4',
        tdClass: 'align-middle text-gray-700'
      }
    ]
  }),
  computed: {
    getRelativeCount () {
      return this.relEvents.length
    },
    globalDisabled () {
      return this.isSearching || this.isGenerating
    }
  },
  watch: {},
  async created () {
    await this.transformReletives()
    this.form.eventType = this.types
  },
  mounted () {},
  methods: {
    async transformReletives () {
      try {
        this.isGenerating = true
        this.relEvents = !this.relatives.length ? [] : await transformMultiEvent(this.relatives)
      } catch (err) {
        console.log(err)
      } finally {
        this.isGenerating = false
      }
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
    },
    async onSubmit () {
      try {
        this.isSearching = true
        const queryRes = await this.searchEvent(this.form)
        this.relEvents = !queryRes.list.length ? [] : await transformMultiEvent(queryRes.list)
      } catch (err) {
        console.log(`         ~ err => `, err)
      } finally {
        this.isSearching = false
      }
    },
    async onReset () {
      this.form = Object.assign({}, filterForm)
      await this.transformReletives()
      this.form.eventType = this.types
    }
  }
}
</script>

<style>

</style>
