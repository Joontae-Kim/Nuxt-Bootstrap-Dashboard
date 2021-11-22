<template>
  <b-row align-h="center" class="flex-column align-items-center bg-white py-5">
    <b-col cols="12" class="text-center mb-5">
      <h2>Project Pages</h2>
    </b-col>
    <b-col cols md="12" lg="11">
      <b-row align-h="center">
        <b-col
          v-for="(page, index) in pagesGrp.grp1"
          :key="`page-group1-${index}`"
          cols
          md="6"
          lg="6"
          xl="4"
          class="mb-4 pageList__ele"
          name="project-pages"
        >
          <img
            :data-src="page.img.src"
            :sizes="page.img.sizes"
            :srcset="page.img.srcset"
            :title="page.title"
            :alt="page.title"
            class="w-100 rounded mb-3 pageList__img"
          >
          <h5 :class="titleClass">{{ page.type }}</h5>
          <b-btn
            variant="link"
            :class="subtitleClass"
            size="sm"
            @click="openProjectPage(page.routeName)"
          >
            {{ page.path }}
            <BIconBoxArrowUpRight font-scale="0.8" shift-v="5" class="text-black-50 ml-1" />
          </b-btn>
        </b-col>
        <b-col
          v-for="(page, index) in pagesGrp.grp2"
          :key="`page-group2-${index}`"
          cols
          md="6"
          lg="6"
          xl="4"
          class="mb-4 mb-lg-0 pageList__ele"
          name="project-pages"
        >
          <img
            :data-src="page.img.src"
            :sizes="page.img.sizes"
            :srcset="page.img.srcset"
            data-loaded="false"
            :title="page.title"
            :alt="page.title"
            class="w-100 rounded mb-3 pageList__img"
          >
          <h5 :class="titleClass">{{ page.type }}</h5>
          <b-btn
            variant="link"
            :class="subtitleClass"
            size="sm"
            @click="openProjectPage(page.routeName)"
          >
            {{ page.path }}
            <BIconBoxArrowUpRight font-scale="0.8" shift-v="5" class="text-black-50 ml-1" />
          </b-btn>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { BIconBoxArrowUpRight } from 'bootstrap-vue'

export default {
  name: 'PageLists',
  components: {
    BIconBoxArrowUpRight
  },
  data: () => ({
    titleClass: 'pageList__title text-center',
    subtitleClass: 'pageList__subtitle text-decoration-none text-center font-weight-light'
  }),
  computed: {
    pagesGrp () {
      const imgOpt = {
        sizes: 'xs:100vw md:120vw lg:150vw',
        modifiers: { format: 'png', quality: 70 }
      }
      const overviewImg = this.$img.getSizes('/images/landing/overview_page.png', imgOpt)
      const eventsListImg = this.$img.getSizes('/images/landing/eventsList_page.png', imgOpt)
      const usersStaticsImg = this.$img.getSizes('/images/landing/usersStatics_page.png', imgOpt)
      const userDetailedImg = this.$img.getSizes('/images/landing/userDetailed_page.png', imgOpt)
      const signupImg = this.$img.getSizes('/images/landing/signup_page.png', imgOpt)
      const Page404Img = this.$img.getSizes('/images/landing/404_page.png', imgOpt)
      return {
        grp1: [
          { img: overviewImg, type: 'Default Page', title: 'Overview', routeName: 'overview', path: '/overview' },
          { img: eventsListImg, type: 'List Page', title: 'Events List', routeName: 'eventsList', path: '/events/list' },
          { img: usersStaticsImg, type: 'Analytics Page', title: 'Users Statics', routeName: 'userStatics', path: '/users/statics' }
        ],
        grp2: [
          { img: userDetailedImg, type: 'Information Details Page', title: 'User Detail', routeName: 'usersList', path: '/users/list' },
          { img: signupImg, type: 'Authentication Type Page', title: 'Sign Up', routeName: 'signin', path: '/signin' },
          { img: Page404Img, type: 'Utility Page', title: '404 Page', routeName: 'notFound', path: '/404' }
        ]
      }
    }
  },
  mounted () {
    console.log(this.$route)
    this.observePagesImgs()
  },
  methods: {
    observePagesImgs () {
      const projectImages = document.querySelectorAll('[name="project-pages"]')
      const PSObserver = new IntersectionObserver(
        this.onPageImgObserved,
        { rootMargin: '30px 0px', threshold: 0.5 }
      )
      projectImages.forEach((img) => {
        PSObserver.observe(img)
      })
    },
    onPageImgObserved (entries, observer) {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('active')
          observer.unobserve(target)
        }
      })
    },
    openProjectPage (routename) {
      const routeData = this.$router.resolve({ name: routename })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.pageList {
  &__ele {
    opacity: 0;
    transition: opacity .3s ease-in-out .3s;
    text-align: center;

    &.active {
      opacity: 1;
    }
  }

  &__title {
    color: #495057;
  }

  &__subtitle {
    color: #ffffff;
    background-color: #adb5bd;
    padding: 1px 10px;
    border-radius: 3px;
  }
}

.pageList__ele .pageList__img {
  transition: border, box-shadow .3s ease-in-out;
  border: 1px solid white;
}

.pageList__ele.active .pageList__img.active {
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
  &:hover {
    border: 1px solid #dee2e6;
    box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%) !important;
  }
}

</style>
