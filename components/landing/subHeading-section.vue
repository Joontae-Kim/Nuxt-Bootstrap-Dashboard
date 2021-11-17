<template>
  <b-row class="mb-5" align-h="center">
    <b-col cols md="8" lg="6" class="text-center font-weight-normal">
      <h2 class="mb-5">Generate random data to show charts and support fully responsive layout.</h2>
    </b-col>
    <b-col cols="12">
      <b-row align-h="center">
        <b-col cols v-bind="subHeadingChildColumns" class="text-center mb-5">
          <div class="d-flex align-items-center justify-content-center mb-4">
            <subHeading-icon :icon="subHeadingSVGGroup.server" title="RESTful API Server" />
            <b-icon icon="plus" font-scale="2" class="mx-3" variant="secondary" />
            <subHeading-icon :icon="subHeadingSVGGroup.barChart" title="Bar Chart" />
            <b-icon icon="plus" font-scale="2" class="mx-3" variant="secondary" />
            <subHeading-icon :icon="subHeadingSVGGroup.viewList" title="View List" />
          </div>
          <h4>Generate Data</h4>
          <p class="text-secondary px-5 mb-0">Show chart and information data generated from Restful API.</p>
        </b-col>
        <b-col cols v-bind="subHeadingChildColumns" class="text-center">
          <div class="d-flex align-items-center justify-content-center mb-4">
            <subHeading-icon :icon="subHeadingSVGGroup.sidebarLayout" title="Sidebar and Navigation into Layout" />
            <b-icon icon="plus" font-scale="2" class="mx-3" variant="secondary" />
            <subHeading-icon :icon="subHeadingSVGGroup.responsiveColumns" title="Responsive Design" />
          </div>
          <h4>Responsive Design</h4>
          <p class="text-secondary px-5 mb-0">Support fully responsive layout and it is with sidebar and navigation bar.</p>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import subHeadingIcon from '~/components/landing/ui/subHeading-icon'

export default {
  name: '',
  components: {
    subHeadingIcon
  },
  data: () => ({
    subHeadingChildColumns: {
      md: 6,
      lg: 5,
      xl: 4
    }
  }),
  computed: {
    subHeadingSVGGroup () {
      return {
        server: require('assets/svgs/server.svg?data'),
        barChart: require('assets/svgs/bar-chart.svg?data'),
        viewList: require('assets/svgs/view-list.svg?data'),
        sidebarLayout: require('assets/svgs/sidebar-layout.svg?data'),
        responsiveColumns: require('assets/svgs/responsive-columns.svg?data')
      }
    }
  }
}
</script>

<style lang="scss">
</style>
