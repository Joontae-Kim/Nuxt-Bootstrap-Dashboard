<template>
  <b-row id="featureSection" class="pt-5 pb-sm-5 mb-5 bg-white landingFeature justify-content-center">
    <b-col class="text-center text-dark mb-5" cols="12">
      <!-- <div class="fs-2 text-dark">
        Developed <span class="font-weight-bold mx-2">"Nuxtrap"</span> with ...
      </div> -->
      <h2 class="d-none d-sm-block">Developed Nuxtrap with ...</h2>
      <h2 class="d-sm-none text-white">Developed Nuxtrap with ...</h2>
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
            description="Nuxt.js is a free and open source web application framework based on Vue.js, Node.js, Webpack and Babel.js."
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
            description="BootstrapVue provides one of the most comprehensive implementations of the Bootstrap v4 component and grid system available for Vue.js v2.6."
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
            description="the most popular Node web framework, and is the underlying library for a number of other popular Node web frameworks."
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
            description="Secure and easy Axios integration for Nuxt."
          >
            <img
              title="Axios Module for Nuxt.js"
              alt="Axios Module for Nuxt.js"
              height="20"
              class="mt-2 mb-4"
              data-src="/AxiosModule_svg.svg"
              data-loaded="false"
            >
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-4 mb-lg-0 featureEle featureEle--2">
          <feature
            title="Sass"
            description="Sass is the most mature, stable, and powerful professional grade CSS extension language in the world."
          >
            <img
              title="Sass"
              alt="Sass"
              width="45"
              class="mb-3"
              data-src="/Sass.svg"
              data-loaded="false"
            >
          </feature>
        </b-col>
        <b-col cols v-bind="featureColumns" class="mb-sm-4 mb-lg-0 featureEle featureEle--3">
          <feature
            title="Chart.js"
            description="Simple yet flexible JavaScript charting for designers & developers."
          >
            <img
              title="Chart.js"
              alt="Chart.js"
              width="30"
              class="mb-3"
              data-src="/chartjs.svg"
              data-loaded="false"
            >
          </feature>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import feature from '~/components/landing/ui/feature'

export default {
  name: 'LandingFeature',
  components: {
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
        { rootMargin: '0px', threshold: 0.5 }
      )
      this.FSObserver.observe(fsection)
    },
    onFTSectionObserved (entries, observer) {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('active')
          observer.unobserve(target)
        }
      })
    }
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
    padding: 0;
    @media (min-width: 576px) {
      transition: padding 0.5s ease-in-out 0.7s;
    }
  }

  @media (max-width: 575.98px) {
    &::before {
      transition: padding 0.5s ease-in-out;
    }
    &::after {
      transition: padding 0.5s ease-in-out 1.5s;
    }
  }

  &::before {
    top: 0;
    left: 0;
    border-radius: 0 0 30rem 0;
    box-shadow: 4px 0.5rem 0.25rem rgb(0 0 0 / 8%);
    @media (max-width: 575.98px) {
      background: linear-gradient(180deg, #153D77, #2F70AF);
    }

    @media (min-width: 576px) {
      background: linear-gradient(135deg, #153D77, #2F70AF);
    }
  }

  &::after {
    right: 0;
    bottom: 0;
    border-radius: 30rem 0 0 0;
    box-shadow: -4px -0.5rem 0.25rem rgb(0 0 0 / 8%);
    @media (max-width: 575.98px) {
      background: linear-gradient(180deg, #2F70AF, #153D77);
    }

    @media (min-width: 576px) {
      background: linear-gradient(135deg, #2F70AF, #153D77);
    }
  }

  &.active {
    &::before {
      @media (max-width: 575.98px) {
        padding: 25rem 17rem 17rem 6.5rem;
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
        padding: 17rem 13.5rem 25rem 10rem;
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
