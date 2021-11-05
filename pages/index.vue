<template>
  <b-container fluid tag="section">
    <b-row class="mb-5" align-h="center">
      <b-col md="10" lg="9" class="text-center">
        <div class="mb-4">
          <b-icon icon="person-bounding-box" font-scale="2.5" class="landingText--normal" />
          <b-icon icon="plus" font-scale="2" class="mx-3" variant="secondary" />
          <b-icon icon="code-slash" font-scale="2.5" class="landingText--normal" />
        </div>
        <h4>The admin is fully responsive and easy to customize</h4>
        <p>The clean and well commented code allows easy customization of the theme.It's designed for describing your app, agency or business.</p>
      </b-col>
    </b-row>
    <!-- Features -->
    <featuresSection />
    <!-- Fully Responsive Layout -->
    <layoutSection />
    <!-- Project Pages -->
    <pagesSection />
  </b-container>
</template>

<script>
import layoutSection from "~/components/landing/layout-section"
import pagesSection from "~/components/landing/pages-section"
import featuresSection from "~/components/landing/features-section"

export default {
  components: {
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
        { rootMargin: '0px', threshold: 0 }
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
            observer.unobserve(target)
            target.dataset.src = ''
            target.dataset.loaded = true
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
