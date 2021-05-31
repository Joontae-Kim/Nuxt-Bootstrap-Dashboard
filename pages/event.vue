<template>
  <b-container fluid>
    <b-row class="mb-2">
      <b-col cols>
        <dash-card :use-title="false" class="p-3">
          <b-row align-v="center">
            <b-col cols>
              <b-btn title="Add new Event" variant="primary" :disabled="isSearching">
                <b-icon icon="plus-circle-fill" scale="0.85" aria-hidden="true" shift-v="0" class="mr-2" />
                <span>Add Event</span>
              </b-btn>
            </b-col>
            <b-col cols>
              <div class="d-flex align-items-center justify-content-end">
                <b-btn class="mr-2" variant="light" :disabled="isSearching">
                  <b-icon
                    icon="arrow-clockwise"
                    font-scale="0.95"
                    aria-hidden="true"
                    aria-label="Refresh"
                    shift-v="2"
                  />
                </b-btn>
                <b-btn variant="danger" :disabled="isSearching">
                  <b-icon icon="trash" font-scale="0.9" aria-hidden="true" aria-label="Delete selected event" shift-v="2" />
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
                :sort-by.sync="eventTableOpt.SortBy"
                :sort-desc.sync="eventTableOpt.SortDesc"
                :items="events"
                :fields="eventField"
                head-variant="light"
                responsive
                hover
                show-empty
                class="eventTable"
                :busy="isSearching"
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
                  <div class="h6 mb-3">
                    <div class="text-gray-700 mb-1">
                      {{ data.value }}
                    </div>
                    <div class="text-gray-600 small">
                      <div>{{ data.item._id }}</div>
                    </div>
                  </div>
                  <div class="text-gray-600 small mt-3">
                    <div>Created at {{ data.item.publishedAt }}</div>
                  </div>
                </template>

                <template #cell(duration)="data">
                  {{ data.item.openAt }} / {{ data.item.closedAt }}
                </template>

                <template #cell(sales)="data">
                  $ {{ data.value }}
                </template>

                <template #cell(bounce)="data">
                  {{ data.value }} %
                </template>

                <template #cell(actions)>
                  <b-btn variant="link" class="text-decoration-none p-0 mr-2 shadow-none">
                    <b-icon icon="trash" scale="1.0" class="icon-danger" />
                  </b-btn>
                  <b-btn variant="link" class="text-decoration-none p-0 shadow-none">
                    <b-icon icon="pencil-square" scale="1.0" class="icon-secondary" />
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
  layout: 'dashboard',
  data: () => ({
    isSearching: false,
    searchingTitle: null,
    selected: 15,
    options: [
      { text: 15, value: 15 },
      { text: 30, value: 30 },
      { text: 45, value: 45 },
      { text: 100, value: 100 }
    ],
    eventTableOpt: {
      SortBy: 'sales',
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
    await this.$store.dispatch('events/DISPATCH_ADD', res.list)
  },
  computed: {
    ...mapGetters({
      events: 'events/getEvents'
    })
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
    async simpleSearch () {
      try {
        this.isSearching = true
        const searchRes = await this.searchEvent({ title: this.searchingTitle })
        this.$store.dispatch('events/DISPATCH_SET', searchRes.list)
      } catch (err) {
        console.log(err)
      } finally {
        this.isSearching = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/custom/eventTable.scss';
</style>
