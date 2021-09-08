<template>
  <b-navbar id="dash-nav" type="dark" :class="['dashNav', { collapsed }, { scrolled }]" fixed="top">
    <b-container fluid>
      <b-row no-gutters class="position-relative flex-grow-1">
        <b-col cols="12" md="6" class="">
          <b-navbar-nav fill class="align-items-center">
            <b-nav-text class="mr-3">
              <div id="header-sidebar-toggle" class="dashNav__btn-sidebarToogle" @click="toggleSidebar">
                <b-icon-list font-scale="1.5" aria-hidden="true" />
              </div>
            </b-nav-text>

            <b-nav-form class="flex-grow-1 mr-2 mr-md-0" form-class="flex-grow-1" @submit.prevent="searchingEventAndUser">
              <b-form-input v-model="navBarSearchVal" class="rounded-pill dashNav__search" placeholder="Search Event" />
            </b-nav-form>

            <div class="d-md-none dashNav__btn-toggle-tool rounded-pill">
              <b-btn variant="link" :class="[...iconClass, 'px-2']" @click="collapseToolBox">
                <b-icon v-bind="{ ...iconProps, fontScale: 0.9 }" icon="tools" />
                <b-icon v-show="!toolboxCollapsed" v-bind="{ ...iconProps, fontScale: 0.85 }" icon="chevron-down" />
                <b-icon v-show="toolboxCollapsed" v-bind="{ ...iconProps, fontScale: 0.85 }" icon="chevron-up" />
              </b-btn>
            </div>
          </b-navbar-nav>
        </b-col>
        <b-col id="navbar-tools" cols="12" md="6" :class="['px-0 px-md-3 dashNav__toolWrapper', {active : toolboxCollapsed}]">
          <b-navbar-nav align="end" class="align-items-center h-100">
            <div class="d-flex flex-grow-1 flex-md-grow-0 justify-content-between rounded-pill py-2 py-md-0 dashNav__tool">
              <b-btn variant="link" :class="iconClass" @click="refreshPage">
                <b-icon v-bind="iconProps" icon="arrow-clockwise" />
              </b-btn>
              <b-btn v-show="isAbletoBackButtonPage" variant="link" :class="iconClass">
                <b-icon v-bind="iconProps" icon="arrow-left-square" />
              </b-btn>
              <client-only>
                <b-dropdown
                  id="navbar-messeage-dr"
                  variant="link"
                  menu-class="custom-dd__body mr-sm-2"
                  no-caret
                  :toggle-class="iconClass"
                  :right="!isMobile"
                  class="custom-dd"
                  offset="0"
                >
                  <template #button-content>
                    <b-icon v-bind="iconProps" icon="envelope-fill" />
                  </template>
                  <b-dd-text>
                    <div class="text-center">
                      <p class="text-dark font-weight-bold mb-0">Message Alert</p>
                    </div>
                  </b-dd-text>
                  <template
                    v-for="(message, m) in messageList"
                  >
                    <b-dd-divider :key="`message-divider-${m}`" />
                    <b-dd-item :key="`message-content-${m}`" link-class="bg-white" active-class="bg-light">
                      <div class="d-flex align-items-start justify-content-between mb-2">
                        <p class="mb-0">{{ message.sender }}</p>
                        <b-badge variant="warning" class="text" pill>{{ message.ago }}</b-badge>
                      </div>
                      <small class="d-inline-block text-truncate mw-100 text-secondary">
                        {{ message.message }}
                      </small>
                    </b-dd-item>
                  </template>
                  <b-dd-divider />
                  <b-dd-text>
                    <div class="text-center">
                      <a class="text-decoration-none text-dark font-weight-normal mb-0 small cursor-pointer">Show All Message</a>
                    </div>
                  </b-dd-text>
                </b-dropdown>
              </client-only>
              <client-only>
                <b-dropdown
                  id="navbar-noti-dr"
                  variant="link"
                  menu-class="custom-dd__body mr-sm-2"
                  no-caret
                  :toggle-class="iconClass"
                  :right="!isMobile"
                  boundary="window"
                  class="custom-dd"
                >
                  <template #button-content>
                    <b-iconstack shift-h="-3" shift-v="3">
                      <b-icon icon="bell-fill" scale="0.7" shift-v="0" />
                      <b-icon icon="circle-fill" scale="0.2" shift-h="6" shift-v="5" variant="danger" />
                    </b-iconstack>
                  </template>
                  <b-dd-text>
                    <div class="text-center">
                      <p class="text-dark font-weight-bold mb-0">Notification Alert</p>
                    </div>
                  </b-dd-text>
                  <template
                    v-for="(noti, n) in notiList"
                  >
                    <b-dd-divider :key="`noti-divider-${n}`" />
                    <b-dd-item :key="`noti-content-${n}`" link-class="bg-white" active-class="bg-light">
                      <div class="d-flex align-items-start justify-content-between mb-2">
                        <p class="mb-0">{{ noti.sender }}</p>
                        <b-badge variant="warning" class="text" pill>{{ noti.ago }}</b-badge>
                      </div>
                      <small class="d-inline-block text-truncate mw-100 text-secondary">
                        {{ noti.message }}
                      </small>
                    </b-dd-item>
                  </template>
                  <b-dd-divider />
                  <b-dd-text>
                    <div class="text-center">
                      <a class="text-decoration-none text-dark font-weight-normal mb-0 small cursor-pointer">Show All Notification</a>
                    </div>
                  </b-dd-text>
                </b-dropdown>
              </client-only>
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
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    iconProps: {
      fontScale: 1.5,
      class: 'align-middle',
      shiftV: 0.7
    },
    iconClass: ['text-decoration-none text-center'],
    toolboxCollapsed: false,
    navBarSearchVal: null,
    scrolled: false,
    ddBoundary: null,
    messageList: [
      {
        sender: 'Joe Padberg',
        ago: '2 min ago',
        message: 'Aut perferendis nobis quia.'
      },
      {
        sender: 'Norbert Wisoky',
        ago: '11 min ago',
        message: 'voluptas perspiciatis ut assumenda.'
      },
      {
        sender: 'Arcelia Krajcik',
        ago: '25 min ago',
        message: 'nobis quia voluptas Aut perferendis perspiciatis ut ut assumenda voluptas perspiciatis ut ut assumenda quia.'
      },
      {
        sender: 'Oralee McDermott',
        ago: '37 min ago',
        message: 'ut assumenda quia perspiciatis ut.'
      }
    ],
    notiList: [
      {
        sender: 'Scot Homenick',
        ago: '2 min ago',
        message: 'ut assumenda quia perspiciatis ut.'
      },
      {
        sender: 'Mitchel O\'Reilly',
        ago: '9 min ago',
        message: 'nobis quia voluptas Aut perferendis perspiciatis ut ut.'
      },
      {
        sender: 'Douglas Brekke',
        ago: '14 min ago',
        message: 'assumenda voluptas.'
      },
      {
        sender: 'Mark Greenfelder',
        ago: '15 min ago',
        message: 'Aut perferendis nobis quia.'
      }
    ]
  }),
  computed: {
    navigationDom () {
      return document.getElementById('dash-nav')
    },
    isAbletoBackButtonPage () {
      return ['eventDetails', 'userDetails'].includes(this.$route.name)
    },
    navDRpositionRight () {
      return !this.isMobile
    }
  },
  created () {
    this.mobileWidth = 576
  },
  mounted () {
    this.captureNavPosition()
  },
  beforeDestroy () {},
  methods: {
    searchingEventAndUser () {
      this.$router.push({ name: 'eventsList', query: { qsr_nm: this.navBarSearchVal } })
    },
    toggleSidebar () {
      this.$emit('toggleSidebar')
    },
    collapseToolBox () {
      this.toolboxCollapsed = this.isMobile
        ? !this.toolboxCollapsed
        : true
    },
    refreshPage () {
      if (this.isAbletoBackButtonPage) {
        this.$nuxt.$emit('pageLoading', true)
        setTimeout(() => {
          this.$nuxt.$emit('pageLoading', false)
        }, 2300)
      } else {
        this.$nuxt.refresh()
      }
    },
    captureNavPosition () {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].boundingClientRect.y < 0) {
          this.scrolled = true
        } else {
          this.scrolled = false
        }
      })
      observer.observe(document.querySelector(".dash-nav-virtual-divider"))
    }
  }
}
</script>

<style lang="scss">
.custom-dd {
  @media (max-width: 575.98px) {
    position: initial !important;
  }

  &__body {
    @media (max-width: 575.98px) {
      transform: translateX(0%);
      margin-top: 1rem;
      min-width: 100%;
      max-width: 93.5vw;
    }

    @media (min-width: 576px) {
      max-width: 320px;
    }
  }
}
</style>
