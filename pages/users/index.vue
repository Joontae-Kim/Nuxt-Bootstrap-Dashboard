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
              :disabled="globalDisabled"
              class="mb-0"
              align="right"
              size="sm"
            />
          </template>
          <b-row class="px-3 pb-3" no-gutters align-v="center">
            <b-col cols md="6">
              <span class="d-none d-md-inline mr-2">Display</span>
              <b-form-select
                v-model="perPage"
                :options="perPageOpt"
                class="mr-1 w-auto"
                size="sm"
                :disabled="globalDisabled"
              />
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
                <button-overlay
                  :show="isSearching"
                  button-ref="btn-filter"
                  :disabled="isSearching"
                >
                  <b-btn ref="btn-filter" v-b-toggle.collapse-filter variant="light" :disabled="globalDisabled || isSearchingUsername" class="mr-2">
                    <b-icon
                      icon="filter"
                      font-scale="0.95"
                      aria-hidden="true"
                      aria-label="Filter"
                      shift-v="2"
                    />
                  </b-btn>
                </button-overlay>
                <button-overlay
                  :show="isResetting"
                  button-ref="btn-reset"
                  :disabled="globalDisabled"
                >
                  <b-btn ref="btn-reset" variant="light" :disabled="globalDisabled" @click="refresh">
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
                responsive
                hover
                show-empty
                selectable
                :busy="isTableBusy"
                :disabled="globalDisabled || isSearchingUsername"
                class="border-bottom"
              >
                <template #table-busy>
                  <div class="text-center my-4">
                    <b-spinner class="align-middle" />
                    <strong v-show="isSearching || isSearchingUsername">Searching...</strong>
                    <strong v-show="isResetting">Loading...</strong>
                  </div>
                </template>

                <template #cell(index)="data">
                  {{ data.index + 1 }}
                </template>

                <template #cell(username)="data">
                  <div class="">
                    <span class="text-gray-900 mr-2">{{ data.value }}</span>
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
              </b-table>
            </b-col>
          </b-row>
          <b-row class="pb-3 px-3">
            <b-col cols>
              <b-pagination
                v-model="currentPage"
                :total-rows="users.length"
                :per-page="perPage"
                :disabled="globalDisabled"
                class="mb-0"
                align="right"
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

export default {
  name: 'UserIdx',
  components: {
    UsersStatics: () => import('~/components/users/statics')
  },
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
        thClass: 'text-wrap',
        tdClass: 'text-wrap text-gray-600'
      },
      {
        label: 'Payment (credit card)',
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
      return this.isSearching || this.isResetting
    },
    isTableBusy () {
      return this.isSearching || this.isResetting || this.isSearchingUsername
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
  methods: {
    simpleSearch () {
      this.isSearchingUsername = true
      this.isSearchingUsername = false
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
// .userGroup {
//   cursor: pointer;

//   &__ele {
//     color: #6c757d;
//     &:hover .userGroup__label,
//     &.active .userGroup__label {
//       color: #343a40 !important;
//     }
//   }

//   &__icon {
//     width: .5rem;
//     height: .5rem;
//     border: 2px solid;
//     border-radius: 50%;
//     vertical-align: 1px;
//   }

//   &__label {
//     color: #6c757d;
//   }
// }
</style>
