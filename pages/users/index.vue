<template>
  <b-container fluid>
    <UsersStatics class="mb-4" />
    <b-row>
      <b-col cols>
        <dash-card title="User Table" table>
          <template #header-right>
            <b-pagination
              v-model="currentPage"
              :total-rows="users.length"
              :per-page="perPage"
              :disabled="isTableBusy"
              class="mb-0"
              align="right"
              size="sm"
            />
          </template>
          <b-row class="px-3 mb-4" no-gutters align-v="center">
            <b-col cols md="6" class="mb-3 mb-md-0">
              <div class="d-flex align-items-center justify-content-end justify-content-md-start">
                <span class="mr-2 text-gray-700">Display</span>
                <b-form-select
                  v-model="perPage"
                  :options="perPageOpt"
                  class="mr-1 w-auto"
                  size="sm"
                  :disabled="isTableBusy"
                />
              </div>
            </b-col>
            <b-col cols md="6">
              <div class="d-flex align-items-center justify-content-end">
                <b-form-input
                  id="form-name-searching"
                  v-model="searchingUsername"
                  placeholder="Enter username"
                  aria-label="Search"
                  :disabled="globalDisabled || isSearchingUsername"
                  trim
                  class="w-100 w-md-50 mr-2"
                  @keyup.enter="simpleSearch"
                />
                <b-btn ref="btn-filter" v-b-toggle.collapse-filter variant="secondary" :disabled="globalDisabled || isSearchingUsername" class="mr-2">
                  <b-icon
                    icon="filter"
                    font-scale="0.95"
                    aria-hidden="true"
                    aria-label="Filter"
                    shift-v="2"
                  />
                </b-btn>
                <button-overlay
                  :show="isResetting"
                  button-ref="btn-reset"
                  :disabled="globalDisabled"
                  spinner-variant="danger"
                >
                  <b-btn ref="btn-reset" variant="danger" :disabled="globalDisabled" @click="refresh">
                    <b-icon
                      icon="arrow-clockwise"
                      font-scale="0.95"
                      aria-hidden="true"
                      aria-label="Refresh"
                      shift-v="2"
                    />
                  </b-btn>
                </button-overlay>
              </div>
            </b-col>
          </b-row>
          <b-collapse id="collapse-filter">
            <UsersFilter :disabled="globalDisabled" @setSearchingState="getSearchingState" @setResetFormState="getResetFormState" />
          </b-collapse>
          <b-row>
            <b-col cols>
              <b-table
                :items="users"
                :fields="userTableField"
                :sort-by.sync="userTableSortBy"
                :sort-desc.sync="userTablesortDesc"
                :per-page="perPage"
                :current-page="currentPage"
                head-variant="light"
                :busy="isTableBusy"
                :disabled="globalDisabled || isSearchingUsername"
                class="border-bottom"
                responsive
                show-empty
                hover
              >
                <template #table-busy>
                  <div class="text-center my-4">
                    <b-spinner class="align-middle" />
                    <strong v-show="isSearching || isSearchingUsername">Searching...</strong>
                    <strong v-show="isResetting || isResettingForm">Loading...</strong>
                  </div>
                </template>

                <template #cell(index)="data">
                  {{ data.index + 1 }}
                </template>

                <template #cell(username)="data">
                  <div class="">
                    <NuxtLink :to="{ name: 'userDetails', params: { id: data.item.uid } }" class="text-gray-900 text-decoration-none mr-2">
                      {{ data.value }}
                    </NuxtLink>
                    <b-badge class="small" pill>{{ data.item.status }}</b-badge>
                  </div>
                  <div class="text-gray-600">
                    <div class="small">{{ data.item.email }}</div>
                    <div class="small">{{ data.item.uid }}</div>
                  </div>
                </template>

                <template #cell(billing)="data">
                  <div>
                    Address: {{ data.item.address.full }}
                  </div>
                  <div>
                    Phone: {{ data.item.phone_number }}
                  </div>
                </template>

                <template #cell(payment)="data">
                  <template v-if="data.value">
                    <div>{{ data.value }}</div>
                    <div class="small">{{ data.item.credit_card.cc_number }}</div>
                  </template>
                </template>

                <template #cell(actions)="data">
                  <b-btn
                    :to="{ name: 'userDetails', params: { id: data.item.uid } }"
                    variant="link"
                    class="text-decoration-none mr-2 p-0 shadow-none"
                  >
                    <b-icon icon="pencil-square" scale="1.0" class="icon-secondary" />
                  </b-btn>
                </template>
              </b-table>
            </b-col>
          </b-row>
          <b-row class="pb-3 px-3">
            <b-col cols>
              <b-pagination
                v-model="currentPage"
                :total-rows="users.length"
                :per-page="perPage"
                :disabled="isTableBusy"
                class="mb-0 justify-content-center justify-content-md-end"
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
import searchUser from '~/mixins/user/searchUser'
import watchFetchStatePending from '~/mixins/watchFetchStatePending'

export default {
  name: 'UserIdx',
  components: {
    UsersStatics: () => import('~/components/users/statics'),
    UsersFilter: () => import('~/components/users/filter')
  },
  mixins: [
    searchUser,
    watchFetchStatePending
  ],
  provide () {
    return {
      parentRef: this.$refs
    }
  },
  layout: 'dashboard',
  data: () => ({
    searchingUsername: null,
    isSearchingUsername: false,
    isSearching: false,
    isResetting: false,
    isResettingForm: false,
    group: [
      { label: 'Active', variant: 'success' },
      { label: 'Inactive', variant: 'warning' },
      { label: 'Pending Approval', variant: 'primary' },
      { label: 'Not Yet Activated', variant: 'secondary' }
    ],
    currentPage: 1,
    perPage: 10,
    perPageOpt: [
      { text: '10 users', value: 10 },
      { text: '15 users', value: 15 },
      { text: '30 users', value: 30 },
      { text: '45 users', value: 45 },
      { text: '100 users', value: 100 }
    ],
    userTableSortBy: 'username',
    userTablesortDesc: true,
    userTableField: [
      {
        label: 'Index',
        key: 'index',
        sortable: true,
        thClass: '',
        tdClass: 'text-center text-gray-600'
      },
      {
        label: 'Id',
        key: 'id',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600'
      },
      {
        label: 'User',
        key: 'username',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-wrap'
      },
      {
        label: 'Billing Information',
        key: 'billing',
        sortable: true,
        thClass: 'text-nowrap w-50',
        tdClass: 'text-wrap text-gray-600'
      },
      {
        label: 'Payment',
        key: 'payment',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600'
      },
      {
        label: 'Authentication',
        key: 'authentication',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600'
      },
      {
        label: 'Actions',
        key: 'actions',
        sortable: false,
        thClass: 'text-center',
        tdClass: 'text-center'
      }
    ]
  }),
  async fetch () {
    const { list } = await this.$axios.$get('/api/users')
    await this.$store.dispatch('users/DISPATCH_SET', list)
  },
  computed: {
    ...mapGetters({
      users: 'users/getUsers'
    }),
    globalDisabled () {
      // return this.isSearching || this.isResetting
      return this.isSearching || this.isResetting || this.isSearchingUsername || this.isResettingForm
    },
    isTableBusy () {
      return this.isSearching || this.isResetting || this.isSearchingUsername || this.isResettingForm
    }
  },
  methods: {
    getResetFormState (state) {
      this.isResettingForm = state
    },
    getSearchingState (state) {
      this.isSearching = state
    },
    async simpleSearch () {
      try {
        this.isSearchingUsername = true
        const { list } = await this.searchUser({ username: this.searchingUsername })
        await this.$store.dispatch('users/DISPATCH_SET', list)
      } catch (err) {
        console.log(err)
      } finally {
        this.isSearchingUsername = false
      }
    },
    async refresh () {
      this.isResetting = true
      const { list } = await this.$axios.$get('/api/users')
      await this.$store.dispatch('users/DISPATCH_SET', list)
      this.isResetting = false
    }
  }
}
</script>

<style lang="scss">
</style>
