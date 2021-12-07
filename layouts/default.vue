<template>
  <fragment>
    <BaseNav />
    <section id="jumbotron">
      <b-row id="header" :class="['mx-0 landingIntro', { loaded }]" tag="article">
        <b-col
          cols="12"
          :class="['text-white pt-4 pb-5 py-sm-0', 'landingIntro__content', { collapsed: collpased.column1 }]"
        >
          <div class="mx-auto">
            <h1 :class="['landingIntro__title landingIntro__text', { collapsed: collpased.column1 }]">
              <span class="font-weight-light">Welcome to</span>
              <span class="landingIntro__service">Nuxtrap</span>
            </h1>
            <div :class="['d-none d-md-block text-light landingIntro__text mb-md-5', { collapsed: collpased.column1 }]">
              <h3 class="font-weight-light mb-1 landingIntro__description">Developed Admin Dashboard Propject</h3>
              <h3 class="font-weight-light mb-2 mb-md-0 landingIntro__description">with <i>Nuxt.js</i> and <i>Bootstrap</i>.</h3>
            </div>
            <h3 :class="['d-block d-md-none font-weight-light text-light mb-4 mb-md-0 landingIntro__description landingIntro__text', { collapsed: collpased.column1 }]">
              Developed Admin Dashboard Propject with <i>Nuxt.js</i> and <i>Bootstrap</i>.
            </h3>
            <div class="d-inline-block fs-4 text-light font-italic border py-2 px-3 border-light rounded-pill shadow-lg">
              <nuxt-link :to="{ name: 'overview'}" class="text-light text-decoration-none">
                Let's start explore! <BIconLightningFill />
              </nuxt-link>
            </div>
          </div>
        </b-col>
        <template v-if="collpased.column2">
          <b-col
            cols="12"
            md="6"
            :class="['landingIntro__img', 'ml-md-auto', { loaded: imgloaded.status }]"
          >
            <img
              id="header-snapshot"
              :data-src="landingScreenshotImg.src"
              :sizes="landingScreenshotImg.sizes"
              :srcset="landingScreenshotImg.srcset"
              data-active-container="#header"
              data-rd-md="container"
              :data-loaded="imgloaded.status"
              class="shadow landingIntro__screenshot"
              alt="overview page"
              @load="headingScreenshotImgOnLoad"
            >
          </b-col>
        </template>
      </b-row>
    </section>
    <Nuxt />
    <BaseFooter />
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import { BIconLightningFill } from 'bootstrap-vue'
import lazyLoad from '~/mixins/lazyLoad'

export default {
  name: "Default",
  components: {
    Fragment,
    BIconLightningFill
  },
  mixins: [
    lazyLoad
  ],
  data: () => ({
    loaded: false,
    collpased: {
      column1: false,
      column2: false
    },
    imgloaded: {
      status: false
    }
  }),
  head: {
    link: [
      { rel: "stylesheet", href: "/styles/default.css" }
    ]
  },
  computed: {
    landingScreenshotImg () {
      return this.$img.getSizes('/images/overview-page.png', {
        sizes: 'xs:120vw xl:150vw',
        modifiers: { quality: 70 }
      })
    }
  },
  created () {},
  mounted () {
    setTimeout(() => {
      this.collpased.column1 = true
    }, 1000)
    setTimeout(() => {
      this.collpased.column2 = true
    }, 2000)
  },
  beforeDestroy () {
    delete document.body.dataset.pageLandingLoaded
  },
  methods: {
    headingScreenshotImgOnLoad () {
      this.imgloaded.status = true
      setTimeout(() => {
        this.loaded = true
      }, 2000)
      setTimeout(() => {
        document.body.dataset.pageLandingLoaded = true
        this.createLazyload(
          null,
          { rootMargin: '-50px', threshold: 0.5 },
          document.querySelectorAll('#header-snapshot'),
          (entries, observer) => {
            entries.forEach(({ target, isIntersecting }) => {
              if (isIntersecting) {
                target.classList.remove('unseen')
              } else {
                target.classList.add('unseen')
              }
            })
          },
          target => target.classList.remove('unseen')
        )
      }, 2500)
    }
  }
}
</script>

<style lang="scss">
.landingIntro {
  position: relative;
  background: linear-gradient(45deg, #002966, #153D77, #2F70AF);
  margin-bottom: 4rem;
  overflow: hidden;
  padding: 2rem 0rem;
  height: 100%;
  transition: min-height 1.5s ease-in-out;

  &:not(.loaded) {
    min-height: calc(100vh - 56.77px);
  }

  &.loaded {
    min-height: 1vh;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: margin-left 1s ease-in-out,
      max-width 1s ease-in-out,
      flex 1s ease-in-out;

    @media (max-width: 479.98px) {
      height: 100%;
    }

    @media (min-width: 480px) and (max-width: 991.98px) {
      flex: 0 0 50%;
      max-width: 50%;
      margin-left: 26.5vw;
    }

    @media (min-width: 992px) {
      flex: 0 0 100%;
      max-width: 100%;
    }

    &.collapsed {
      @media (min-width: 480px) {
        margin-left: 0vw;
        flex: 0 0 50%;
        max-width: 50%;
      }

      @media (min-width: 1200px) {
        flex: 0 0 41.6666666667%;
        max-width: 41.6666666667%;
      }
    }
  }

  &__img {
    align-self: center;

    &.loaded {
      @media (max-width: 639.8px) {
        height: 50%;
      }

      @media (min-width: 640px) {
        height: 100%;
      }
    }

    &.loaded {
      animation-name: fade-in;
      animation-duration: 1s;
      animation-fill-mode: both;
    }
  }

  &__screenshot {
    width: 100%;
    border-radius: 3px;
    opacity: 0;
    transition: opacity 1s ease-in-out 1s, transform .5s ease-in-out;

    &[data-loaded="true"] {
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
      opacity: 1;
      @media (max-width: 575.98px) {
        transform: translateY(-0.5rem);
      }

      @media (min-width: 1200px) {
        transform: translateY(0rem);
      }

      &.unseen {
        @media (max-width: 767.98px) {
          transform: translateY(3.5rem);
        }

        @media (min-width: 768px) {
          transform: translateY(4rem);
        }
      }
    }
  }
}

.landingIntro__title {
  margin-bottom: 1.5rem;
  @media (max-width: 1199.98px) {
    font-size: 3rem;
  }

  @media (min-width: 1200px) {
    font-size: 3.5rem;
  }
}

.landingIntro__service {
  color: #5c8fc3;
  border-bottom: 5px solid;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  padding-bottom: 3px;
}

.landingIntro__description {
  color: #e1e1e1;
  font-size: 1.25rem !important;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
