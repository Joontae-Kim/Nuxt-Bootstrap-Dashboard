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
          <div class="d-flex justify-content-between align-items-center">
            <b-nav-item :to="{ name: 'eventsStatics' }" :active="$route.meta.parent === 'events'">
              Event
            </b-nav-item>
            <b-icon :icon="eventsNestedToggled ? 'chevron-up' : 'chevron-down'" @click="eventsNestedToggled = !eventsNestedToggled" />
          </div>
          <b-collapse id="nav-events-child" v-model="eventsNestedToggled">
            <b-nav vertical>
              <b-nav-item class="ml-3 my-0" :to="{ name: 'eventsStatics' }" active-class="active"> Statics </b-nav-item>
              <b-nav-item class="ml-3 my-0" :to="{ name : 'eventsList' }" active-class="active"> List </b-nav-item>
            </b-nav>
          </b-collapse>
          <div class="d-flex justify-content-between align-items-center">
            <b-nav-item :to="{ name: 'userStatics' }" :active="$route.meta.parent === 'users'">
              Users
            </b-nav-item>
            <b-icon :icon="usersNestedToggled ? 'chevron-up' : 'chevron-down'" @click="usersNestedToggled = !usersNestedToggled" />
          </div>
          <b-collapse id="nav-events-child" v-model="usersNestedToggled">
            <b-nav vertical>
              <b-nav-item class="ml-3 my-0" :to="{ name: 'userStatics' }" exact-active-class="active"> Statics </b-nav-item>
              <b-nav-item class="ml-3 my-0" :to="{ name : 'usersList' }" exact-active-class="active"> List </b-nav-item>
            </b-nav>
          </b-collapse>
          <b-nav-item exact-active-class="active">
            Another Link
          </b-nav-item>
        </b-nav>
      </b-navbar>
    </div>
    <div class="sidebar__footer">
      <div class="sidebar__close cursor-pointer ml-auto" @click="toggleSidebar">
        <template v-if="collapsed">
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
      required: true
    },
    pageMovePending: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    isMobile: null,
    eventsNestedToggled: false,
    usersNestedToggled: false,
    isPageMove: false
  }),
  watch: {
    isMobile (aft, prev) {
      if (!this.pageMovePending && aft !== prev && prev !== null) {
        if ((aft && !this.collapsed) || (!aft && this.collapsed)) {
          this.$emit('toggleSidebar')
        }
      }
    },
    pageMovePending (prev, current) {
      if (prev && !current && !this.collapsed && this.isPageMove && this.isMobile) {
        setTimeout(() => {
          this.$emit('toggleSidebar')
        }, 2500)
      }
    },
    $route: {
      deep: true,
      handler (from, to) {
        if (this.isMobile && from.name !== to.name) {
          this.$nextTick(() => { this.isPageMove = true })
        }
      }
    },
    '$route.meta': {
      immediate: true,
      deep: true,
      handler (val) {
        if (!!val.parent && ['users', 'events'].includes(val.parent)) {
          if (val.parent === 'users') {
            this.usersNestedToggled = true
            this.eventsNestedToggled = false
          } else if (val.parent === 'events') {
            this.eventsNestedToggled = true
            this.usersNestedToggled = false
          }
        } else {
          this.$nextTick(() => {
            this.eventsNestedToggled = false
            this.usersNestedToggled = false
          })
        }
      }
    }
  },
  mounted () {
    this.checkIsMobile()
    window.addEventListener('resize', this.checkIsMobile)
    window.addEventListener('mouseup', this.handleSidebar)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.checkIsMobile)
    window.removeEventListener('mouseup', this.handleSidebar)
  },
  methods: {
    toggleSidebar () {
      this.$emit('toggleSidebar')
    },
    checkIsMobile () {
      this.isMobile = window.innerWidth < 1024
    },
    handleSidebar (event) {
      if (this.isMobile && !this.collapsed) {
        const dashSidebar = document.getElementById('dash-sidebar')
        if (!this.isPageMove && event.target !== dashSidebar && event.target.parentNode !== dashSidebar) {
          this.$emit('toggleSidebar')
        }
      }
    }
  }
}
</script>

<style>

</style>
