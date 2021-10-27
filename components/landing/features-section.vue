<template>
  <b-row id="featureSection" class="py-5 mb-5 bg-white landingFeature justify-content-center">
    <b-col class="text-center mb-5" cols="12">
      <h2 class="featureSection__title">Featured By</h2>
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
        <b-col cols v-bind="featureColumns" class="mb-4 featureEle featureEle--1">
          <feature
            title="Nuxt.js"
            description="Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components."
          >
            <img
              title="Nuxt.js"
              alt="Nuxt.js"
              height="40"
              class="mb-3 mb-md-auto"
              data-src="/nuxt_svg.svg"
              data-loaded="false"
            >
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4 featureEle featureEle--2">
          <feature
            title="BootstrapVue"
            description="Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components."
          >
            <img
              title="BootstrapVue"
              alt="BootstrapVue"
              height="40"
              class="mb-3"
              data-src="/bootstrapVue_svg.svg"
              data-loaded="false"
            >
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4 featureEle featureEle--3">
          <feature
            title="Express.js"
            description="Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components."
          >
            <img
              title="Express.js"
              alt="Express.js"
              height="30"
              class="mb-3 mb-lg-auto"
              data-src="/expressjs.svg"
              data-loaded="false"
            >
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4 mb-lg-0 featureEle featureEle--1">
          <feature
            title="Axios Module for Nuxt.js"
            description="Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components."
          >
            <img
              title="Axios Module for Nuxt.js"
              alt="Axios Module for Nuxt.js"
              height="20"
              class="mb-3 mb-lg-auto"
              data-src="/AxiosModule_svg.svg"
              data-loaded="false"
            >
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4 mb-lg-0 featureEle featureEle--2">
          <feature
            title="Layout with Sidebar and Nav"
            description="Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components."
          >
            <BIconLayoutTextWindowReverse title="Layout with Sidebar and Nav" font-scale="2" variant="dark" class="mb-3" />
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-sm-4 mb-lg-0 featureEle featureEle--3">
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
    },
    FSObserver: null,
    isShowTitle: false
  }),
  created () {},
  mounted () {
    this.observeFeatureSection()
  },
  methods: {
    observeFeatureSection () {
      const fsection = document.getElementById('featureSection')
      this.FSObserver = new IntersectionObserver(
        this.onFTSectionObserved,
        { rootMargin: '50px 0px', threshold: 0 }
      )
      this.FSObserver.observe(fsection)
    },
    onFTSectionObserved (entries, observer) {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('active')
        } else {
          target.classList.remove('active')
        }
      })
    },
    observeFeatureEle () {}
  }
}
</script>

<style lang="scss" scoped>
$transition-time-featureSection: 0.5s;

.landingFeature {
  position: relative;
  overflow: hidden;

  &__body {
    z-index: 1;
  }

  &::before,
  &::after {
    position: absolute;
    content: " ";
    padding: 0;
    transition-property: padding;
    transition-delay: $transition-time-featureSection;
    transition-duration: $transition-time-featureSection;
    transition-timing-function: ease-in-out;
  }

  &::before {
    background: linear-gradient(135deg, #153D77, #2F70AF);
    border-radius: 0 0 30rem 0;
    left: 0;
    box-shadow: 4px 0.5rem 0.25rem rgb(0 0 0 / 8%);
    @media (max-width: 575.98px) {
      top: 7rem;
    }

    @media (min-width: 576px) {
      top: 0rem;
    }
  }

  &::after {
    background: linear-gradient(135deg, #2F70AF, #153D77);
    border-radius: 30rem 0 0 0;
    right: 0;
    box-shadow: -4px -0.5rem 0.25rem rgb(0 0 0 / 8%);
    bottom: 0rem;
  }

  &.active {
    &::before {
      @media (max-width: 575.98px) {
        padding: 10rem 17rem 17rem 6.5rem;
      }

      @media (min-width: 576px) and (max-width: 991.98px) {
        padding: 9.5rem;
      }

      @media (min-width: 992px) {
        padding: 12rem;
      }
    }

    &::after {
      @media (max-width: 575.98px) {
        padding: 10rem 13.5rem 10rem 10rem;
      }

      @media (min-width: 576px) and (max-width: 991.98px) {
        padding: 5rem;
      }

      @media (min-width: 992px) {
        padding: 6.5rem;
      }
    }
  }
}

.featureEle {
  transition-property: opacity,;
  transition-delay: $transition-time-featureSection * 1.3;
  transition-duration: $transition-time-featureSection + 0.5ms;
  margin-bottom: 3.5rem;
}

.landingFeature:not(.active) .featureEle {
  opacity: 0.3;
}

.landingFeature.active .featureEle {
  opacity: 1;
}
</style>
