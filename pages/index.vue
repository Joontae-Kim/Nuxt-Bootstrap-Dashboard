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
      <!-- Features -->
      <featuresSection />
      <!-- Fully Responsive Layout -->
      <layoutSection />
      <!-- Project Pages -->
      <pagesSection />
    </b-container>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import layoutSection from "~/components/landing/layout-section"
import pagesSection from "~/components/landing/pages-section"
import featuresSection from "~/components/landing/features-section"

export default {
  components: {
    Fragment,
    layoutSection,
    pagesSection,
    featuresSection
  },
  layout: null,
  data: () => ({
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
