<template>
  <fragment>
    <b-row class="mx-0 landingIntro">
      <b-col cols="12" md="6" class="text-white align-self-center pt-4 pb-5 py-lg-0">
        <h1 class="">It's Nuxt Dashboard Propject</h1>
        <h3 class="font-weight-light">
          with Bootstrap and BootstrapVue
        </h3>
      </b-col>
      <b-col
        cols="12"
        md="6"
        class="position-relative h-50 h-md-100"
      >
        <img
          src="~/static/overview-page.png"
          alt="overview page"
          class="shadow landingIntro__screenshot"
        >
      </b-col>
    </b-row>
    <b-container fluid tag="section">
      <b-row class="mb-5" align-h="center">
        <b-col md="10" lg="9" class="text-center">
          <div class="mb-4">
            <b-icon icon="person-bounding-box" font-scale="2.5" class="landingText--normal" />
            <b-icon icon="plus" font-scale="2" class="mx-3" variant="secondary" />
            <b-icon icon="code-slash" font-scale="2.5" class="landingText--normal" />
          </div>
          <h4>The admin is fully responsive and easy to customize</h4>
          <p>The clean and well commented code allows easy customization of the theme.It's designed for describing your app, agency or business.</p>
        </b-col>
      </b-row>
      <b-row class="flex-column py-5 mb-5 bg-white landingFeature">
        <b-col class="text-center mb-5 mb-md-4" cols>
          <h2>Featured By</h2>
        </b-col>
        <b-col cols class="landingFeature__body">
          <b-row class="justify-content-md-center mb-md-4">
            <b-col cols md="4" lg="3" class="mb-3 mb-md-0">
              <b-card no-body class="align-items-start p-3 h-100 shadow-sm border-light">
                <img src="~/static/nuxt_svg.svg" title="Nuxt.js" alt="Nuxt.js" height="40" class="mb-3 mb-md-auto">
                <div class="d-flex flex-column">
                  <h5 class="mb-1 text-dark">Nuxt.js</h5>
                  <em class="text-secondary">Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components.</em>
                </div>
              </b-card>
            </b-col>
            <b-col cols md="4" lg="3" class="mb-3 mb-md-0">
              <b-card no-body class="align-items-start p-3 h-100 shadow-sm border-light">
                <img src="~/static/bootstrapVue_svg.svg" title="BootstrapVue" alt="BootstrapVue" height="40" class="mb-3">
                <div class="d-flex flex-column">
                  <h5 class="mb-1 text-dark">BootstrapVue</h5>
                  <em class="text-secondary">Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components.</em>
                </div>
              </b-card>
            </b-col>
            <b-col cols md="4" lg="3" class="mb-3 mb-md-0">
              <b-card no-body class="align-items-start p-3 h-100 shadow-sm border-light">
                <img src="~/static/expressjs.svg" title="Express.js" alt="Express.js" height="30" class="mb-3 mb-md-auto">
                <div class="d-flex flex-column">
                  <h5 class="mb-1 text-dark">Express.js</h5>
                  <em class="text-secondary">Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components.</em>
                </div>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="justify-content-md-center">
            <b-col cols md="4" lg="3" class="mb-3 mb-md-0">
              <b-card no-body class="align-items-start p-3 h-100 shadow-sm border-light">
                <img src="~/static/AxiosModule_svg.svg" title="Axios Module for Nuxt.js" alt="Axios Module for Nuxt.js" height="20" class="mb-3 mb-md-auto">
                <div class="d-flex flex-column">
                  <h5 class="mb-1 text-dark">Axios Module for Nuxt.js</h5>
                  <em class="text-secondary">Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components.</em>
                </div>
              </b-card>
            </b-col>
            <b-col cols md="4" lg="3" class="mb-3 mb-md-0">
              <b-card no-body class="align-items-start p-3 h-100 shadow-sm border-light">
                <BIconLayoutTextWindowReverse title="Layout with Sidebar and Nav" font-scale="2" variant="dark" class="mb-3" />
                <div class="d-flex flex-column">
                  <h5 class="mb-1 text-dark">Layout with Sidebar and Nav</h5>
                  <em class="text-secondary">Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components.</em>
                </div>
              </b-card>
            </b-col>
            <b-col cols md="4" lg="3" class="mb-3 mb-md-0">
              <b-card no-body class="align-items-start p-3 h-100 shadow-sm border-light">
                <BIconLayoutWtf title="Responsive Design" font-scale="2" variant="dark" class="mb-3 mb-md-auto" />
                <div class="d-flex flex-column">
                  <h5 class="mb-1 text-dark">Responsive Design</h5>
                  <em class="text-secondary">Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components.</em>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <!-- Fully Responsive Layout -->
      <b-row class="mb-5 py-5" align-h="center">
        <b-col cols="12" class="text-center mb-4">
          <h2 class="mb-0">Responsive Layout & Mobile Friendly Interface</h2>
        </b-col>
        <b-col cols="12" md="10">
          <b-row no-gutters class="d-flex d-md-none">
            <b-col cols>
              <b-card no-body :class="[responsiveLayoutClass.card, 'flex-grow-1', 'p-3 my-4']">
                Common Message Zone on mobile
              </b-card>
            </b-col>
          </b-row>
          <b-row class="">
            <b-col cols md="10" class="d-flex flex-column">
              <b-row class="mb-4 h-100">
                <b-col cols md="9" class="mb-4">
                  <b-card no-body :class="responsiveLayoutClass.card">
                    <img src="1-pc-xxl.png" alt="" :class="responsiveLayoutClass.img">
                  </b-card>
                </b-col>
                <b-col cols md="3" class="d-flex align-items-center justify-content-around justify-content-md-center justify-content-lg-around my-4 my-md-0">
                  <b-icon icon="display" font-scale="1.7" variant="secondary" class="d-md-none d-lg-inline-block" />
                  <b-iconstack font-scale="1.6" shift-h="-3.5" shift-v="2.5" class="d-none d-md-inline-block">
                    <b-icon icon="circle-fill" variant="dark" />
                    <b-icon icon="arrow-left-right" font-scale="0.5" shift-v="-8" shift-h="8" variant="white" />
                  </b-iconstack>
                  <b-iconstack font-scale="1.6" shift-h="-3.5" shift-v="2.5" class="d-md-none">
                    <b-icon icon="circle-fill" variant="dark" />
                    <b-icon
                      icon="arrow-left-right"
                      font-scale="0.5"
                      shift-v="-8"
                      shift-h="8"
                      variant="white"
                      rotate="-90"
                    />
                  </b-iconstack>
                  <b-icon icon="phone" font-scale="1.7" variant="secondary" class="d-md-none d-lg-inline-block" />
                </b-col>
                <b-col cols md="3" class="d-none d-md-flex align-items-center justify-content-around">
                  <b-icon icon="tablet" font-scale="1.7" variant="secondary" class="d-md-none d-lg-inline-block" />
                  <b-iconstack font-scale="1.6" shift-h="-3.5" shift-v="2.5">
                    <b-icon icon="circle-fill" variant="dark" />
                    <b-icon
                      icon="arrow-left-right"
                      font-scale="0.5"
                      shift-v="-8"
                      shift-h="8"
                      variant="white"
                      rotate="-90"
                    />
                  </b-iconstack>
                  <b-icon icon="display" font-scale="1.7" variant="secondary" class="d-md-none d-lg-inline-block" />
                </b-col>
                <b-col cols md="7" offset-md="1">
                  <b-card no-body :class="['d-none d-md-flex', responsiveLayoutClass.card, 'flex-grow-1', 'p-3 my-5']">
                    Common Message Zone on md size device
                  </b-card>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols md="2" class="d-flex flex-column align-items-end mb-4 mb-md-1">
              <div class="mb-4 mb-md-0 w-100">
                <b-card no-body :class="responsiveLayoutClass.card">
                  <img src="4-1-mobile-xs.png" alt="" :class="responsiveLayoutClass.img">
                </b-card>
              </div>
              <div class="d-flex align-items-center justify-content-around justify-content-md-center justify-content-lg-between justify-content-xl-around my-4 my-md-auto my-xl-4 w-100">
                <b-icon icon="tablet-landscape" font-scale="1.7" variant="secondary" class="d-md-none d-lg-inline-block" />
                <b-iconstack font-scale="1.6" shift-h="-3.5" shift-v="2.5">
                  <b-icon icon="circle-fill" variant="dark" />
                  <b-icon
                    icon="arrow-left-right"
                    font-scale="0.5"
                    shift-v="-8"
                    shift-h="8"
                    variant="white"
                    rotate="-90"
                  />
                </b-iconstack>
                <b-icon icon="phone" font-scale="1.7" variant="secondary" class="d-md-none d-lg-inline-block" />
              </div>
            </b-col>
            <b-col cols md="12">
              <b-row>
                <b-col cols md="4" class="mb-4 mb-md-0">
                  <b-card no-body :class="responsiveLayoutClass.card">
                    <img src="3-tablet-md.png" alt="" :class="responsiveLayoutClass.img">
                  </b-card>
                </b-col>
                <b-col cols md="2" class="d-flex align-items-center justify-content-around justify-content-md-center justify-content-lg-between py-4 mb-4 my-md-0">
                  <b-icon icon="tablet" font-scale="1.7" variant="secondary" class="d-md-none d-lg-inline-block" />
                  <b-iconstack font-scale="1.6" shift-h="-3.5" shift-v="2.5" class="d-none d-md-inline-block">
                    <b-icon icon="circle-fill" variant="dark" />
                    <b-icon icon="arrow-left-right" font-scale="0.5" shift-v="-8" shift-h="8" variant="white" />
                  </b-iconstack>
                  <b-iconstack font-scale="1.6" shift-h="-3.5" shift-v="2.5" class="d-md-none">
                    <b-icon icon="circle-fill" variant="dark" />
                    <b-icon
                      icon="arrow-left-right"
                      font-scale="0.5"
                      shift-v="-8"
                      shift-h="8"
                      variant="white"
                      rotate="-90"
                    />
                  </b-iconstack>
                  <b-icon icon="tablet-landscape" font-scale="1.7" variant="secondary" class="d-md-none d-lg-inline-block" />
                </b-col>
                <b-col cols md="6">
                  <b-card no-body :class="responsiveLayoutClass.card">
                    <img src="2-tablet-md.png" alt="" :class="responsiveLayoutClass.img">
                  </b-card>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <!-- Project Pages -->
      <b-row align-h="center" class="flex-column bg-white mb-5 py-5">
        <b-col cols="12" class="text-center mb-5 mb-md-4">
          <h2>Project Pages</h2>
        </b-col>
        <b-col cols="12">
          <b-row align-h="center" class="mb-4">
            <b-col
              v-for="(page, index) in pagesGrp.grp1"
              :key="index"
              cols
              md="4"
              lg="3"
            >
              <img :src="page.src" :title="page.title" :alt="page.title" class="w-100 shadow-sm rounded-sm mb-3">
              <p class="text-secondary text-center mb-0">{{ page.type }}</p>
            </b-col>
          </b-row>
          <b-row align-h="center">
            <b-col
              v-for="(page, index) in pagesGrp.grp1"
              :key="index"
              cols
              md="4"
              lg="3"
            >
              <img :src="page.src" :title="page.title" :alt="page.title" class="w-100 shadow-sm rounded-sm mb-3">
              <p class="text-secondary text-center font-weight-bold mb-0">{{ page.type }}</p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import { BIconLayoutTextWindowReverse, BIconLayoutWtf } from "bootstrap-vue"

export default {
  components: {
    Fragment,
    BIconLayoutTextWindowReverse,
    BIconLayoutWtf
  },
  layout: null,
  data: () => ({
    responsiveLayoutClass: {
      card: 'shadow border-0',
      img: 'w-100 rounded'
    },
    pagesGrp: {
      grp1: [
        { src: 'overview_page.png', type: 'Dashboard Page', title: 'Overview', routeName: 'overview' },
        { src: 'eventsList_page.png', type: 'List Page', title: 'Events List', routeName: 'eventsList' },
        { src: 'usersStatics_page.png', type: 'Analytics Page', title: 'Users Statics', routeName: 'userStatics' }
      ],
      grp2: [
        { src: 'userDetailed_page.png', type: 'Information Details Page', title: 'User Detail', routeName: null },
        { src: 'signup_page.png', type: 'Authentication Type Page', title: 'Sign Up', routeName: 'signin' },
        { src: '404_page.png', type: 'Utility Page', title: '404 Page', routeName: 'notFound' }
      ]
    }
  }),
  async created () {
    // await this.callAPITest()
  },
  methods: {
    async callAPITest () {
      try {
        console.log('callAPITest ~ ')
        // console.log(`            ~ `)
        const res = await this.$axios.$get('/test/')
        console.log('            ~ res => ', res)
      } catch (e) {
        console.log('            ~ e => ', e)
        console.log('            ~ e.response => ', e.response)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/custom/landing.scss';
</style>
