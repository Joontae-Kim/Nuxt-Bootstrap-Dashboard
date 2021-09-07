<template>
  <div class="wrapper">
    <dash-sidebar :collapsed="!collapsedSidebar" :page-move-pending="isChildPending" @toggleSidebar="collapsed" />
    <div :class="['content-page position-relative', { collapsed: !collapsedSidebar }]">
      <LoadingWrapper :loading="isChildPending" />
      <transition name="dashboard-fade" mode="out-in" appear>
        <div v-show="!isChildPending" class="content">
          <dash-nav class="mb-0 mb-md-5" :collapsed="!collapsedSidebar" @toggleSidebar="collapsed" />
          <div class="dash-nav-virtual-divider" />
          <Nuxt id="content-body" class="content-body" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {
    LoadingWrapper: () => { return import('~/components/loadingWrapper') }
  },
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
  mounted () {
    this.collapsedSidebar = window.innerWidth < 1024
  },
  beforeDestroy () {},
  methods: {
    collapsed (state = !this.collapsedSidebar) {
      this.collapsedSidebar = !this.collapsedSidebar
    }
  }
}
</script>

<style>
</style>
