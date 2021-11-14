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
            :title="page.title"
            :alt="page.title"
            class="w-100 rounded mb-3 pageList__img"
            :data-src="page.src"
            data-loaded="false"
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
            :title="page.title"
            :alt="page.title"
            class="w-100 rounded mb-3 pageList__img"
            :data-src="page.src"
            data-loaded="false"
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
    subtitleClass: 'pageList__subtitle text-decoration-none text-center font-weight-light',
    pagesGrp: {
      grp1: [
        { src: 'overview_page.png', type: 'Default Page', title: 'Overview', routeName: 'overview', path: '/overview' },
        { src: 'eventsList_page.png', type: 'List Page', title: 'Events List', routeName: 'eventsList', path: '/events/list' },
        { src: 'usersStatics_page.png', type: 'Analytics Page', title: 'Users Statics', routeName: 'userStatics', path: '/users/statics' }
      ],
      grp2: [
        { src: 'userDetailed_page.png', type: 'Information Details Page', title: 'User Detail', routeName: 'usersList', path: '/users/list' },
        { src: 'signup_page.png', type: 'Authentication Type Page', title: 'Sign Up', routeName: 'signin', path: '/signin' },
        { src: '404_page.png', type: 'Utility Page', title: '404 Page', routeName: 'notFound', path: '/404' }
      ]
    }
  }),
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
