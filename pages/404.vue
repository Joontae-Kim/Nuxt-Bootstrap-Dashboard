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
      <h2 class="utility__message mb-4 mb-sm-5">Page not found</h2>
      <b-btn variant="light" :to="{ name: 'overview' }" class="utility__link" pill>Return to Dashboard</b-btn>
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

<style lang="scss">
@import '../assets/styles/layout/utility.scss';
</style>
