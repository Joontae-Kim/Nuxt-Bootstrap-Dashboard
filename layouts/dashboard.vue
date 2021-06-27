<template>
  <div class="wrapper">
    <dash-sidebar :collapsed="collapsedSidebar" @toggleSidebar="collapsed" />
    <div :class="['content-page position-relative', { collapsed: !collapsedSidebar }]">
      <dash-header @toggleSidebar="collapsed" />
      <LoadingWrapper :loading="isChildPending" />
      <transition name="dashboard-fade" mode="out-in" appear>
        <div v-show="!isChildPending" class="content py-3">
          <Nuxt />
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
