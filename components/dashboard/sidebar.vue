<template>
  <nav :class="['d-flex flex-column sidebar', { collapsed: close }]">
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
            <b-nav-item :to="{ name: 'events' }" active-class="active">
              Event
            </b-nav-item>
            <b-icon :icon="eventsNestedToggled ? 'dash-circle' : 'plus-circle'" @click="eventsNestedToggled = !eventsNestedToggled" />
          </div>
          <b-collapse id="nav-events-child" v-model="eventsNestedToggled">
            <b-nav vertical>
              <b-nav-item class="ml-3 my-0" :to="{ name: 'events' }" exact-active-class="active"> Statics </b-nav-item>
              <b-nav-item class="ml-3 my-0" :to="{ name : 'eventLists' }" exact-active-class="active"> List </b-nav-item>
            </b-nav>
          </b-collapse>
          <div class="d-flex justify-content-between align-items-center">
            <b-nav-item :to="{ name: 'userStatics' }" :active="$route.meta.parent === 'users'">
              Users
            </b-nav-item>
            <b-icon :icon="usersNestedToggled ? 'dash-circle' : 'plus-circle'" @click="usersNestedToggled = !usersNestedToggled" />
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
        <template v-if="close">
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
    }
  },
  data: () => ({
    isMobile: false,
    close: false,
    eventsNestedToggled: false,
    usersNestedToggled: false
  }),
  watch: {
    collapsed (state) {
      this.close = state
    },
    isMobile (state) {
      if (!this.close && state) {
        this.$emit('toggleSidebar')
      }
      if (this.close && !state) {
        this.$emit('toggleSidebar')
      }
    }
  },
  created () {},
  mounted () {
    window.addEventListener('resize', this.handleSidebar)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleSidebar)
  },
  methods: {
    toggleSidebar () {
      this.$emit('toggleSidebar')
    },
    handleSidebar () {
      this.isMobile = window.innerWidth < window.innerHeight
    }
  }
}
</script>

<style>

</style>
