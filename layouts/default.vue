<template>
  <fragment>
    <BaseHeader />
    <div :class="[loading ? 'd-flex' : 'd-none', 'align-items-center justify-content-center vh-100 vw-100 bg-light overflow-hidden']">
      Loading
    </div>
    <transition name="fade" mode="out-in">
      <main v-show="!loading">
        <b-row id="target" class="mx-0 landingIntro">
          <b-col cols="12" md="7" lg="6" class="text-white align-self-center pt-4 pb-5 py-sm-0">
            <h1 class="">It's Nuxt Dashboard Propject</h1>
            <h3 class="font-weight-light mb-1">
              with Bootstrap and BootstrapVue
            </h3>
          </b-col>
          <b-col
            cols="12"
            md="5"
            lg="6"
            class="h-50 h-md-100"
          >
            <img
              id="header-snapshot"
              data-src="/overview-page.png"
              data-active-container="#target"
              data-loaded="false"
              data-rd-md="container"
              alt="overview page"
              class="shadow landingIntro__screenshot"
            >
          </b-col>
        </b-row>
        <Nuxt />
      </main>
    </transition>
    <!-- footer -->
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
    loading: true,
    headerObserver: null
  }),
  created () {},
  mounted () {
    this.observeHeroImgHandler()
    setTimeout(() => {
      this.loading = false
    }, 1000)
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
        if (target.dataset.src && isIntersecting) {
          target.src = target.dataset.src
          target.dataset.src = ''
          if (target.dataset.loaded === 'false') {
            target.dataset.loaded = true
            if (target.dataset.activeContainer) {
              const activeContainer = document.querySelector(target.dataset.activeContainer)
              activeContainer.classList.add('active')
            }
          }
        }
        if (target.dataset.loaded === 'true' && !!target.dataset.activeContainer) {
          const activeContainer = document.querySelector(target.dataset.activeContainer)
          if (isIntersecting) {
            activeContainer.classList.add('active')
          } else {
            activeContainer.classList.remove('active')
          }
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
  transition: padding .25s;

  @media (max-width: 1199.98px) {
    padding: 2rem 0rem;
  }

  @media (min-width: 1200px) {
    padding: 0;

    &.active {
      padding: 2rem 0rem;
    }
  }

  &__screenshot {
    width: 100%;
    border-radius: 3px;

    &[data-loaded="true"] {
      transition: transform .5s;
    }
  }

  &.active .landingIntro__screenshot[data-loaded="true"] {
    @media (max-width: 575.98px) {
      transform: translateY(-0.5rem);
    }

    @media (min-width: 1200px) {
      transform: translateY(4rem);

      &:hover {
        transform: translateY(0.5rem) !important;
      }
    }
  }

  &:not(.active) .landingIntro__screenshot[data-loaded="true"] {
    @media (max-width: 767.98px) {
      transform: translateY(3.5rem);
    }

    @media (min-width: 768px) {
      transform: translateY(4rem);
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
