<template>
  <fragment>
    <BaseHeader />
    <main>
      <b-row id="header" :class="['mx-0 landingIntro', { loaded }]">
        <b-col
          cols="12"
          v-bind="loaded ? {md: 7, lg: 6} : {md: 12}"
          :class="['align-self-center text-white pt-4 pb-5 py-sm-0 landingIntro__content', { loaded }]"
        >
          <h1 class="">It's Nuxt Dashboard Propject</h1>
          <h3 class="font-weight-light mb-1">
            with Bootstrap and BootstrapVue
          </h3>
        </b-col>
        <template v-if="imgloaded.status">
          <b-col
            cols="12"
            v-bind="imgloaded.status ? {md: 5, lg: 6} : {md: 12}"
            :class="['landingIntro__img', imgloaded.class]"
          >
            <img
              id="header-snapshot"
              src="/overview-page.png"
              data-active-container="#header"
              :data-loaded="imgloaded.status"
              data-rd-md="container"
              alt="overview page"
              class="shadow landingIntro__screenshot"
            >
          </b-col>
        </template>
      </b-row>
      <Nuxt />
    </main>
    <BaseFooter />
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
  components: {
    Fragment
  },
  data: () => ({
    loaded: false,
    imgloaded: {
      status: false,
      class: null
    },
    headerObserver: null
  }),
  created () {},
  mounted () {
    document.body.classList.add('overflow-hidden')
    setTimeout(() => {
      this.loaded = true
    }, 1500)
    setTimeout(() => {
      this.imgloaded.status = true
      this.imgloaded.class = 'loading'
    }, 1700)
    setTimeout(() => {
      this.imgloaded.class = 'loaded'
      this.$nextTick(() => {
        this.observeHeroImgHandler()
        document.body.classList.remove('overflow-hidden')
      })
    }, 1800)
  },
  beforeDestroy () {
    this.headerObserver.disconnect()
  },
  methods: {
    observeHeroImgHandler () {
      this.headerObserver = new IntersectionObserver(
        this.onHeaderElementObserved,
        { rootMargin: '-50px', threshold: 0.5 }
      )
      const header = document.getElementById('header-snapshot')
      this.headerObserver.observe(header)
    },
    onHeaderElementObserved (entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.remove('unseen')
        } else {
          target.classList.add('unseen')
        }
      })
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
  transition: min-height 1.5s ease-out;

  &.loaded {
    min-height: 1vh;
  }

  &:not(.loaded) {
    min-height: 100vh;
  }

  &__content {
    transition: text-align 0.3s ease-in,
      max-width  0.5s ease-in-out;

    &:not(.loaded) {
      text-align: center;
    }

    &.loaded {
      text-align: left;
    }
  }

  &__img {
    opacity: 0;
    max-height: 0vh;
    transition: max-width, max-height 0.5s ease-in-out .5s,
      opacity 1s ease-in-out;

    &.loading {
      max-height: 100vh;
      @media (max-width: 639.8px) {
        height: 50%;
      }

      @media (min-width: 640px) {
        height: 100%;
      }
    }

    &.loaded {
      opacity: 1;
      max-height: 100vh;
      @media (max-width: 639.8px) {
        height: 50%;
      }

      @media (min-width: 640px) {
        height: 100%;
      }
    }
  }

  &__screenshot {
    width: 100%;
    border-radius: 3px;
    transition: transform .5s ease-in-out;

    &[data-loaded="true"] {
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
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

.landingText {
  &--light {
    color: #2F70AF;
  }

  &--normal {
    color: #153D77;
  }

  &--heavy {
    color: #002966;
  }
}
</style>
