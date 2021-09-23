<template>
  <nav id="dash-sidebar" :class="['d-flex flex-column sidebar', { collapsed: collapsed }]">
    <div class="sidebar__header">
      <div class="sidebar__logo cursor-pointer">
        LOGO
      </div>
    </div>
    <div class="sidebar__body py-2">
      <b-navbar vertical class="flex-column w-100 pl-0">
        <b-nav vertical class="w-100">
          <b-nav-item :to="{ name: 'overview' }" exact-active-class="active">
            Overview
          </b-nav-item>
          <div :class="['d-flex justify-content-between align-items-center sidebar__parentlink', { active: $route.meta.parent === 'events' }]">
            <b-nav-item :to="{ name: 'eventsStatics' }" :active="$route.meta.parent === 'events'" :exact="false">
              Event
            </b-nav-item>
            <b-btn variant="link" size="sm" class="sidebar__toggle p-0">
              <b-icon :icon="eventsNestedToggled ? 'chevron-up' : 'chevron-down'" @click="eventsNestedToggled = !eventsNestedToggled" />
            </b-btn>
          </div>
          <b-collapse id="nav-events-child" v-model="eventsNestedToggled">
            <b-nav vertical>
              <b-nav-item class="ml-3 my-0" :to="{ name: 'eventsStatics' }" active-class="active"> Statics </b-nav-item>
              <b-nav-item class="ml-3 my-0" :to="{ name : 'eventsList' }" active-class="active"> List </b-nav-item>
            </b-nav>
          </b-collapse>
          <div :class="['d-flex justify-content-between align-items-center sidebar__parentlink', { active: $route.meta.parent === 'users' }]">
            <b-nav-item :to="{ name: 'userStatics' }" :active="$route.meta.parent === 'users'">
              Users
            </b-nav-item>
            <b-btn variant="link" size="sm" class="sidebar__toggle p-0">
              <b-icon :icon="usersNestedToggled ? 'chevron-up' : 'chevron-down'" @click="usersNestedToggled = !usersNestedToggled" />
            </b-btn>
          </div>
          <b-collapse id="nav-events-child" v-model="usersNestedToggled">
            <b-nav vertical>
              <b-nav-item class="ml-3 my-0" :to="{ name: 'userStatics' }" exact-active-class="active"> Statics </b-nav-item>
              <b-nav-item class="ml-3 my-0" :to="{ name : 'usersList' }" exact-active-class="active"> List </b-nav-item>
            </b-nav>
          </b-collapse>
          <div :class="['d-flex justify-content-between align-items-center sidebar__parentlink', { active: $route.meta.parent === 'authentication' }]">
            <b-nav-item :to="{ name: 'signin' }" :active="$route.meta.parent === 'authentication'">
              Auth
            </b-nav-item>
            <b-btn variant="link" size="sm" class="sidebar__toggle p-0">
              <b-icon :icon="authNestedToggled ? 'chevron-up' : 'chevron-down'" @click="authNestedToggled = !authNestedToggled" />
            </b-btn>
          </div>
          <b-collapse id="nav-events-child" v-model="authNestedToggled">
            <b-nav vertical>
              <b-nav-item class="ml-3 my-0" :to="{ name: 'signin' }" exact-active-class="active"> Sign In </b-nav-item>
              <b-nav-item class="ml-3 my-0" :to="{ name : 'signup' }" exact-active-class="active"> Sign Up </b-nav-item>
              <b-nav-item class="ml-3 my-0" :to="{ name : 'resetpassword' }" exact-active-class="active"> Reset Password </b-nav-item>
            </b-nav>
          </b-collapse>
          <!-- <b-nav-item exact-active-class="active">
            Another Link
          </b-nav-item> -->
        </b-nav>
      </b-navbar>
    </div>
    <div class="sidebar__footer">
      <b-nav>
        <b-nav-item :to="{ name: 'signin'}" link-classes="p-0">
          Logout
        </b-nav-item>
      </b-nav>
      <div class="sidebar__close cursor-pointer ml-auto" @click="toggleSidebar">
        <template v-if="!collapsed">
          <b-icon icon="arrow-bar-right" font-scale="1.5" title="Open Sidebar" aria-hidden="true" shift-v="-1" />
        </template>
        <template v-else>
          <b-icon icon="arrow-bar-left" font-scale="1.5" title="Close Sidebar" aria-hidden="true" shift-v="-1" />
        </template>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  props: {
    collapsed: {
      type: Boolean,
      required: true,
      default: (collapsedProps) => {
        return typeof collapsedProps === 'undefined' ? false : collapsedProps
      }
    }
  },
  data: () => ({
    eventsNestedToggled: false,
    usersNestedToggled: false,
    authNestedToggled: false,
    isPageMove: false
  }),
  computed: {
    pairOfNestedRoute () {
      return {
        users: 'usersNestedToggled',
        events: 'eventsNestedToggled',
        authentication: 'authNestedToggled'
      }
    }
  },
  watch: {
    '$route.meta': {
      immediate: true,
      deep: true,
      handler (val) {
        if (!!val.parent && ['users', 'events'].includes(val.parent)) {
          this.$nextTick(() => {
            const activeNestedRoute = this.pairOfNestedRoute[val.parent]
            if (activeNestedRoute) {
              for (const [key, value] of Object.entries(this.pairOfNestedRoute)) {
                if (val.parent !== key) { this[value] = false }
              }
              this[activeNestedRoute] = true
            }
          })
        } else {
          this.$nextTick(() => {
            Object.values(this.pairOfNestedRoute).forEach((nestedRouteStatus) => { this[nestedRouteStatus] = false })
          })
        }
      }
    }
  },
  mounted () {
    this.$forceUpdate()
  },
  methods: {
    toggleSidebar () {
      this.$emit('toggleSidebar')
    }
  }
}
</script>

<style>

</style>
