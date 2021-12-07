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
              <b-card id="responsive-lg" no-body :class="[responsiveLayoutClass.card, 'layout--lg']">
                <img
                  :data-src="largeScale_srcset.src"
                  :sizes="largeScale_srcset.sizes"
                  :srcset="largeScale_srcset.srcset"
                  data-loaded="false"
                  :class="[responsiveLayoutClass.img, 'layout--left']"
                  alt=""
                >
              </b-card>
            </b-col>
            <b-col cols md="3" class="d-flex align-items-center justify-content-center my-4 my-md-0 layoutIcon">
              <layoutTransform class="flex-md-column-reverse justify-content-sm-around" left-icon="phone" right-icon="display" />
            </b-col>
            <b-col cols md="3" class="d-none d-md-flex align-items-center justify-content-center layoutIcon">
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
        <b-col cols md="2" class="d-flex flex-column align-items-end mb-4 mb-md-0 layoutIcon">
          <div class="mb-4 mb-md-0 w-100">
            <b-card id="responsive-mobile" no-body :class="[responsiveLayoutClass.card, 'layout--xs']">
              <img
                :data-src="mobile_srcset.src"
                :sizes="mobile_srcset.sizes"
                :srcset="mobile_srcset.srcset"
                data-loaded="false"
                :class="[responsiveLayoutClass.img, 'layout--right']"
                alt=""
              >
            </b-card>
          </div>
          <layoutTransform class="flex-md-column-reverse justify-content-lg-between my-4 my-md-auto my-xl-4 w-100" right-icon="phone" :vertical="true">
            <template #left-icon>
              <div class="layoutIcon__deviceWrapper">
                <b-icon icon="tablet-landscape" font-scale="1.5" class="d-none d-md-inline-block layoutIcon__device" />
                <b-icon icon="tablet" font-scale="1.5" class="d-inline-block d-md-none layoutIcon__device" />
              </div>
            </template>
          </layoutTransform>
        </b-col>
        <b-col cols md="12">
          <b-row>
            <b-col cols md="4" class="mb-4 mb-md-0">
              <b-card id="responsive-tablet" no-body :class="[responsiveLayoutClass.card, 'layout--md']">
                <img
                  :data-src="tablePortrait_srcset.src"
                  :sizes="tablePortrait_srcset.sizes"
                  :srcset="tablePortrait_srcset.srcset"
                  data-loaded="false"
                  :class="[responsiveLayoutClass.img, 'layout--left']"
                  alt=""
                >
              </b-card>
            </b-col>
            <b-col cols md="2" class="d-flex align-items-center py-4 mb-4 my-md-0 layoutIcon">
              <layoutTransform class="flex-sm-column-reverse justify-content-lg-between">
                <template #left-icon>
                  <div class="layoutIcon__deviceWrapper">
                    <b-icon icon="tablet" font-scale="1.5" class="d-none d-lg-inline-block layoutIcon__device" />
                    <b-icon icon="tablet-landscape" font-scale="1.5" class="d-inline-block d-lg-none layoutIcon__device" />
                  </div>
                </template>
                <template #right-icon>
                  <div class="layoutIcon__deviceWrapper">
                    <b-icon icon="tablet-landscape" font-scale="1.5" class="d-none d-lg-inline-block layoutIcon__device" />
                    <b-icon icon="tablet" font-scale="1.5" class="d-inline-block d-lg-none layoutIcon__device" />
                  </div>
                </template>
              </layoutTransform>
            </b-col>
            <b-col cols md="6">
              <b-card id="responsive-tablet-landscape" no-body :class="[responsiveLayoutClass.card, 'layout--md']">
                <img
                  :data-src="tableLandscape_srcset.src"
                  :sizes="tableLandscape_srcset.sizes"
                  :srcset="tableLandscape_srcset.srcset"
                  data-loaded="false"
                  :class="[responsiveLayoutClass.img, 'layout--right']"
                  alt=""
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
import lazyLoad from '~/mixins/lazyLoad'
import layoutTransform from "~/components/landing/ui/layout-transform"
import layoutHeader from "~/components/landing/layout-header"

export default {
  name: 'LayoutSection',
  components: {
    layoutTransform,
    layoutHeader
  },
  mixins: [
    lazyLoad
  ],
  data: () => ({
    responsiveLayoutClass: {
      card: 'layout',
      img: 'layout__img w-100 rounded'
    },
    layoutImagsWrapperObserver: null,
    imgSrcset_commonConfig: {
      modifiers: { format: 'png', quality: 80 }
    }
  }),
  computed: {
    largeScale_srcset () {
      return this.$img.getSizes('/images/landing/layout-largeScale.png', {
        sizes: 'xs:150vw sm:100vw xxl:120vw',
        modifiers: this.imgSrcset_commonConfig.modifiers
      })
    },
    mobile_srcset () {
      return this.$img.getSizes('/images/landing/layout-mobile.png', {
        sizes: 'xs:80vw sm:100vw',
        modifiers: this.imgSrcset_commonConfig.modifiers
      })
    },
    tablePortrait_srcset () {
      return this.$img.getSizes('/images/landing/layout-tablet-portrait.png', {
        sizes: 'xs:120vw sm:120vw lg:80vw',
        modifiers: this.imgSrcset_commonConfig.modifiers
      })
    },
    tableLandscape_srcset () {
      return this.$img.getSizes('/images/landing/layout-tablet-landscape.png', {
        sizes: 'xs:120vw sm:120vw lg:150vw',
        modifiers: this.imgSrcset_commonConfig.modifiers
      })
    },
    observeLayoutImgsConfig () {
      return window.innerWidth > 576
        ? { rootMargin: '0px', threshold: 0.3 }
        : { rootMargin: '30px', threshold: [0, 0.3] }
    }
  },
  created () {},
  mounted () {
    this.createLazyload(
      target => target.classList.add('active'),
      this.observeLayoutImgsConfig,
      document.querySelectorAll('.layout__img')
    )
    this.createLazyload(
      target => target.children.forEach((child) => {
        if (child.classList.contains('layoutIcon__deviceWrapper')) {
          child.classList.add('observed')
        }
      }),
      { rootMargin: '-25px 0px', threshold: 1 },
      document.querySelectorAll('.layout__component')
    )
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@use "sass:map";

.layout {
  border-width: 0px;

  &--xs {
    background: linear-gradient(180deg, rgba(18,59,121,0.3) 10% , #f5f5f5 30%);
  }

  &--md {
    background: linear-gradient(180deg, rgba(18, 59, 121, 0.35) 3.3%, #f5f5f5 20%);
  }

  &--lg {
    position: relative;
    background: linear-gradient(180deg, rgba(18,59,121,0.3) , #f5f5f5 30%);
    &::before {
      content: ' ';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 20%;
      height: 100%;
      background: linear-gradient(270deg, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.03) 0%);
    }
  }

  &__img {
    opacity: 0;
  }

  &__img.active {
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    @media (max-width: 575.98px) {
      animation-name: move-up;
      animation-timing-function: ease-in-out;
      animation-duration: 1s;
      animation-fill-mode: both;
    }

    @media (min-width: 576px) {
      &.layout--right,
      &.layout--right {
        animation-name: move-in-right;
      }
      &.layout--left {
        animation-name: move-in-left;
      }
    }
  }

  &--left,
  &--right {
    animation-timing-function: ease-in-out;
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }
}

.layoutIcon::v-deep .layout__component {
  .layoutIcon__deviceWrapper {
    position: relative;
    z-index: 1;
    @media (max-width: 575.98px) {
      width: 50px;
      height: 50px;
    }

    @media (min-width: 576px) {
      width: 40px;
      height: 40px;
    }
    border-radius: 25px;
    background: #e5e5e5;

    &::after {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 25px;
      transition: opacity 0.7s ease-out .5s;
      box-shadow: 0 0.125rem 0.25rem #ced4da;
      background-image: linear-gradient(135deg, #153D77, #2F70AF);
      z-index: 2;
      opacity: 0;
    }

    &.observed::after {
      opacity: 1;
    }

    .layoutIcon__device {
      z-index: 3;
    }
  }

  .layoutIcon__device {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    color: #6c757d;
  }
}

@keyframes move-up {
  0% {
    opacity: 0;
    transform: translateY(1.5rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0rem);
  }
}

@keyframes move-in-left {
  0% {
    opacity: 0;
    transform: translateX(-3rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0rem);
  }
}

@keyframes move-in-right {
  0% {
    opacity: 0;
    transform: translateX(3rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0rem);
  }
}

</style>
