<template>
  <b-row class="align-items-baseline align-items-sm-center" no-gutters>
    <b-col cols="12" sm="6" class="d-flex align-items-end align-items-sm-center justify-content-center mt-auto mt-sm-0 mb-3 mb-sm-0">
      <div class="position-relative utility__icon">!</div>
    </b-col>
    <b-col
      cols="12"
      sm="6"
      class="text-white text-center mb-5 mb-sm-0"
    >
      <h1 class="utility__title mb-2 mb-md-3">500</h1>
      <h2 class="utility__message mb-5 mb-sm-5">Internal Server Error</h2>
      <b-btn variant="light" :to="{ name: 'overview' }" class="utility__link fs-6" pill>Return to Dashboard</b-btn>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ServerError',
  layout: 'utility',
  data: () => ({})
}
</script>

<style lang="scss">
@import '../assets/styles/layout/utility.scss';
</style>
