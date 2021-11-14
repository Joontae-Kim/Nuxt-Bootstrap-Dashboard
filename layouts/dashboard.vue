<template>
  <div class="wrapper wrapper--dashboard">
    <dash-sidebar :collapsed="collapsedSidebar" @toggleSidebar="collapseSidebar" />
    <div :class="['content-page position-relative', { collapsed: !collapsedSidebar }]">
      <LoadingWrapper :loading="isChildPending" />
      <transition name="dashboard-fade" mode="out-in" appear>
        <div v-show="!isChildPending" class="content">
          <div class="dash-nav-virtual-divider" />
          <dash-nav class="mb-0 mb-md-5" :collapsed="!collapsedSidebar" @toggleSidebar="collapseSidebar" />
          <Nuxt id="content-body" class="content-body px-sxl-5" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import checkResolution from '~/mixins/checkResolution'

export default {
  name: 'Dashboard',
  components: {
    LoadingWrapper: () => { return import('~/components/loadingWrapper') }
  },
  mixins: [
    checkResolution
  ],
  data: () => ({
    collapsedSidebar: true,
    isChildPending: true
  }),
  watch: {
    isMobile (aft, prev) {
      if (!this.isChildPending && prev !== null) {
        this.collapseSidebar(aft)
      }
    },
    isChildPending (aft, prev) {
      if (this.isMobile && !this.collapsedSidebar && (prev && !aft)) {
        setTimeout(() => {
          this.collapseSidebar(true)
        }, 1000)
      }
    }
  },
  created () {
    this.$nuxt.$on('pageLoading', (status) => {
      const _status = typeof status === 'undefined' ? false : status
      this.$set(this, 'isChildPending', _status)
    })
  },
  mounted () {
    this.collapseSidebar(window.innerWidth <= 1024)
    window.addEventListener('mouseup', this.handleSidebar)
  },
  beforeDestroy () {
    window.removeEventListener('mouseup', this.handleSidebar)
  },
  methods: {
    collapseSidebar (state = !this.collapsedSidebar) {
      this.collapsedSidebar = state
    },
    handleSidebar (event) {
      if (this.isMobile && !this.collapsedSidebar) {
        const headerChildEle = event.target.closest('#dash-nav')
        const sidebarChildEle = event.target.closest('#dash-sidebar')
        if (!this.isChildPending && !sidebarChildEle && !headerChildEle) {
          this.collapseSidebar()
        }
      }
    }
  }
}
</script>

<style>
</style>
