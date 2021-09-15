<template>
  <b-container fluid>
    <dash-header
      title="Event List"
      description="There are no open events."
    />
    </dash-header>
    <EventStatics />
    <b-row class="mb-4">
      <b-col cols>
        <dash-card title="Event Table - ToolBar" class="p-3" custom>
          <template #header-right>
            <div class="d-flex d-md-none justify-content-end justify-content-md-start align-items-center">
              <span class="d-none d-md-inline mr-2">Show</span>
              <b-form-select v-model="perPage" :options="perPageOpt" class="mr-1 w-auto" :disabled="globalDisabled" size="sm" />
            </div>
            <div class="d-none d-md-flex align-items-center justify-content-end">
              <b-overlay
                :show="tableToolBarDisabled"
                variant="light"
                :spinner-variant="isCreating ? 'primary' : isRefresh ? 'dark' : 'danger'"
                spinner-small
                :opacity="0.7"
                rounded
                class="w-100"
              >
                <b-btn-group class="w-100">
                  <b-btn
                    title="Add new Event"
                    variant="primary"
                    :disabled="globalDisabled"
                    @click="createNewEvent"
                  >
                    <b-icon icon="plus-circle-fill" scale="0.85" aria-hidden="true" shift-v="0" />
                  </b-btn>
                  <b-btn
                    title="Refresh Page"
                    variant="light"
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
                  <b-btn
                    title="Delete selected event rows"
                    variant="danger"
                    :disabled="globalDisabled || !selectedEvent.length"
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
                  <b-btn
                    title="Clear selected event rows"
                    variant="secondary"
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
                </b-btn-group>
              </b-overlay>
            </div>
          </template>
          <b-row align-v="center" class="mt-md-3" no-gutters>
            <b-col cols="12" md="6">
              <div class="d-none d-md-flex justify-content-end justify-content-md-start align-items-center">
                <span class="d-none d-md-inline mr-2">Show</span>
                <b-form-select v-model="perPage" :options="perPageOpt" class="mr-1 w-auto" :disabled="globalDisabled" />
              </div>
              <div class="d-flex d-md-none align-items-center justify-content-end mt-3 mb-2">
                <b-overlay
                  :show="tableToolBarDisabled"
                  variant="light"
                  :spinner-variant="isCreating ? 'primary' : isRefresh ? 'dark' : 'danger'"
                  spinner-small
                  :opacity="0.7"
                  rounded
                  class="w-100"
                >
                  <b-btn-group class="w-100">
                    <b-btn
                      title="Add new Event"
                      variant="primary"
                      :disabled="globalDisabled"
                      @click="createNewEvent"
                    >
                      <b-icon icon="plus-circle-fill" scale="0.85" aria-hidden="true" shift-v="0" />
                    </b-btn>
                    <b-btn
                      title="Refresh Page"
                      variant="light"
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
                    <b-btn
                      title="Delete selected event rows"
                      variant="danger"
                      :disabled="globalDisabled || !selectedEvent.length"
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
                    <b-btn
                      title="Clear selected event rows"
                      variant="secondary"
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
                  </b-btn-group>
                </b-overlay>
              </div>
            </b-col>
            <b-col cols="12" md="5" offset-md="1">
              <div class="d-flex align-items-center justify-content-end">
                <b-form-input
                  v-model="searchingTitle"
                  class="w-100 mr-2"
                  placeholder="Enter event title"
                  aria-label="Search"
                  :disabled="globalDisabled"
                  @keyup.enter="simpleSearch"
                />
                <b-btn v-b-toggle.collapse-1 variant="light" :disabled="globalDisabled">
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
        </dash-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col cols>
        <dash-card id="event-table" title="Event Table" table>
          <template #header-right>
            <b-pagination
              v-model="currentPage"
              :total-rows="totalEvent"
              :per-page="perPage"
              :disabled="globalDisabled"
              class="mb-0"
              size="sm"
            />
          </template>
          <b-collapse id="collapse-1">
            <Eventfilter :disabled="globalDisabled" @setSearchingState="getSearchingState" />
          </b-collapse>
          <b-row>
            <b-col cols>
              <b-table
                ref="eventTable"
                :busy="isSearching"
                :sort-by.sync="eventTableOpt.SortBy"
                :sort-desc.sync="eventTableOpt.SortDesc"
                :items="events"
                :fields="eventField"
                :per-page="perPage"
                :current-page="currentPage"
                select-mode="multi"
                head-variant="light"
                responsive
                hover
                show-empty
                selectable
                class="eventTable border-bottom"
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
                      <NuxtLink :to="{ name: 'eventDetails', params: { id: data.item._id } }" class="text-decoration-none text-gray-800">
                        {{ data.value }}
                      </NuxtLink>
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

                <template #cell(actions)="data">
                  <b-btn
                    :to="{ name: 'eventDetails', params: { id: data.item._id } }"
                    variant="link"
                    class="text-decoration-none mr-2 p-0 shadow-none"
                    :disabled="globalDisabled || data.item.isDeleting"
                  >
                    <b-icon icon="pencil-square" scale="1.0" class="icon-secondary" />
                  </b-btn>
                  <button-overlay
                    :show="data.item.isDeleting"
                    :button-ref="`btn-${data.item._id}-delete`"
                    spinner-variant="danger"
                    :disabled="globalDisabled || data.item.isDeleting"
                  >
                    <b-btn
                      :ref="`btn-${data.item._id}-delete`"
                      variant="link"
                      class="text-decoration-none p-0 shadow-none"
                      :disabled="globalDisabled || data.item.isDeleting"
                      @click="deleteEvent(data.item._id)"
                    >
                      <b-icon icon="trash" scale="1.0" class="icon-danger" />
                    </b-btn>
                  </button-overlay>
                </template>
              </b-table>
            </b-col>
          </b-row>
          <b-row align-h="center" no-gutters class="pb-3 px-3">
            <b-col>
              <b-pagination
                v-model="currentPage"
                :total-rows="totalEvent"
                :per-page="perPage"
                :disabled="globalDisabled"
                class="justify-content-center justify-content-md-end mb-0"
              />
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex"
import searchEvent from '~/mixins/event/searchEvent'
import computeScheduledEvent from '~/mixins/event/computeScheduledEvent'

export default {
  name: 'Events',
  components: {
    EventStatics: () => import('~/components/event/statics.vue'),
    Eventfilter: () => import('~/components/event/filter.vue')
  },
  mixins: [
    searchEvent,
    computeScheduledEvent
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
    isDeletingEvent: false,
    isRefresh: false,
    searchingTitle: null,
    selectedEvent: [],
    perPage: 15,
    currentPage: 1,
    perPageOpt: [
      { text: '15 events', value: 15 },
      { text: '30 events', value: 30 },
      { text: '45 events', value: 45 },
      { text: '100 events', value: 100 }
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
    ],
    contentHeaderDesc: null
  }),
  async fetch () {
    const querySet = {}
    if (this.$route.query.scheduled) {
      querySet.openAt = this.computeUpcomingDate(this.$route.query.scheduled)
    }
    const res = await this.$axios.$get('/api/event', { params: querySet })
    await this.$store.dispatch('events/DISPATCH_SET', res.list)
  },
  computed: {
    ...mapGetters({
      events: 'events/getEvents',
      totalEvent: 'events/getTotalEventCount'
    }),
    tableToolBarDisabled () {
      return this.isSearching || this.isCreating || this.isDeleting || this.isRefresh
    },
    globalDisabled () {
      return this.tableToolBarDisabled || this.isDeletingEvent
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
    async deleteEvent (id) {
      try {
        this.isDeletingEvent = true
        this.$store.commit('events/update', { id, content: { isDeleting: true } })
        this.$refs.eventTable.refresh()
        const deletedRes = await this.$axios.delete('/api/event/', {
          data: { single: true, deleting: id }
        })
        const { list } = deletedRes.data
        await this.$store.dispatch('events/DISPATCH_SET', list)
      } catch (err) {
        console.log(`            ~ err => `, err)
        console.log(`            ~ err.message => `, err.message)
      } finally {
        this.isDeletingEvent = false
      }
    },
    clearDeletingList () {
      this.selectedEvent = []
    },
    async refresh () {
      try {
        this.isRefresh = true
        const { list } = await this.$axios.$get('/api/event')
        this.$router.push({ name: 'eventsList' })
        await this.$store.dispatch('events/DISPATCH_SET', list)
        this.isRefresh = false
      } catch (err) {
        console.log(err)
      }
    },
    onRowSelected (items) {
      this.selectedEvent = items
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/custom/eventTable.scss';
</style>
