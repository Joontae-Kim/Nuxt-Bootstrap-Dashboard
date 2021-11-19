<template>
  <footer class="bg-transparent py-4 py-lg-5">
    <b-container fluid>
      <b-row>
        <b-col cols="12" offset-lg="1" md="6" lg="5">
          <div class="mb-4 mb-md-5">
            <NuxtLink :to="{ name: 'overview' }" class="">
              <img src="~/assets/images/nuxtstrap-logo.png" alt="Nuxtrap" height="35">
            </NuxtLink>
            <div class="w-100 w-md-75 mt-3 mt-md-4 text-secondary">
              <p class="d-none d-md-block">It's Nuxt Dashboard Propject with Bootstrap and BootstrapVue</p>
              <p class="d-block d-md-none fs-5 w-100 w-lg-75 mt-3 mt-md-4 text-secondary">It's Nuxt Dashboard Propject with Bootstrap and BootstrapVue</p>
            </div>
          </div>
          <div class="d-flex flex-wrap align-items-center justify-content-between mb-3 w-100 w-lg-75">
            <a href="https://github.com/Joontae-Kim/Nuxt-Bootstrap-Dashboard" target="_blank" rel="noopener noreferrer" title="Github Repository for Nuxtrap" class="text-dark">
              <BIconGithub font-scale="2.5" />
            </a>
            <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="">
              <NuxtLogo alt="Nuxt.js" class="" style="font-size: 340%" />
            </a>
            <a href="https://getbootstrap.com/docs/4.5/getting-started/introduction/" target="_blank" rel="noopener noreferrer" class="">
              <bootstrapVueLogo alt="" class="" style="font-size: 280%;" />
            </a>
            <a href="https://sass-lang.com" target="_blank" rel="noopener noreferrer" class="mr-md-3 mr-lg-0">
              <SassLogo style="font-size: 280%;" />
            </a>
          </div>
          <div class="d-flex flex-wrap align-items-center justify-content-between w-100 w-lg-75 mb-5 mb-md-0">
            <a href="https://www.chartjs.org/docs/2.9.4/" target="_blank" rel="noopener noreferrer" class="">
              <chartjsLogo class="my-md-auto" style="font-size: 280%;" />
            </a>
            <a href="https://expressjs.com/ko/" target="_blank" rel="noopener noreferrer" class="">
              <expressjsLogo alt="" class="my-auto" style="font-size: 180%;" />
            </a>
            <a href="https://axios.nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="mr-md-3 mr-lg-0">
              <AxiosModuleLogo class="my-auto" style="font-size: 250%;" />
            </a>
          </div>
        </b-col>
        <b-col cols="4" offset-md="0" offset-lg="0" md="2">
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
import NuxtLogo from "~/assets/svgs/nuxt.svg?inline"
import bootstrapVueLogo from "~/assets/svgs/bootstrapVue.svg?inline"
import expressjsLogo from "~/assets/svgs/expressjs.svg?inline"
import AxiosModuleLogo from "~/assets/svgs/AxiosModule.svg?inline"
import SassLogo from "~/assets/svgs/sass.svg?inline"
import chartjsLogo from "~/assets/svgs/chartjs.svg?inline"

export default {
  name: 'Footer',
  components: {
    BIconGithub,
    NuxtLogo,
    bootstrapVueLogo,
    expressjsLogo,
    AxiosModuleLogo,
    SassLogo,
    chartjsLogo
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
