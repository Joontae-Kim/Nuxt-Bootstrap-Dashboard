<template>
  <b-row class="align-items-baseline align-items-sm-center h-100" no-gutters>
    <b-col cols="12" sm="6" class="d-flex align-items-end align-items-sm-center justify-content-center mt-auto mt-sm-0">
      <div class="position-relative utility__icon">?</div>
    </b-col>
    <b-col
      cols="12"
      sm="6"
      class="text-white text-center mb-5 mb-sm-0"
    >
      <h1 class="utility__title">404</h1>
      <h2 class="utility__message mb-4 mb-sm-5">{{ getNotFoundMessage.message }}</h2>
      <b-btn variant="light" class="utility__link" pill @click="goToDashboard">{{ getNotFoundMessage.buttonText }}</b-btn>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'NotFound',
  layout: 'utility',
  data: () => ({}),
  computed: {
    getNotFoundMessage () {
      return !this.$route.query
        ? { message: 'Page not found', buttonText: 'Return to Dashboard' }
        : this.$route.query._org === 'usr'
          ? { message: 'Oops, No User searched.', buttonText: 'Return to User List Page' }
          : this.$route.query._org === 'evt'
            ? { message: 'Oops, No Event searched.', buttonText: 'Return to Event List Page' }
            : { message: 'Sorry, No Results', buttonText: 'Return to Dashboard' }
    }
  },
  methods: {
    goToDashboard () {
      const replacePath = !this.$route.query
        ? { name: 'overview' }
        : this.$route.query._org === 'usr'
          ? { name: 'usersList' }
          : { name: 'eventsList' }
      this.$router.replace(replacePath)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/layout/utility.scss';
</style>
