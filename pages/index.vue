<template>
  <b-container fluid tag="main">
    <subHeadingSection />
    <!-- Features -->
    <featuresSection />
    <!-- Fully Responsive Layout -->
    <layoutSection />
    <!-- Project Pages -->
    <pagesSection />
  </b-container>
</template>

<script>
import lazyLoad from '~/mixins/lazyLoad'
import subHeadingSection from "~/components/landing/subHeading-section"
import featuresSection from "~/components/landing/features-section"
import layoutSection from "~/components/landing/layout-section"
import pagesSection from "~/components/landing/pages-section"

export default {
  components: {
    subHeadingSection,
    layoutSection,
    pagesSection,
    featuresSection
  },
  mixins: [
    lazyLoad
  ],
  layout: null,
  data: () => ({
    pagesGrp: {
      grp1: [
        { src: 'overview_page.png', type: 'Dashboard Page', title: 'Overview', routeName: 'overview' },
        { src: 'eventsList_page.png', type: 'List Page', title: 'Events List', routeName: 'eventsList' },
        { src: 'usersStatics_page.png', type: 'Analytics Page', title: 'Users Statics', routeName: 'userStatics' }
      ],
      grp2: [
        { src: 'userDetailed_page.png', type: 'Information Details Page', title: 'User Detail', routeName: null },
        { src: 'signup_page.png', type: 'Authentication Type Page', title: 'Sign Up', routeName: 'signin' },
        { src: '404_page.png', type: 'Utility Page', title: '404 Page', routeName: 'notFound' }
      ]
    }
  }),
  created () {},
  mounted () {
    this.createLazyload(
      null,
      { rootMargin: '50px 0px', threshold: 0.5 },
      document.querySelectorAll('img:not([data-rd-md="container"])'),
      (entries, observer) => this.onImgElementsObserved(entries, observer),
      (entries, observer) => this.onImgElementsObserved_alt(entries, observer),
      (targets) => {
        targets.forEach((img) => {
          if (img.dataset.lazy !== 'false') { this.lazyLoader.observe(img) }
        })
      }
    )
  },
  methods: {
    onImgElementsObserved (entries, observer) {
      entries.forEach(({ target, isIntersecting }) => {
        if (target.dataset.src && isIntersecting) {
          target.src = target.dataset.src
          setTimeout(() => {
            if (target.dataset.activeTarget) {
              const activeTarget = document.querySelector(target.dataset.activeTarget)
              activeTarget.classList.add('active')
            } else {
              target.classList.add('active')
            }
            target.removeAttribute('data-src')
            target.dataset.loaded = true
            observer.unobserve(target)
          }, 1000)
        }
      })
    },
    onImgElementsObserved_alt (entries) {
      entries.forEach(({ target }) => {
        if (target.dataset.src) {
          target.src = target.dataset.src
          setTimeout(() => {
            if (target.dataset.activeTarget) {
              const activeTarget = document.querySelector(target.dataset.activeTarget)
              activeTarget.classList.add('active')
            } else {
              target.classList.add('active')
            }
            target.removeAttribute('data-src')
            target.dataset.loaded = true
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
