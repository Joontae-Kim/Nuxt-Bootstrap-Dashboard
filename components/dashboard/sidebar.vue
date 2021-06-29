<template>
  <div :class="['d-flex flex-column sidebar', { collapsed: close }]">
    <div class="sidebar__header">
      <div class="sidebar__logo cursor-pointer">
        LOGO
      </div>
      <div class="sidebar__close cursor-pointer ml-auto" @click="toggleSidebar">
        <b-icon-x font-scale="1.5" aria-hidden="true" />
      </div>
    </div>
    <div class="sidebar__body py-2">
      <b-nav vertical class="w-100">
        <b-nav-item to="/overview" exact-active-class="active">
          Overview
        </b-nav-item>
        <b-nav-item to="/event" active-class="active">
          Event
        </b-nav-item>
        <b-nav-item to="/users" active-class="active">
          Users
        </b-nav-item>
        <b-nav-item exact-active-class="active">
          Another Link
        </b-nav-item>
      </b-nav>
    </div>
  </div>
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
    close: false
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
