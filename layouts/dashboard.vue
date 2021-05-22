<template>
  <div class="wrapper">
    <dash-sidebar :collapsed="collapsedSidebar" @toggleSidebar="collapsed" />
    <div :class="['content-page', { collapsed: !collapsedSidebar }]">
      <dash-header @toggleSidebar="collapsed" />
      <div class="content py-3">
        <div v-show="isChildPending">
          loading...
        </div>
        <div v-show="!isChildPending">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data: () => ({
    collapsedSidebar: false,
    isChildPending: true
  }),
  watch: {},
  created () {
    this.$nuxt.$on('pageLoading', (status) => {
      const _status = typeof status === 'undefined' ? false : status
      this.$set(this, 'isChildPending', _status)
    })
  },
  mounted () {},
  beforeDestroy () {},
  methods: {
    collapsed () {
      this.collapsedSidebar = !this.collapsedSidebar
    }
  }
}
</script>

<style>
</style>
