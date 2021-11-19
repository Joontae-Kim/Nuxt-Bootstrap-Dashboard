<template>
  <b-row id="layoutSection" class="mb-5 py-5" align-h="center">
    <b-col cols="12" class="text-center mb-5">
      <h2 class="mb-0">Responsive Layout & Mobile Friendly Interface</h2>
    </b-col>
    <b-col cols="12" md="12" lg="11" xl="10">
      <b-row no-gutters class="d-flex d-md-none">
        <b-col cols>
          <layoutHeader />
        </b-col>
      </b-row>
      <b-row class="">
        <b-col cols md="10" class="d-flex flex-column">
          <b-row class="mb-4 h-100">
            <b-col cols md="9" class="mb-4">
              <b-card id="responsive-lg" no-body :class="[responsiveLayoutClass.card, 'left']">
                <img
                  alt=""
                  :class="responsiveLayoutClass.img"
                  data-src="/1-pc-xxl.png"
                  data-loaded="false"
                  data-active-target="#responsive-lg"
                >
              </b-card>
            </b-col>
            <b-col cols md="3" class="d-flex align-items-center justify-content-center my-4 my-md-0 layoutTranformWrapper">
              <layoutTransform class="flex-md-column-reverse justify-content-sm-around" left-icon="phone" right-icon="display" />
            </b-col>
            <b-col cols md="3" class="d-none d-md-flex align-items-center justify-content-center layoutTranformWrapper">
              <layoutTransform
                class="flex-sm-column-reverse justify-content-lg-between justify-content-xl-around"
                left-icon="tablet"
                right-icon="display"
                :vertical="true"
              />
            </b-col>
            <b-col class="d-none d-md-block mx-md-auto" cols md="8" lg="7" offset-lg="1">
              <layoutHeader />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols md="2" class="d-flex flex-column align-items-end mb-4 mb-md-0 layoutTranformWrapper">
          <div class="mb-4 mb-md-0 w-100">
            <b-card id="responsive-mobile" no-body :class="[responsiveLayoutClass.card, 'right']">
              <img
                alt=""
                :class="responsiveLayoutClass.img"
                data-src="/4-1-mobile-xs.png"
                data-loaded="false"
                data-active-target="#responsive-mobile"
              >
            </b-card>
          </div>
          <layoutTransform class="flex-md-column-reverse justify-content-lg-between my-4 my-md-auto my-xl-4 w-100" right-icon="phone" :vertical="true">
            <template #left-icon>
              <div class="layout__deviceWrapper">
                <b-icon icon="tablet-landscape" font-scale="1.5" class="d-none d-md-inline-block layout__device" />
                <b-icon icon="tablet" font-scale="1.5" class="d-inline-block d-md-none layout__device" />
              </div>
            </template>
          </layoutTransform>
        </b-col>
        <b-col cols md="12">
          <b-row>
            <b-col cols md="4" class="mb-4 mb-md-0">
              <b-card id="responsive-tablet" no-body :class="[responsiveLayoutClass.card, 'left']">
                <img
                  alt=""
                  :class="responsiveLayoutClass.img"
                  data-src="3-tablet-md.png"
                  data-loaded="false"
                  data-active-target="#responsive-tablet"
                >
              </b-card>
            </b-col>
            <b-col cols md="2" class="d-flex align-items-center py-4 mb-4 my-md-0 layoutTranformWrapper">
              <layoutTransform class="flex-sm-column-reverse justify-content-lg-between">
                <template #left-icon>
                  <!-- <div class="layout__deviceWrapper"></div> -->
                  <div class="layout__deviceWrapper">
                    <b-icon icon="tablet" font-scale="1.5" class="d-none d-lg-inline-block layout__device" />
                    <b-icon icon="tablet-landscape" font-scale="1.5" class="d-inline-block d-lg-none layout__device" />
                  </div>
                </template>
                <template #right-icon>
                  <!-- <div class="layout__deviceWrapper"></div> -->
                  <div class="layout__deviceWrapper">
                    <b-icon icon="tablet-landscape" font-scale="1.5" class="d-none d-lg-inline-block layout__device" />
                    <b-icon icon="tablet" font-scale="1.5" class="d-inline-block d-lg-none layout__device" />
                  </div>
                </template>
              </layoutTransform>
            </b-col>
            <b-col cols md="6">
              <b-card id="responsive-tablet-landscape" no-body :class="[responsiveLayoutClass.card, 'right']">
                <img
                  alt=""
                  :class="responsiveLayoutClass.img"
                  data-src="2-tablet-md.png"
                  data-loaded="false"
                  data-active-target="#responsive-tablet-landscape"
                >
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>

import layoutTransform from "~/components/landing/ui/layout-transform"
import layoutHeader from "~/components/landing/layout-header"

export default {
  name: 'LayoutSection',
  components: {
    layoutTransform,
    layoutHeader
  },
  data: () => ({
    responsiveLayoutClass: {
      card: 'layoutDeviceWrapper',
      img: 'w-100 rounded'
    },
    LSObserver: null,
    TransderObserver: null,
    layoutImagsWrapperObserver: null
  }),
  computed: {
    observeLayoutImgsConfig () {
      return window.innerWidth > 576
        ? { rootMargin: '0px', threshold: 0.3 }
        : { rootMargin: '30px', threshold: [0, 0.3] }
    }
  },
  created () {},
  mounted () {
    this.observeLayoutImgs()
    this.observeTransforms()
  },
  methods: {
    observeLayoutImgs () {
      const layoutImagsWrapperObserver = document.querySelectorAll('.layoutDeviceWrapper img')
      this.layoutImagsObserver = new IntersectionObserver(
        this.onLayoutImgsHandler,
        this.observeLayoutImgsConfig
      )
      layoutImagsWrapperObserver.forEach(wrapper => this.layoutImagsObserver.observe(wrapper))
    },
    onLayoutImgsHandler (entries, observer) {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          const imgContainer = document.querySelector(target.dataset.activeTarget)
          imgContainer.classList.add('active')
          observer.unobserve(target)
        }
      })
    },
    observeTransforms () {
      const transfers = document.querySelectorAll('.layout__component')
      this.TransderObserver = new IntersectionObserver(
        this.onTransformsHandler,
        { rootMargin: '0px', threshold: 1 }
      )
      transfers.forEach(transfer => this.TransderObserver.observe(transfer))
    },
    onTransformsHandler (entries, observer) {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          if (!target.classList.contains('active')) {
            target.classList.add('active')
          }
          target.classList.add('observed')
          observer.unobserve(target)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@use "sass:map";

$layout-device-color: #adb5bd;
$layout-transfer-color: #adb5bd;
$layout-transfer-color-observed: #343a40;

.layoutDeviceWrapper {
  transition: opacity 0.3s ease-in-out 1s, transform 1s ease-in-out 1s;
  &[data-loaded="false"] {
    opacity: 0;
  }

  &:not(.active) {
    opacity: 0;
    box-shadow: 0 0.25rem 0.5rem rgb(0 0 0 / 15%);
    @media (max-width: 575.98px) {
      transform: translateY(1.5rem);
    }

    @media (min-width: 576px) {
      &.right {
        transform: translateX(7rem);
      }
      &.left {
        transform: translateX(-7rem);
      }
    }
  }

  &.active {
    opacity: 1;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    @media (max-width: 575.98px) {
      transform: translateY(0rem);
    }
    @media (min-width: 576px) {
      transform: translateX(0rem);
    }
  }
}

.layoutTranformWrapper::v-deep .layout__component {
  transition: opacity .5s ease-in-out .5s;

  &:not(.active) {
    opacity: 0;
  }

  &.active {
    opacity: 1;
  }

  $layout__ele-common-transition: .5s ease-in-out;

  .layout__deviceWrapper {
    background: linear-gradient(135deg, #153D77, #2F70AF);
    border-radius: 25px;
    box-shadow: 0 0.125rem 0.25rem #ced4da;
    @media (max-width: 575.98px) {
      width: 50px;
      height: 50px;
    }

    @media (min-width: 576px) {
      width: 40px;
      height: 40px;
    }
    position: relative;
  }

  .layout__device {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 575.98px) {
      transition: border-radius, background, color .3s ease-in-out .3s,
        font-size, padding, box-shadow #{$layout__ele-common-transition} .5s;
    }
    @media (min-width: 576px) {
      transition: color 0.1s ease-in-out,
        border-radius, font-size 0.3s ease-in-out,
        padding, background, box-shadow #{$layout__ele-common-transition} 0.5s;
    }
  }

  .layout__transfer {
    transition: font-size, color #{$layout__ele-common-transition} 0.3s;
  }

  &:not(.observed) {
    .layout__device {
      color: $layout-device-color;
    }

    .layout__transfer {
      color: $layout-transfer-color;
    }
  }

  &.observed {
    .layout__device {
      color: #ffffff !important;

      @media (max-width: 575.98px) {
        font-size: 170% !important;
      }

      @media (min-width: 576px) {
        font-size: 140% !important;
      }
    }

    .layout__transfer {
      @media (max-width: 575.98px) {
        font-size: 140% !important;
      }
      color: $layout-transfer-color-observed;
    }
  }
}

</style>
