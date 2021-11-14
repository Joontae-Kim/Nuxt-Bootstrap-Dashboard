<template>
  <b-row class="mb-5" align-h="center">
    <b-col cols md="8" lg="6" class="text-center font-weight-normal">
      <h2 class="mb-5">Generate random data to show charts and support fully responsive layout.</h2>
    </b-col>
    <b-col cols="12">
      <b-row align-h="center">
        <b-col cols v-bind="subHeadingChildColumns" class="text-center mb-5">
          <div class="d-flex align-items-center justify-content-center mb-4">
            <img data-src="/server.svg" alt="server" srcset="" style="width: 2rem;">
            <b-icon icon="plus" font-scale="2" class="mx-3" variant="secondary" />
            <img data-src="/bar-chart.svg" alt="bar-chart" srcset="" style="width: 2rem;">
            <b-icon icon="plus" font-scale="2" class="mx-3" variant="secondary" />
            <img data-src="/view-list.svg" alt="view-list" srcset="" style="width: 2rem;">
          </div>
          <h4>Generate Data</h4>
          <p class="text-secondary px-5 mb-0">Show chart and information data generated from Restful API.</p>
        </b-col>
        <b-col cols v-bind="subHeadingChildColumns" class="text-center">
          <div class="d-flex align-items-center justify-content-center mb-4">
            <img data-src="/sidebar-layout.svg" alt="sidebar-navigation-layout" srcset="" style="width: 2rem;">
            <b-icon icon="plus" font-scale="2" class="mx-3" variant="secondary" />
            <img data-src="/responsive-columns.svg" alt="responsive-design" srcset="" style="width: 2rem;">
          </div>
          <h4>Responsive Design</h4>
          <p class="text-secondary px-5 mb-0">Support fully responsive layout and it is with sidebar and navigation bar.</p>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>

export default {
  name: '',
  data: () => ({
    subHeadingChildColumns: {
      md: 6,
      lg: 5,
      xl: 4
    }
  })
}
</script>

<style lang="scss">
</style>
