<template>
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
</template>

<script>
import { BIconGithub } from 'bootstrap-vue'

export default {
  name: 'Footer',
  components: {
    BIconGithub
  },
  data: () => ({
    pagesLinks: [
      { title: 'Overview', name: 'overview' },
      { title: 'Events Page', name: 'eventsStatics' },
      { title: 'Users Page', name: 'userStatics' },
      { title: 'Sign In', name: 'signin' },
      { title: 'Sign Up', name: 'signup' },
      { title: 'Reset Password', name: 'resetpassword' }
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
  })
}
</script>

<style>

</style>
