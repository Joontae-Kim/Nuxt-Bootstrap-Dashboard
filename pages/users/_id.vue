<template>
  <b-container fluid>
    <b-row class="mb-4">
      <b-col cols>
        <dash-card :use-title="false" :useicon="false" class="pb-3">
          <b-row class="py-2">
            <b-col cols md="3" lg="2" class="d-flex justify-content-center mb-3 my-md-auto">
              <div style="max-width: 6.5rem;">
                <b-img-lazy
                  :src="information.avatar"
                  :alt="information.username.full"
                  rounded="circle"
                  thumbnail
                  fluid
                  center
                />
              </div>
            </b-col>
            <b-col cols md>
              <div class="d-flex flex-column h-100">
                <div class="d-flex align-items-center mb-2">
                  <h4 class="d-inline-block mr-0 mr-md-3">{{ information.username.full }}</h4>
                  <b-badge pill :variant="statusVariant[information.status]" class="ml-auto ml-md-0 text-white">{{ information.status }}</b-badge>
                </div>
                <b-row class="flex-column mt-auto mb-2 m-md-0" no-gutters>
                  <b-col cols md="5" class="d-flex justify-content-between mb-1 mb-md-0">
                    <div class="font-weight-normal text-gray-700 font-italic">Last Signed-in</div>
                    <div class="text-gray-600 font-italic"> {{ information.lastSignedin }} </div>
                  </b-col>
                  <b-col cols md="5" class="d-flex justify-content-between mb-1 mb-md-0">
                    <div class="font-weight-normal text-gray-700 font-italic">Created</div>
                    <div class="text-gray-600 font-italic"> {{ information.createdAt }} </div>
                  </b-col>
                  <b-col cols md="5" class="d-flex justify-content-between mb-1 mb-md-0">
                    <div class="font-weight-normal text-gray-700 font-italic">Modified</div>
                    <div class="text-gray-600 font-italic"> {{ information.modifiedAt }} </div>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col cols md="auto">
              <b-row class="flex-md-column justify-content-between h-100">
                <b-col cols="4" md="auto">
                  <b-btn class="d-block" variant="secondary" size="sm" block>Edit Profile</b-btn>
                </b-col>
                <b-col cols="4" md="auto">
                  <template v-if="needApproval">
                    <b-btn class="d-block my-auto" variant="primary" size="sm" block>Approve</b-btn>
                  </template>
                  <template v-else>
                    <b-btn class="d-block my-auto" variant="warning" size="sm" block>Block</b-btn>
                  </template>
                </b-col>
                <b-col cols="4" md="auto">
                  <b-btn class="d-block" variant="danger" size="sm" block>Delete</b-btn>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col cols md="4" class="mb-3 mb-md-0">
        <dash-card
          title="Information"
          icon="info-circle-fill"
          custom
        >
          <b-row>
            <b-col cols>
              <b-row no-gutters :class="informationClass.titleRow">
                <b-col cols="6">
                  <p :class="informationClass.titlePtag">Authentication</p>
                  <div>{{ information.authentication }}</div>
                </b-col>
                <b-col cols="6">
                  <p :class="informationClass.titlePtag">Full Name</p>
                  <div>{{ information.username.full }}</div>
                </b-col>
              </b-row>
              <b-row no-gutters :class="informationClass.titleRow">
                <b-col cols="6"><p :class="informationClass.titlePtag">Date of Birth</p></b-col>
                <b-col col><div>{{ information.date_of_birth }}</div></b-col>
              </b-row>
              <b-row no-gutters :class="informationClass.titleRow">
                <b-col cols="6">
                  <p :class="informationClass.titlePtag">Mobile</p>
                  <div>{{ information.phone_number }}</div>
                </b-col>
                <b-col cols="6">
                  <p :class="informationClass.titlePtag">Email</p>
                  <div>{{ information.email }}</div>
                </b-col>
              </b-row>
              <b-row no-gutters class="">
                <b-col cols="12"><p :class="informationClass.titlePtag">Location</p></b-col>
                <b-col cols="12"><div>{{ information.address.full }}</div></b-col>
              </b-row>
            </b-col>
          </b-row>
        </dash-card>
      </b-col>
      <b-col cols md="8" class="d-flex flex-column">
        <b-row class="flex-grow-1 mb-4">
          <b-col cols md="6" class="mb-4 mb-md-0">
            <dash-card title="Last Signed-in" icon="calendar2-minus" custom class="h-100 p-3" no-padding>
              <template #header-right>
                <b-icon
                  icon="clock-history"
                  class="dsCard__icon rounded p-1"
                  font-scale="2"
                  aria-hidden="true"
                />
              </template>
              <b-row class="h-100" align-v="center">
                <b-col cols class="text-center text-gray-800 fs-4">
                  {{ information.lastSignedin }}
                </b-col>
              </b-row>
            </dash-card>
          </b-col>
          <b-col cols md="6">
            <dash-card title="Payment" custom class="h-100 pt-3 px-3" no-padding>
              <template #header-right>
                <b-icon
                  icon="credit-card-fill"
                  class="dsCard__icon rounded p-1"
                  font-scale="2"
                  aria-hidden="true"
                />
              </template>
              <b-row class="h-100" align-v="center">
                <b-col cols>
                  <div class="d-flex flex-column justify-content-center align-items-center  h-100 pb-3">
                    <template v-if="!payment">
                      <div class="text-gray-600 fs-6">No Payment</div>
                    </template>
                    <template v-else>
                      <div class="text-gray-800 fs-4 mb-1">{{ payment.payment }}</div>
                      <div class="text-gray-600 fs-6">{{ payment.credit_card.cc_number }}</div>
                    </template>
                  </div>
                </b-col>
              </b-row>
            </dash-card>
          </b-col>
        </b-row>
        <b-row class="flex-grow-1">
          <b-col cols>
            <dash-card title="Subscription" custom class="h-100 pt-3 px-3" no-padding>
              <template #header-right>
                <b-icon
                  icon="clipboard-check"
                  class="dsCard__icon rounded p-1"
                  font-scale="2"
                  aria-hidden="true"
                />
              </template>
              <b-row class="h-100" align-v="center">
                <b-col cols class="py-2">
                  <div class="d-flex flex-wrap">
                    <template v-if="!subscription">
                      <div class="fs-6 text-gray-600 w-100 text-center">No Subscription</div>
                    </template>
                    <template v-else>
                      <div class="w-50 w-md-auto flex-grow-1 mb-3">
                        <div class="text-muted mb-1">Plan</div>
                        <div class="fs-5 text-gray-800">{{ subscription.plan }}</div>
                      </div>
                      <div class="w-50 w-md-auto flex-grow-1">
                        <div class="text-muted mb-1">Status</div>
                        <div class="fs-5 text-gray-800">{{ subscription.status }}</div>
                      </div>
                      <div class="w-50 w-md-auto flex-grow-1">
                        <div class="text-muted mb-1">Payment</div>
                        <div class="fs-5 text-gray-800">{{ subscription.payment_method }}</div>
                      </div>
                      <div class="w-50 w-md-auto flex-grow-1">
                        <div class="text-muted mb-1">Term</div>
                        <div class="fs-5 text-gray-800">{{ subscription.term }}</div>
                      </div>
                    </template>
                  </div>
                </b-col>
              </b-row>
            </dash-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols md="5" class="mb-4 mb-md-0">
        <dash-card title="User Purchases" table>
          <b-list-group flush>
            <template v-if="purchases.length">
              <b-list-group-item
                v-for="(purchase, p) in purchases"
                :key="p"
                class="flex-column align-items-start"
              >
                <b-row align-v="start" no-gutters>
                  <b-col cols="1" class="text-gray-600 user-select-none">{{ p + 1 }}</b-col>
                  <b-col cols="10">
                    <div :class="['fs-5', { 'text-truncate': purchase.collapsed }]">{{ purchase.name }}</div>
                    <div :class="['w-100 small text-gray-600 font-italic', { 'text-truncate': purchase.collapsed }]">
                      In {{ purchase.event }}
                    </div>
                    <div class="w-100 d-flex justify-content-between align-items-end mt-3">
                      <small>{{ purchase.date }}</small>
                      <div class="fs-6">$ {{ purchase.cost }}</div>
                    </div>
                  </b-col>
                  <b-col cols="1" class="text-right" @click.capture="collapsePurchaseTitle(p)">
                    <div v-show="purchase.collapsed"><b-icon icon="chevron-down" font-scale="0.85" class="" /></div>
                    <div v-show="!purchase.collapsed"><b-icon icon="chevron-up" font-scale="0.85" class="" /></div>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </template>
            <template v-else>
              <b-list-group-item>
                <div class="fs-6 text-gray-600 w-100 text-center">No Purchase History</div>
              </b-list-group-item>
            </template>
          </b-list-group>
        </dash-card>
      </b-col>
      <b-col cols md="7">
        <dash-card title="Activity log" table>
          <b-list-group flush>
            <template v-if="activelog.length">
              <b-list-group-item
                v-for="(activity, a) in activelog"
                :key="a"
                class="flex-column align-items-start"
              >
                <div class="d-flex w-100">
                  <div class="py-1">
                    <b-icon
                      :icon="activityLogsIcon[activity.type].icon"
                      font-scale="1.7"
                      aria-hidden="true"
                      :variant="activityLogsIcon[activity.type].variant"
                    />
                  </div>
                  <div class="flex-grow-1 pl-3 px-md-3">
                    <div class="d-flex mb-1 align-items-center">
                      <div class="small text-gray-700 font-italic">{{ activity.type }}</div>
                      <div class="ml-auto d-md-none">
                        <small>{{ activity.date }}</small>
                      </div>
                    </div>
                    <p class="mb-2">
                      {{ activity.mentions }}
                    </p>
                    <div class="small text-gray-600">
                      <template v-if="a % 2">
                        {{ "Donec id elit non mi porta.".repeat(a) }}
                      </template>
                      <template v-else>
                        {{ 'Donec id elit non mi porta.' }}
                      </template>
                    </div>
                  </div>
                  <div class="d-none d-md-block text-nowrap">
                    <small>{{ activity.date }}</small>
                  </div>
                </div>
              </b-list-group-item>
            </template>
            <template v-else>
              <b-list-group-item>
                <div class="fs-6 text-gray-600 w-100 text-center">No Activity History</div>
              </b-list-group-item>
            </template>
          </b-list-group>
        </dash-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: "UserDetails",
  layout: 'dashboard',
  middleware: [
    'check-renderer'
  ],
  async asyncData ({ params, $axios, renderServer }) {
    try {
      const res = await $axios.$get(`/api/users/${params.id}`)
      const { information, payment, subscription, activelog } = res
      let { purchases } = res
      const format = 'YYYY-MM-DD hh:mm a'
      information.lastSignedin = dayjs(information.lastSignedin).format(format)
      information.createdAt = dayjs(information.createdAt).format(format)
      information.modifiedAt = dayjs(information.modifiedAt).format(format)
      purchases = purchases.map(ele => ({ ...ele, name: ele.name.replace(/-/g, " "), collapsed: true }))
      return {
        information,
        payment,
        subscription,
        activelog,
        purchases,
        isServerRender: renderServer
      }
    } catch (err) {
      console.log(err)
      console.log(err.response)
    }
  },
  data: () => ({
    informationClass: {
      titleRow: 'mb-3',
      titlePtag: 'text-muted mb-0'
    },
    information: {},
    payment: {},
    subscription: {},
    activelog: [],
    purchases: [],
    isServerRender: false,
    statusVariant: {
      Active: 'primary',
      'Pending Approval': 'info',
      Inactive: 'warning',
      'Not Yet Activated': 'warning'
    },
    activityLogsIcon: {
      visit: { icon: 'door-open-fill', variant: 'muted' },
      like: { icon: 'heart-fill', variant: 'danger' },
      save: { icon: 'bookmarks-fill', variant: 'primary' },
      comment: { icon: 'chat-left-dots-fill', variant: 'dark' }
    }
  }),
  computed: {
    needApproval () {
      return this.information.status && this.information.status === 'Pending Approval'
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
    collapsePurchaseTitle (idx) {
      this.purchases[idx].collapsed = !this.purchases[idx].collapsed
    }
  }
}
</script>

<style>

</style>
