<template>
  <b-row align-h="center" class="flex-column align-items-center bg-white mb-5 py-5">
    <b-col cols="12" class="text-center mb-5 mb-md-4">
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
          class="mb-4"
        >
          <img :src="page.src" :title="page.title" :alt="page.title" class="w-100 rounded mb-3 pageList__ele">
          <h5 :class="titleClass">{{ page.type }}</h5>
          <p :class="subtitleClass">{{ page.title }}</p>
        </b-col>
        <b-col
          v-for="(page, index) in pagesGrp.grp2"
          :key="`page-group2-${index}`"
          cols
          md="6"
          lg="6"
          xl="4"
          class="mb-4 mb-lg-0"
        >
          <img :src="page.src" :title="page.title" :alt="page.title" class="w-100 rounded mb-3 pageList__ele">
          <h5 :class="titleClass">{{ page.type }}</h5>
          <p :class="subtitleClass">{{ page.title }}</p>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'PageLists',
  data: () => ({
    titleClass: 'pageList__title text-center mb-',
    subtitleClass: 'pageList__subtitle text-center mb-0',
    pagesGrp: {
      grp1: [
        { src: 'overview_page.png', type: 'Default Page', title: 'Overview', routeName: 'overview' },
        { src: 'eventsList_page.png', type: 'List Page', title: 'Events List', routeName: 'eventsList' },
        { src: 'usersStatics_page.png', type: 'Analytics Page', title: 'Users Statics', routeName: 'userStatics' }
      ],
      grp2: [
        { src: 'userDetailed_page.png', type: 'Information Details Page', title: 'User Detail', routeName: null },
        { src: 'signup_page.png', type: 'Authentication Type Page', title: 'Sign Up', routeName: 'signin' },
        { src: '404_page.png', type: 'Utility Page', title: '404 Page', routeName: 'notFound' }
      ]
    }
  })
}
</script>

<style lang="scss" scoped>
.pageList {
  &__ele {
    border: 1px solid white;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
    transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;
    &:hover {
      border-color: #dee2e6 !important;
      box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%) !important;
    }
  }

  &__title {
    color: #495057;
  }

  &__subtitle {
    color: #adb5bd;
  }
}
</style>
