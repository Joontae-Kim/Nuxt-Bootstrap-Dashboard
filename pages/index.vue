<template>
  <fragment>
    <b-row class="mx-0 py-md-5 landingIntro">
      <b-col cols="12" md="6" class="text-white align-self-center h-md-100">
        <div class="d-flex flex-column justify-content-md-center h-100 pb-md-5">
          <h1 class="">It's Nuxt Dashboard Propject</h1>
          <h3 class="font-weight-light">
            with Bootstrap and BootstrapVue
          </h3>
        </div>
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
      <b-row>
        <b-col class="">
          <h4>content</h4>
        </b-col>
      </b-row>
    </b-container>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
  components: {
    Fragment
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
