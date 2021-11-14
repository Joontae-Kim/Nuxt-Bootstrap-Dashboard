<template>
  <b-container fluid tag="section">
    <!-- flex-column -->
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
import subHeadingSection from "~/components/landing/subHeading-section"
import layoutSection from "~/components/landing/layout-section"
import pagesSection from "~/components/landing/pages-section"
import featuresSection from "~/components/landing/features-section"

export default {
  components: {
    subHeadingSection,
    layoutSection,
    pagesSection,
    featuresSection
  },
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
    },
    imagesObserver: null
  }),
  created () {},
  mounted () {
    this.observeImgHandler()
  },
  beforeDestroy () {
    this.imagesObserver.disconnect()
  },
  methods: {
    observeImgHandler () {
      const images = document.querySelectorAll('img:not([data-rd-md="container"])')
      this.imagesObserver = new IntersectionObserver(
        this.onImgElementsObserved,
        { rootMargin: '50px 0px', threshold: 0.5 }
      )
      images.forEach((img) => {
        if (img.dataset.lazy !== 'false') {
          this.imagesObserver.observe(img)
        }
      })
    },
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
    }
  }
}
</script>

<style lang="scss">
</style>
