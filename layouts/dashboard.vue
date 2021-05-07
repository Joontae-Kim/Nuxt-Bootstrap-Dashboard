<template>
  <div class="wrapper">
    <Sidebar :collapsed="collapsedSidebar" @toggleSidebar="collapsed" />
    <div :class="['content-page', { collapsed: !collapsedSidebar }]">
      <DashboardHeader @toggleSidebar="collapsed" />
      <div class="content p-2">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    collapsedSidebar: false
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
