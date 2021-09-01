<template>
  <b-row class="mb-4">
    <b-col cols md="5" class="mb-4 mb-md-0">
      <dash-card title="Authentication - Chart" class="h-100 pb-3 pb-lg-0">
        <b-row id="authShare-chart-wrapper" align-v="center" class="flex-column h-100 p-lg-3" no-gutters>
          <b-col v-if="rawData.length" cols class="chart-container chart-h-20 chart-range-h-200">
            <LazyPieChart
              canvas-id="authShare-chart"
              :data="dataSet"
              :legend-view="false"
              :custom-legend="true"
              custom-legend-id="authShare-chart-lengend"
              :legend-callback="createAuthLengendCb"
              :use-custom-legend-click="true"
              custom-legend-click="default"
              use-data-label
              :data-label-opt="authLabelOpt"
              half-size
              responsive
              :tooltip="authShareTootipOpt"
            />
          </b-col>
          <b-col cols>
            <div id="authShare-chart-lengend" class="d-flex flex-wrap justify-content-between align-content-around h-100 my-md-1" />
          </b-col>
        </b-row>
      </dash-card>
    </b-col>
    <b-col cols md="7">
      <b-row no-gutters class="h-100">
        <b-col cols>
          <dash-card title="Authentication - Table" class="h-100" table>
            <b-table
              :sort-by.sync="authSortBy"
              :sort-desc.sync="authsortDesc"
              :items="rawData"
              :fields="authField"
              head-variant="light"
              responsive
              hover
              class="mb-0 h-100"
              table-class="h-100"
            >
              <template #cell(count)="data">
                {{ data.value }}
              </template>
              <template #cell(percent)="data">
                {{ data.value }} %
              </template>
            </b-table>
          </dash-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import commonUserChartLegendCb from "~/mixins/user/commonChartLengendCb"

export default {
  name: "UsersAuthStatic",
  mixins: [commonUserChartLegendCb],
  props: {
    rawData: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    authSortBy: 'count',
    authsortDesc: true,
    authField: [
      {
        label: 'Authentication',
        key: 'authentication',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600 align-middle'
      },
      {
        label: 'Count',
        key: 'count',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600 align-middle'
      },
      {
        label: 'Share`',
        key: 'percent',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600 align-middle'
      }
    ]
  }),
  computed: {
    dataSet () {
      return {
        labels: this.rawData.map(({ authentication }) => authentication),
        datasets: [{
          data: this.rawData.map(({ percent }) => percent)
        }]
      }
    },
    authLabelOpt () {
      return {
        font: { size: 12 },
        align ({ chart, dataIndex }) {
          const dataPeer = chart.data.labels.length - 1
          return dataIndex === 0 || dataIndex === dataPeer ? 'start' : 'center'
        },
        backgroundColor (context) {
          return context.dataset.backgroundColor
        },
        offset ({ chart, dataIndex }) {
          const dataPeer = chart.data.labels.length - 1
          return dataIndex === 0 ? -10 : dataIndex === dataPeer ? -7 : 3
        },
        formatter (value, context) {
          return context.chart.data.labels[context.dataIndex]
        }
      }
    },
    authShareTootipOpt () {
      return {
        callbacks: {
          label (tooltipItem, data) {
            return `  ${data.datasets[0].data[tooltipItem.index]} %`
          }
        }
      }
    }
  },
  methods: {
    createAuthLengendCb (chart) {
      return this.commonLegendCb(chart, 'authShare')
    }
  }
}
</script>

<style>

</style>
