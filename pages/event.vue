<template>
  <b-container fluid>
    <b-row class="mb-2">
      <b-col cols>
        <dash-card :use-title="false" class="p-3">
          <b-row align-v="center">
            <b-col cols>
              <button-overlay class="d-none d-md-inline-block" :show="isCreating" button-ref="createBtn">
                <b-btn
                  ref="createBtn"
                  title="Add new Event"
                  variant="primary"
                  :disabled="globalDisabled"
                  @click="createNewEvent"
                >
                  <b-icon icon="plus-circle-fill" scale="0.85" aria-hidden="true" shift-v="0" class="mr-2" />
                  <span>Add Event</span>
                </b-btn>
              </button-overlay>
              <button-overlay class="d-inline-block d-md-none" :show="isCreating" button-ref="createBtn-xs">
                <b-btn
                  ref="createBtn-xs"
                  title="Add new Event"
                  variant="primary"
                  size="sm"
                  :disabled="globalDisabled"
                  @click="createNewEvent"
                >
                  <b-icon icon="plus-circle-fill" scale="0.85" aria-hidden="true" shift-v="0" class="mr-2" />
                  <span>Add Event</span>
                </b-btn>
              </button-overlay>
            </b-col>
            <b-col cols>
              <div class="d-flex align-items-center justify-content-end">
                <b-btn
                  title="Refresh Page"
                  class="d-inline-block d-md-none mr-2"
                  variant="light"
                  size="sm"
                  :disabled="globalDisabled"
                  @click="refresh"
                >
                  <b-icon
                    icon="arrow-clockwise"
                    font-scale="0.95"
                    aria-hidden="true"
                    aria-label="Refresh"
                    shift-v="2"
                  />
                </b-btn>
                <b-btn title="Refresh Page" class="d-none d-md-inline-block mr-2" variant="light" :disabled="globalDisabled" @click="refresh">
                  <b-icon
                    icon="arrow-clockwise"
                    font-scale="0.95"
                    aria-hidden="true"
                    aria-label="Refresh"
                    shift-v="2"
                  />
                </b-btn>
                <button-overlay :show="isDeleting" button-ref="deleteAllBtn" class="d-none d-md-inline-block" spinner-variant="danger">
                  <b-btn
                    ref="deleteAllBtn"
                    title="Delete selected event rows"
                    variant="danger"
                    :disabled="globalDisabled || !selectedEvent.length"
                    class="mr-2"
                    @click="deleteAll"
                  >
                    <b-iconstack font-scale="0.8" shift-v="6" class="mr-1">
                      <b-icon stacked icon="layout-three-columns" rotate="90" />
                      <b-icon stacked icon="circle-fill" shift-v="-8" shift-h="6" />
                      <b-icon
                        stacked
                        icon="check"
                        shift-v="-8"
                        shift-h="6"
                        variant="danger"
                      />
                    </b-iconstack>
                    <b-icon icon="trash" aria-hidden="true" aria-label="Delete selected event" />
                  </b-btn>
                </button-overlay>
                <button-overlay :show="isDeleting" button-ref="deleteAllBtn-xs" class="d-inline-block d-md-none" spinner-variant="danger">
                  <b-btn
                    ref="deleteAllBtn-xs"
                    title="Delete selected event rows"
                    variant="danger"
                    size="sm"
                    :disabled="globalDisabled || !selectedEvent.length"
                    class="mr-2"
                    @click="deleteAll"
                  >
                    <b-iconstack font-scale="0.8" shift-v="6" class="mr-1">
                      <b-icon stacked icon="layout-three-columns" rotate="90" />
                      <b-icon stacked icon="circle-fill" shift-v="-8" shift-h="6" />
                      <b-icon
                        stacked
                        icon="check"
                        shift-v="-8"
                        shift-h="6"
                        variant="danger"
                      />
                    </b-iconstack>
                    <b-icon icon="trash" aria-hidden="true" aria-label="Delete selected event" />
                  </b-btn>
                </button-overlay>
                <b-btn
                  title="Clear selected event rows"
                  variant="secondary"
                  class="d-none d-md-inline-block"
                  :disabled="globalDisabled || !selectedEvent.length"
                  @click="clearDeletingList"
                >
                  <b-icon
                    icon="layout-three-columns"
                    rotate="90"
                    font-scale="0.99"
                    aria-hidden="true"
                    aria-label="Clear selected event rows"
                    shift-v="2"
                  />
                </b-btn>
                <b-btn
                  title="Clear selected event rows"
                  variant="secondary"
                  class="d-inline-block d-md-none"
                  size="sm"
                  :disabled="globalDisabled || !selectedEvent.length"
                  @click="clearDeletingList"
                >
                  <b-icon
                    icon="layout-three-columns"
                    rotate="90"
                    font-scale="0.99"
                    aria-hidden="true"
                    aria-label="Clear selected event rows"
                    shift-v="2"
                  />
                </b-btn>
              </div>
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col cols>
        <dash-card id="event-table" :use-title="false" no-padding no-overflow>
          <b-row align-v="center" class="flex-column flex-md-row mt-3 mb-4 px-3">
            <b-col cols class="mb-3 mb-md-0">
              <div class="d-flex justify-content-end justify-content-md-start align-items-center">
                <span class="mr-2">Display</span>
                <b-form-select v-model="selected" :options="options" class="mr-1 w-auto" size="sm" :disabled="isSearching" />
                <span>events</span>
              </div>
            </b-col>
            <b-col cols>
              <div class="d-flex align-items-center justify-content-end">
                <b-form-input
                  v-model="searchingTitle"
                  class="w-100 w-md-50 mr-2"
                  placeholder="Enter event title"
                  aria-label="Search"
                  :disabled="isSearching"
                  @keyup.enter="simpleSearch"
                />
                <!-- @keyup.enter="" -->
                <b-btn v-b-toggle.collapse-1 variant="light" :disabled="isSearching">
                  <b-icon
                    icon="filter"
                    font-scale="0.95"
                    aria-hidden="true"
                    aria-label="Refresh"
                    shift-v="2"
                  />
                </b-btn>
              </div>
            </b-col>
          </b-row>
          <b-collapse id="collapse-1">
            <event-filter @setSearchingState="getSearchingState" />
          </b-collapse>
          <b-row>
            <b-col cols class="overflow-auto">
              <b-table
                :busy="isSearching"
                :sort-by.sync="eventTableOpt.SortBy"
                :sort-desc.sync="eventTableOpt.SortDesc"
                :items="events"
                :fields="eventField"
                select-mode="multi"
                head-variant="light"
                responsive
                hover
                show-empty
                selectable
                class="eventTable"
                @row-selected="onRowSelected"
              >
                <template #table-busy>
                  <div class="text-center my-4">
                    <b-spinner class="align-middle" />
                    <strong>Loading...</strong>
                  </div>
                </template>

                <template #empty="scope">
                  <div class="mt-3 mb-1 text-gray-600 text-center">{{ scope.emptyText }}</div>
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

                <template #cell(bounce)="data">
                  {{ data.value }} %
                </template>

                <template #cell(actions)>
                  <b-btn variant="link" class="text-decoration-none mr-2 `p-0 shadow-none">
                    <b-icon icon="pencil-square" scale="1.0" class="icon-secondary" />
                  </b-btn>
                  <b-btn variant="link" class="text-decoration-none p-0 shadow-none">
                    <b-icon icon="trash" scale="1.0" class="icon-danger" />
                  </b-btn>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols>
        {{ events }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex"
import searchEvent from '~/mixins/event/searchEvent'

export default {
  name: 'Event',
  mixins: [
    searchEvent
  ],
  provide () {
    return {
      parentRef: this.$refs
    }
  },
  layout: 'dashboard',
  data: () => ({
    isSearching: false,
    isCreating: false,
    isDeleting: false,
    searchingTitle: null,
    selectedEvent: [],
    selected: 15,
    options: [
      { text: 15, value: 15 },
      { text: 30, value: 30 },
      { text: 45, value: 45 },
      { text: 100, value: 100 }
    ],
    eventTableOpt: {
      SortBy: 'openAt',
      SortDesc: true
    },
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
        tdClass: 'eventTable__column-title align-middle'
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
        label: 'Bounce',
        key: 'bounce',
        sortable: true,
        thClass: '',
        tdClass: 'align-middle text-gray-700'
      },
      {
        label: 'Sales',
        key: 'sales',
        sortable: true,
        thClass: '',
        tdClass: 'align-middle text-gray-700'
      },
      {
        label: 'Actions',
        key: 'actions',
        sortable: false,
        thClass: 'text-center',
        tdClass: 'w-50 align-middle text-center'
      }
    ]
  }),
  async fetch () {
    const res = await this.$axios.$get('/api/event')
    await this.$store.dispatch('events/DISPATCH_SET', res.list)
  },
  computed: {
    ...mapGetters({
      events: 'events/getEvents'
    }),
    globalDisabled () {
      return this.isSearching || this.isCreating || this.isDeleting
    }
  },
  watch: {
    '$fetchState.pending': {
      immediate: true,
      handler (state) {
        if (typeof state !== 'undefined') {
          this.$nuxt.$emit('pageLoading', state)
        }
      }
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {
    this.$store.commit('events/add', null)
  },
  methods: {
    getSearchingState (state) {
      this.isSearching = state
    },
    async createNewEvent () {
      this.isCreating = true
      const newEventRes = await this.$axios.post('/api/event', {
        title: 'new Bootstrap Event'
      })
      const { list } = newEventRes.data
      this.eventTableOpt.SortBy = null
      this.$store.dispatch('events/DISPATCH_SET', list)
      this.isCreating = false
    },
    async simpleSearch () {
      try {
        this.isSearching = true
        const searchRes = await this.searchEvent({ title: this.searchingTitle })
        await this.$store.dispatch('events/DISPATCH_SET', searchRes.list)
      } catch (err) {
        console.log(err)
      } finally {
        this.isSearching = false
      }
    },
    async deleteAll () {
      try {
        this.isDeleting = true
        if (this.selectedEvent.length) {
          const deletingEvent = this.selectedEvent.map(event => event._id)
          const deletedRes = await this.$axios.delete('/api/event/', {
            data: { single: false, deleting: deletingEvent }
          })
          const { list } = deletedRes.data
          await this.$store.dispatch('events/DISPATCH_SET', list)
        }
      } catch (err) {
        console.log(`          ~ err => `, err)
        console.log(`          ~ err.message => `, err.message)
      } finally {
        this.isDeleting = false
      }
    },
    clearDeletingList () {
      this.selectedEvent = []
    },
    onHidden (refName) {
      // Return focus to the button once hidden
      this.$refs[refName].focus()
    },
    async refresh () {
      await this.$fetch()
    },
    onRowSelected (items) {
      this.selectedEvent = items
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/custom/eventTable.scss';
</style>
