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
                  data-rd-md="container"
                >
              </b-card>
            </b-col>
            <b-col cols md="3" class="d-flex align-items-center justify-content-center my-4 my-md-0 layoutTranformWrapper">
              <layoutTransform class="justify-content-xl-around" left-icon="display" right-icon="phone" />
            </b-col>
            <b-col cols md="3" class="d-none d-md-flex align-items-center justify-content-center layoutTranformWrapper">
              <layoutTransform class="justify-content-xl-around" left-icon="tablet" right-icon="display" :vertical="true" />
            </b-col>
            <b-col class="d-none d-md-block" cols md="9" lg="7" offset-lg="1">
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
                data-rd-md="container"
              >
            </b-card>
          </div>
          <layoutTransform class="my-4 my-md-auto my-xl-4 w-100" right-icon="phone" :vertical="true">
            <template #left-icon>
              <b-icon icon="tablet-landscape" font-scale="1.5" class="d-none d-lg-inline-block layout__device" />
              <b-icon icon="tablet" font-scale="1.5" class="d-inline-block d-md-none layout__device" />
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
                  data-rd-md="container"
                >
              </b-card>
            </b-col>
            <b-col cols md="2" class="d-flex align-items-center py-4 mb-4 my-md-0 layoutTranformWrapper">
              <layoutTransform>
                <template #left-icon>
                  <b-icon icon="tablet" font-scale="1.5" class="d-none d-lg-inline-block layout__device" />
                  <b-icon icon="tablet-landscape" font-scale="1.5" class="d-inline-block d-md-none layout__device" />
                </template>
                <template #right-icon>
                  <b-icon icon="tablet-landscape" font-scale="1.5" class="d-none d-lg-inline-block layout__device" />
                  <b-icon icon="tablet" font-scale="1.5" class="d-inline-block d-md-none layout__device" />
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
                  data-rd-md="container"
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
    iconArrowLeftRightStackProps: {
      fontScale: 1.2,
      class: 'my-auto mx-4'
    },
    iconArrowLeftRightProps: {
      icon: 'arrow-left-right',
      fontScale: 0.45,
      shiftV: -10,
      shiftH: 10,
      variant: 'white'
    },
    LSObserver: null,
    TransderObserver: null,
    layoutImagsWrapperObserver: null
  }),
  created () {},
  mounted () {
    this.layoutImags = document.querySelectorAll('#layoutSection img')
    this.observeLayoutSection()
    this.observeLayoutImgs()
    this.observeTransforms()
  },
  methods: {
    observeLayoutSection () {
      const fsection = document.getElementById('layoutSection')
      this.LSObserver = new IntersectionObserver(
        this.onLayoutSectionObserved,
        { rootMargin: '70px 0px', threshold: 0 }
      )
      this.LSObserver.observe(fsection)
    },
    onLayoutSectionObserved (entries, observer) {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          const layoutImags = document.querySelectorAll('#layoutSection img')
          layoutImags.forEach((img) => {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
            img.dataset.loaded = true
            const imgContainer = document.querySelector(img.dataset.activeTarget)
            imgContainer.dataset.loaded = true
          })
          observer.unobserve(target)
        }
      })
    },
    observeLayoutImgs () {
      const layoutImagsWrapperObserver = document.querySelectorAll('.layoutDeviceWrapper img')
      this.layoutImagsObserver = new IntersectionObserver(
        this.onLayoutImgsHandler,
        { rootMargin: '0px', threshold: 0.5 }
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
      console.log(` ~ transfers => `, transfers)
      this.TransderObserver = new IntersectionObserver(
        this.onTransformsHandler,
        { rootMargin: '0px', threshold: 1 }
      )
      transfers.forEach(transfer => this.TransderObserver.observe(transfer))
    },
    onTransformsHandler (entries, observer) {
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
@use "sass:map";

$layout-device-color: #adb5bd;
$layout-transfer-color: #adb5bd;
$layout-transfer-color-observed-0: #495057;
$layout-transfer-color-observed-1: #343a40;

.layoutDeviceWrapper {
  transition: opacity .3s ease-in-out, transform 500ms ease-in-out 25ms;
  &[data-loaded="false"] {
    opacity: 0;
  }

  &[data-loaded="true"] {
    &:not(.active) {
      opacity: 0;
      box-shadow: 0 0.25rem 0.5rem rgb(0 0 0 / 15%);
      &.right {
        transform: translateX(7rem);
      }
      &.left {
        transform: translateX(-7rem);
      }
    }

    &.active {
      opacity: 1;
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
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

  .layout__device {
    color: $layout-device-color;
  }

  .layout__transfer {
    &:not(.observed) {
      color: $layout-transfer-color;
    }
    &.observed {
      color: $layout-transfer-color-observed-1;
    }
  }
}

</style>
