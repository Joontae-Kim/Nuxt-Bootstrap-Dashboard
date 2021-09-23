<template>
  <b-row class="h-100 position-relative" align-v="center">
    <b-col cols="12" class="d-block d-sm-none text-center mt-auto mb-5">
      <b-icon icon="question" font-scale="7" class="utility__icon" />
    </b-col>
    <b-col order="1" order-md="2" cols="12" md="6" class="d-none d-md-block text-center">
      <b-icon icon="question" font-scale="20" class="utility__icon" />
    </b-col>
    <b-col cols="12" md="6" order="2" order-md="1" class="text-white text-center text-md-center mt-sm-auto mt-md-0 mb-auto mb-md-0">
      <h1 class="utility__title">404</h1>
      <h2 class="utility__message mb-4 mb-md-5">Page not found.</h2>
      <b-btn variant="light" class="rounded-0 utility__link" :to="{ name: 'overview' }">Return to Dashboard</b-btn>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'NotFound',
  layout: 'utility',
  data: () => ({})
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/layout/utility.scss';
</style>
