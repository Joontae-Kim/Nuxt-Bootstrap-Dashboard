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
      <b-row class="flex-column py-5 bg-white landingFeature">
        <b-col class="text-center mb-5 mb-md-4" cols>
          <h4>Featured By</h4>
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
