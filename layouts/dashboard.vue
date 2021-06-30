<template>
  <div class="wrapper">
    <dash-sidebar :collapsed="collapsedSidebar" @toggleSidebar="collapsed" />
    <div :class="['content-page position-relative', { collapsed: !collapsedSidebar }]">
      <LoadingWrapper :loading="isChildPending" />
      <transition name="dashboard-fade" mode="out-in" appear>
        <div v-show="!isChildPending" class="content">
          <dash-nav @toggleSidebar="collapsed" />
          <Nuxt class="mt-5 mb-4" />
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
