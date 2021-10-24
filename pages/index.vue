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
    <!-- footer -->
    <footer class="bg-transparent py-5">
      <b-container fluid>
        <b-row>
          <b-col cols="12" offset-lg="1" md="5" lg="5">
            <div class="mb-5 mb-md-5">
              <NuxtLink :to="{ name: 'overview' }" class="">
                <img src="~/static/nuxt-bootstrap-logo.svg" alt="nuxt dashboard with bootstrap 4" title="Nuxtrap" height="35">
              </NuxtLink>
              <div class="w-100 w-md-75 mt-3 mt-md-4 text-secondary">
                <p class="d-none d-md-block">It's Nuxt Dashboard Propject with Bootstrap and BootstrapVue</p>
                <p class="d-block d-md-none fs-5 w-100 w-lg-75 mt-3 mt-md-4 text-secondary">It's Nuxt Dashboard Propject with Bootstrap and BootstrapVue</p>
              </div>
            </div>
            <div class="d-flex flex-wrap align-items-center justify-content-around justify-content-md-between w-100 w-lg-75 mb-5 mb-md-0">
              <a href="https://github.com/Joontae-Kim/Nuxt-Bootstrap-Dashboard" target="_blank" rel="noopener noreferrer" title="Github Repository for Nuxtrap" class="mt-3 mt-md-0 mr-3 text-dark">
                <BIconGithub font-scale="2.5" />
              </a>
              <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="mt-3 mt-md-0 mr-3">
                <img src="~/static/nuxt_svg.svg" title="Nuxt.js" alt="Nuxt.js" height="30" class="">
              </a>
              <a href="https://getbootstrap.com/docs/4.5/getting-started/introduction/" target="_blank" rel="noopener noreferrer" class="mt-3 mt-md-0 mr-3">
                <img src="~/static/bootstrapVue_svg.svg" title="BootstrapVue" alt="BootstrapVue" height="40">
              </a>
              <a href="https://www.chartjs.org/docs/2.9.4/" target="_blank" rel="noopener noreferrer" class="mt-3 mt-md-0 mr-3">
                <img src="~/static/chartjs.svg" title="Chart.js" alt="Chart.js" height="40">
              </a>
              <a href="https://axios.nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="mt-3 mt-xl-0">
                <img src="~/static/AxiosModule_svg.svg" title="Axios Module for Nuxt.js" alt="Axios Module for Nuxt.js" height="20">
              </a>
            </div>
          </b-col>
          <b-col cols="4" offset-md="1" offset-lg="0" md="2">
            <h5 class="text-dark mt-3 mb-4 my-md-3">Pages</h5>
            <ul class="list-unstyled mb-0">
              <li
                v-for="(page, f) in pagesLinks"
                :key="f"
                class="mt-3 mt-md-2"
              >
                <NuxtLink :to="{ name: page.name }" class="text-secondary">
                  {{ page.title }}
                </NuxtLink>
              </li>
            </ul>
          </b-col>
          <b-col cols="4" md="2">
            <h5 class="text-dark mt-3 mb-4 my-md-3">Used Features</h5>
            <ul class="list-unstyled mb-0">
              <li
                v-for="(feature, f) in UsedFeaturesLinks"
                :key="f"
                class="mt-3 mt-md-2"
              >
                <a :href="feature.link" class="text-secondary">{{ feature.title }}</a>
              </li>
            </ul>
          </b-col>
          <b-col cols="4" md="2">
            <h5 class="text-dark mt-3 mb-4 my-md-3">Discover</h5>
            <ul class="list-unstyled mb-0">
              <li
                v-for="(sample, f) in sampleLinks"
                :key="f"
                class="mt-3 mt-md-2"
              >
                <NuxtLink :to="{ name: sample.name }" class="text-secondary">
                  {{ sample.title }}
                </NuxtLink>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import { BIconGithub } from 'bootstrap-vue'
import layoutSection from "~/components/landing/layout-section"
import pagesSection from "~/components/landing/pages-section"
import featuresSection from "~/components/landing/features-section"

export default {
  components: {
    Fragment,
    layoutSection,
    pagesSection,
    featuresSection,
    BIconGithub
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
    },
    pagesLinks: [
      { title: 'Overview', name: 'overview' },
      { title: 'Events Page', name: 'eventsStatics' },
      { title: 'Users Page', name: 'userStatics' },
      { title: 'Sign In', name: 'signin' },
      { title: 'Sign Up', name: 'signup' },
      { title: 'Reset Password', name: 'resetpassword/' }
    ],
    UsedFeaturesLinks: [
      { title: 'Nuxt.js', link: 'https://nuxtjs.org/' },
      { title: 'Bootstrap', link: 'https://getbootstrap.com/docs/4.5/getting-started/introduction/' },
      { title: 'BootstrapVue', link: 'https://bootstrap-vue.org/' },
      { title: 'Chart.js', link: 'https://www.chartjs.org/docs/2.9.4/' },
      { title: 'Express.js', link: 'http://expressjs.com/ko/' },
      { title: 'Axios Module for Nuxt.js', link: 'https://axios.nuxtjs.org/' }
    ],
    sampleLinks: [
      { title: 'About Us', name: 'overview' },
      { title: 'Docs', name: 'overview' },
      { title: 'FAQ Page', name: 'overview' }
    ]
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
.landingIntro {
  position: relative;
  background: linear-gradient(45deg, #153D77, #2F70AF);
  padding: 4rem 0rem 6rem;
  margin-bottom: 4rem;

  &::before {
    content: " ";
    position: absolute;
    bottom: -0.1rem;
    height: 4.5rem;
    width: 100%;
    background: linear-gradient(-2.9deg, #fafbfe 49.7%, transparent 49.99%);
  }

  &__screenshot {
    width: 100%;
    border-radius: 3px;
  }
}

.landingText {
  &--light {
    color: #2F70AF;
  }

  &--normal {
    color: #153D77;
  }

  &--heavy {
    color: #002966;
  }
}
</style>
