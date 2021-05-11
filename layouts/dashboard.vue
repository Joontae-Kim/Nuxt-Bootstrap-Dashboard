<template>
  <div class="wrapper">
    <dash-sidebar :collapsed="collapsedSidebar" @toggleSidebar="collapsed" />
    <div :class="['content-page', { collapsed: !collapsedSidebar }]">
      <dash-header @toggleSidebar="collapsed" />
      <div class="content py-3">
        <Nuxt />
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
  created () {},
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
