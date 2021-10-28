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
              <b-card id="responsive-lg" no-body :class="responsiveLayoutClass.card">
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
            <b-card id="responsive-mobile" no-body :class="responsiveLayoutClass.card">
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
              <b-card id="responsive-tablet" no-body :class="responsiveLayoutClass.card">
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
              <b-card id="responsive-tablet-landscape" no-body :class="responsiveLayoutClass.card">
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
      // shadow border-0
      card: 'layoutDeviceWrapper border-0',
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
    // this.layoutImags = document.querySelectorAll('#layoutSection img')
    this.observeLayoutSection()
    this.observeLayoutImgs()
    this.observeTransforms()
  },
  methods: {
    observeLayoutSection () {
      const fsection = document.getElementById('layoutSection')
      this.LSObserver = new IntersectionObserver(
        this.onLayoutSectionObserved,
        { rootMargin: '50px 0px', threshold: 0 }
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
            setTimeout(() => {
              const imgContainer = document.querySelector(img.dataset.activeTarget)
              img.dataset.loaded = true
              imgContainer.dataset.loaded = true
            }, 500)
          })
          observer.unobserve(target)
        }
      })
    },
    observeLayoutImgs () {
      const layoutImagsWrapperObserver = document.querySelectorAll('.layoutDeviceWrapper')
      this.layoutImagsObserver = new IntersectionObserver(
        this.onLayoutImgsHandler,
        { rootMargin: '-30px', threshold: 0.5 }
      )
      layoutImagsWrapperObserver.forEach(wrapper => this.layoutImagsObserver.observe(wrapper))
    },
    onLayoutImgsHandler (entries, observer) {
      console.log(`onTransformElehandler ~ `)
      // console.log(` ~ `)
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          console.log(` ~ isIntersecting => ${isIntersecting}`)
          console.log(` ~ target => `, target)
          target.classList.add('active')
        } else {
          target.classList.remove('active')
        }
      })
    },
    observeTransforms () {
      const transfers = document.querySelectorAll('.layoutTranformWrapper .layout__component')
      this.TransderObserver = new IntersectionObserver(
        this.onTransformsHandler,
        { rootMargin: '-50px 0px', threshold: 1 }
      )
      transfers.forEach(transfer => this.TransderObserver.observe(transfer))
    },
    onTransformsHandler (entries, observer) {
      console.log('onTransformElehandler ~ ')
      entries.forEach(({ target, isIntersecting }) => {
        // console.log(` ~ `)
        console.log(` ~ target => `, target)
        console.log(` ~ isIntersecting => `, isIntersecting)
        if (isIntersecting) {
          target.classList.add('active')
          if (!target.dataset.loaded) {
            target.dataset.loaded = 'loaded'
          }
        } else {
          target.classList.remove('active')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// $layout-transfer-color: #1b4c8c;
$layout-transfer-color: #6a99d7;
$layout-transfer-color-hover: #145DBB;
$layout-device-color: #ced4da;
$layout-device-color-hover: #343a40;

.layoutDeviceWrapper {
  // transition-property: opacity, box-shadow;
  // transition-duration: .1s;
  transition: opacity .4s;

  &[data-loaded="false"] {
    opacity: 0;
  }

  &[data-loaded="true"] {
    opacity: 1;
    transition: box-shadow, opacity .3s;
    // transition-delay: .3s;

    &:not(.active) {
      opacity: .7;
      box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
      border: 1px solid #f1f1ff !important;
    }

    &.active {
      opacity: 1;
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
      // border: 0px solid;
    }
  }
}

.layoutTranformWrapper::v-deep .layout__component {
  transition-property: opacity;
  transition-duration: 0.5s;
  transition-delay: 1s;

  &:not([data-loaded="loaded"]) {
    opacity: 0;
  }

  &[data-loaded="loaded"] {
    opacity: 1;

    .layout__device,
    .layout__transfer {
      transition-property: color;
      transition-delay: 0.5s;
      transition-duration: 0.3s;
    }

    .layout__transferWrapper {
      transition-property: box-shadow;
      transition-delay: 0.5s;
      transition-duration: 0.3s;
    }
  }

  &[data-loaded="loaded"]:not(.active) {
    .layout {
      &__device {
        color: $layout-device-color;
      }

      &__transfer {
        color: $layout-transfer-color;
      }
    }
  }

  &[data-loaded="loaded"].active {
    .layout {
      &__device {
        color: $layout-device-color-hover;
      }

      &__transferWrapper {
        box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
      }

      &__transfer {
        color: $layout-transfer-color-hover;
      }
    }
  }
}

</style>
