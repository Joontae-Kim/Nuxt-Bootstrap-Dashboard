<template>
  <b-row class="py-5 mb-5 bg-white landingFeature justify-content-center">
    <b-col class="text-center mb-5" cols="12">
      <h2>Featured By</h2>
    </b-col>
    <b-col
      cols="12"
      md="11"
      lg="11"
      xl="9"
      xxl="8"
      class="landingFeature__body"
    >
      <b-row>
        <b-col cols v-bind="featureColumns" class="mb-4">
          <feature
            title="Nuxt.js"
            description="Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components."
          >
            <img src="~/static/nuxt_svg.svg" title="Nuxt.js" alt="Nuxt.js" height="40" class="mb-3 mb-md-auto">
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4">
          <feature
            title="BootstrapVue"
            description="Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components."
          >
            <img src="~/static/bootstrapVue_svg.svg" title="BootstrapVue" alt="BootstrapVue" height="40" class="mb-3">
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4">
          <feature
            title="Express.js"
            description="Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components."
          >
            <img src="~/static/expressjs.svg" title="Express.js" alt="Express.js" height="30" class="mb-3 mb-lg-auto">
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4 mb-lg-0">
          <feature
            title="Axios Module for Nuxt.js"
            description="Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components."
          >
            <img src="~/static/AxiosModule_svg.svg" title="Axios Module for Nuxt.js" alt="Axios Module for Nuxt.js" height="20" class="mb-3 mb-lg-auto">
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4 mb-lg-0">
          <feature
            title="Layout with Sidebar and Nav"
            description="Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components."
          >
            <BIconLayoutTextWindowReverse title="Layout with Sidebar and Nav" font-scale="2" variant="dark" class="mb-3" />
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-sm-4 mb-lg-0">
          <feature
            title="Responsive Design"
            description="Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components."
          >
            <BIconLayoutWtf title="Responsive Design" font-scale="2" variant="dark" class="mb-3 mb-md-auto" />
          </feature>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { BIconLayoutTextWindowReverse, BIconLayoutWtf } from "bootstrap-vue"
import feature from '~/components/landing/ui/feature'

export default {
  name: 'LandingFeature',
  components: {
    BIconLayoutTextWindowReverse,
    BIconLayoutWtf,
    feature
  },
  data: () => ({
    featureColumns: {
      sm: '6',
      lg: '4',
      xl: '4'
    },
    featureColumnClass: {
      top: 'mb-md-4',
      bottom: ''
    }
  })
}
</script>

<style lang="scss" scoped>
.landingFeature {
  position: relative;
  overflow: hidden;

  &__body {
    z-index: 1;
  }

  &::before {
    position: absolute;
    content: " ";
    background: linear-gradient(135deg, #153D77, #2F70AF);
    border-radius: 0 0 30rem 0;
    left: 0;
    box-shadow: 4px 0.5rem 0.25rem rgb(0 0 0 / 8%);

    @media (max-width: 575.98px) {
      top: 7rem;
      padding: 10rem 17rem 17rem 6.5rem;
    }

    @media (min-width: 576px) and (max-width: 991.98px) {
      top: 0rem;
      padding: 9.5rem;
    }

    @media (min-width: 992px) {
      top: 0rem;
      padding: 12rem;
    }
  }

  &::after {
    position: absolute;
    content: " ";
    background: linear-gradient(135deg, #2F70AF, #153D77);
    border-radius: 30rem 0 0 0;
    right: 0;
    box-shadow: -4px -0.5rem 0.25rem rgb(0 0 0 / 8%);

    @media (max-width: 575.98px) {
      bottom: 0rem;
      padding: 10rem 13.5rem 10rem 10rem;
    }

    @media (min-width: 576px) and (max-width: 991.98px) {
      bottom: 0;
      padding: 5rem;
    }

    @media (min-width: 992px) {
      bottom: 0;
      padding: 6.5rem;
    }
  }
}
</style>
