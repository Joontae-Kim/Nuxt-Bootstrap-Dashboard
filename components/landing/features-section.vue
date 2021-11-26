<template>
  <b-row id="featureSection" class="pt-5 pb-sm-5 mb-5 bg-white landingFeature justify-content-center">
    <b-col class="text-center text-dark mb-5" cols="12">
      <h2 class="d-none d-lg-block">Developed Nuxtrap with ...</h2>
      <h2 class="d-lg-none text-white">Developed Nuxtrap with ...</h2>
    </b-col>
    <b-col
      cols="12"
      md="11"
      lg="11"
      xl="9"
      xxl="8"
      class="landingFeature__body mb-md-5"
    >
      <b-row>
        <b-col cols v-bind="featureColumns" class="mb-4 featureEle featureEle--1">
          <feature
            title="Nuxt.js"
            description="Nuxt.js is a free and open source web application framework based on Vue.js, Node.js, Webpack and Babel.js."
          >
            <NuxtLogo alt="Nuxt.js" class="mb-3" style="font-size: 390%" />
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4 featureEle featureEle--2">
          <feature
            title="BootstrapVue"
            description="BootstrapVue provides one of the most comprehensive implementations of the Bootstrap v4 component and grid system available for Vue.js v2.6."
          >
            <bootstrapVueLogo alt="Nuxt.js" class="mb-3" style="font-size: 255%;" />
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4 featureEle featureEle--3">
          <feature
            title="Express.js"
            description="the most popular Node web framework, and is the underlying library for a number of other popular Node web frameworks."
          >
            <expressjsLogo alt="Nuxt.js" class="mb-3" style="font-size: 170%;" />
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4 mb-lg-0 featureEle featureEle--1">
          <feature
            title="Axios Module for Nuxt.js"
            description="Secure and easy Axios integration for Nuxt."
          >
            <AxiosModuleLogo class="mb-3" style="font-size: 255%;" />
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4 mb-lg-0 featureEle featureEle--2">
          <feature
            title="Sass"
            description="Sass is the most mature, stable, and powerful professional grade CSS extension language in the world."
          >
            <SassLogo class="mb-3" style="font-size: 255%;" />
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-sm-4 mb-lg-0 featureEle featureEle--3">
          <feature
            title="Chart.js"
            description="Simple yet flexible JavaScript charting for designers & developers."
          >
            <chartjsLogo class="mb-3" style="font-size: 255%;" />
          </feature>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import lazyLoad from '~/mixins/lazyLoad'
import NuxtLogo from "~/assets/svgs/nuxt.svg?inline"
import bootstrapVueLogo from "~/assets/svgs/bootstrapVue.svg?inline"
import expressjsLogo from "~/assets/svgs/expressjs.svg?inline"
import AxiosModuleLogo from "~/assets/svgs/AxiosModule.svg?inline"
import SassLogo from "~/assets/svgs/sass.svg?inline"
import chartjsLogo from "~/assets/svgs/chartjs.svg?inline"
import feature from '~/components/landing/ui/feature'

export default {
  name: 'LandingFeature',
  components: {
    NuxtLogo,
    bootstrapVueLogo,
    expressjsLogo,
    AxiosModuleLogo,
    SassLogo,
    chartjsLogo,
    feature
  },
  mixins: [
    lazyLoad
  ],
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
    isShowTitle: false
  }),
  computed: {
    featureSectionObserveOption () {
      return window.innerWidth > 992
        ? { rootMargin: '0px', threshold: 0.5 }
        : { rootMargin: '0px', threshold: 0.3 }
    }
  },
  created () {},
  mounted () {
    this.createLazyload(
      target => target.classList.add('active'),
      this.featureSectionObserveOption,
      document.querySelectorAll('#featureSection')
    )
  }
}
</script>

<style lang="scss" scoped>
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
    @media (max-width: 991.98px) {
      width: 0%;
      height: 0%;
      transition-property: width, height;
      transition-duration: 0.5s;
      transition-timing-function: ease-in-out;
    }

    @media (min-width: 992px) {
      padding: 0;
      transition: padding 0.5s ease-in-out 0.7s;
    }
  }

  &::before {
    top: 0;
    left: 0;
    box-shadow: 4px 0.5rem 0.25rem rgb(0 0 0 / 8%);
    background: linear-gradient(135deg, #153D77, #2F70AF);

    @media (max-width: 479.98px) {
      border-radius: 0 0 15rem 0;
    }

    @media (min-width: 480px) {
      border-radius: 0 0 30rem 0;
    }
  }

  &::after {
    bottom: 0;
    right: 0;
    box-shadow: -4px -0.5rem 0.25rem rgb(0 0 0 / 8%);
    background: linear-gradient(180deg, #2F70AF, #153D77);
    @media (max-width: 991.98px) {
      transition-delay: 1.5s;
    }

    @media (max-width: 479.98px) {
      border-radius: 15rem 0 0 0;
    }

    @media (min-width: 480px) {
      border-radius: 30rem 0 0 0;
    }
  }

  &.active {
    @media (max-width: 479.98px) {
      &::before,
      &::after {
        width: 100%;
        height: 50%;
      }
    }

    @media (min-width: 480px) and (max-width: 991.98px) {
      &::before {
        width: 85%;
        height: 55%;
      }

      &::after {
        width: 55%;
        height: 30%;
      }
    }

    @media (min-width: 992px) {
      &::before {
        padding: 9.5rem;
      }

      &::after {
        padding: 6.5rem;
      }
    }
  }
}

.featureEle {
  transition: opacity 0.5s ease-in-out;
  margin-bottom: 3.5rem;
}

.landingFeature {
  &:not(.active) .featureEle {
    opacity: 0;
  }

  .active .featureEle {
    opacity: 1;
  }
}
</style>
