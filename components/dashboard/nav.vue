<template>
  <b-navbar id="dash-nav" type="dark" class="dashNav" fixed="top">
    <b-container fluid>
      <b-row no-gutters class="position-relative flex-grow-1">
        <b-col cols="12" md="6" class="mb-3 mb-md-0">
          <b-navbar-nav fill class="align-items-center">
            <b-nav-text class="mr-3">
              <div id="header-sidebar-toggle" class="dashNav__btn-sidebarToogle" @click="toggleSidebar">
                <b-icon-list font-scale="1.5" aria-hidden="true" />
              </div>
            </b-nav-text>

            <b-nav-form class="flex-grow-1 mr-2 mr-md-0" form-class="flex-grow-1">
              <b-form-input class="rounded-pill dashNav__search w-md-50" placeholder="Search Event" />
            </b-nav-form>

            <div class="d-md-none dashNav__tool rounded-pill">
              <b-btn variant="link" :class="[...iconClass, 'px-2']" @click="collapseToolBox">
                <b-icon v-bind="{ ...iconProps, fontScale: 0.9 }" icon="tools" />
                <b-icon v-bind="{ ...iconProps, fontScale: 0.85 }" icon="chevron-down" />
              </b-btn>
            </div>
          </b-navbar-nav>
        </b-col>
        <b-col cols="12" md="6" :class="['px-0 px-md-3 dashNav__toolWrapper', {active : toolboxCollapsed}]">
          <b-navbar-nav align="end" class="align-items-center h-100">
            <div class="d-flex flex-grow-1 flex-md-grow-0 justify-content-between rounded-pill py-2 py-md-0 dashNav__tool">
              <b-btn variant="link" :class="iconClass">
                <b-icon v-bind="iconProps" icon="arrow-clockwise" />
              </b-btn>
              <b-btn variant="link" :class="iconClass">
                <b-icon v-bind="iconProps" icon="arrow-left-square" />
              </b-btn>
              <b-btn variant="link" :class="iconClass">
                <b-icon v-bind="iconProps" icon="envelope-fill" />
              </b-btn>
              <b-btn variant="link" :class="iconClass">
                <b-iconstack shift-h="-3" shift-v="3">
                  <b-icon icon="bell-fill" scale="0.7" shift-v="0" />
                  <b-icon icon="circle-fill" scale="0.2" shift-h="6" shift-v="5" variant="danger" />
                </b-iconstack>
              </b-btn>
              <b-btn variant="link" :class="iconClass">
                <b-icon v-bind="iconProps" icon="gear-wide-connected" />
              </b-btn>
            </div>
          </b-navbar-nav>
        </b-col>
      </b-row>
    </b-container>
  </b-navbar>
</template>

<script>
import checkResolution from '~/mixins/checkResolution'

export default {
  name: 'DashboardNav',
  mixins: [
    checkResolution
  ],
  data: () => ({
    iconProps: {
      fontScale: 1.5,
      class: 'align-middle',
      shiftV: 0.7
    },
    iconClass: ['text-decoration-none text-center'],
    toolboxCollapsed: false
  }),
  computed: {
    navigationDom () {
      return document.getElementById('dash-nav')
    }
  },
  mounted () {
    this.captureNavPosition()
  },
  beforeDestroy () {},
  methods: {
    toggleSidebar () {
      this.$emit('toggleSidebar')
    },
    collapseToolBox () {
      this.toolboxCollapsed = this.isMobile
        ? !this.toolboxCollapsed
        : true
    },
    captureNavPosition () {
      const dashNavDom = document.getElementById('dash-nav')
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].boundingClientRect.y < 0) {
          dashNavDom.classList.add("scrolled")
        } else {
          dashNavDom.classList.remove("scrolled")
        }
      })
      observer.observe(document.querySelector(".dash-nav-virtual-divider"))
    }
  }
}
</script>

<style>

</style>
