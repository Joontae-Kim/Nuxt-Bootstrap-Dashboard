<template>
  <b-row class="mb-4">
    <b-col cols md="5" class="mb-4 mb-md-0">
      <dash-card title="Payment - Chart" class="h-100 pb-3 pb-lg-0">
        <b-row id="payment-amount-chart-wrapper" align-v="center" class="flex-column h-100 px-md-3 pt-md-3" no-gutters>
          <b-col v-if="rawData.length" cols class="chart-container chart-h-20 chart-range-h-200 chart-range-h-xl-300 chart-range-h-sxl-350 position-relative">
            <LazyPieChart
              canvas-id="payment-amount-chart"
              :data="dataSet"
              :legend-view="false"
              :custom-legend="true"
              custom-legend-id="payment-chart-lengend"
              :legend-callback="createPaymentLengendCb"
              :use-custom-legend-click="true"
              custom-legend-click="default"
              responsive
              use-data-label
              :data-label-opt="paymentsLabelOpt"
              half-size
              :tooltip="paymentTooltipOpt"
            />
          </b-col>
          <b-col cols>
            <div id="payment-chart-lengend" class="d-flex flex-wrap justify-content-between align-content-around h-100 py-md-3 px-md-0 pt-xxl-0 pb-xxl-3 chart-range-h-xxl-100" />
          </b-col>
        </b-row>
      </dash-card>
    </b-col>
    <b-col cols md="7">
      <dash-card title="Payment - List" class="h-100" table>
        <b-table
          :sort-by.sync="paymentsSortBy"
          :sort-desc.sync="paymentssortDesc"
          :items="rawData"
          :fields="paymentsField"
          head-variant="light"
          responsive
          hover
          class="mb-0 h-100"
          table-class="h-100"
        >
          <template #cell(amount)="data">
            {{ data.value }}
          </template>
          <template #cell(amountPercent)="data">
            {{ data.value }} %
          </template>
          <template #cell(count)="data">
            {{ data.value }}
          </template>
          <template #cell(countPercent)="data">
            {{ data.value }} %
          </template>
        </b-table>
      </dash-card>
    </b-col>
  </b-row>
</template>

<script>
import commonUserChartLegendCb from "~/mixins/user/commonChartLengendCb"

export default {
  name: "UsersPaymentsStatic",
  mixins: [commonUserChartLegendCb],
  props: {
    rawData: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    paymentsSortBy: 'amount',
    paymentssortDesc: true,
    paymentsField: [
      {
        label: 'Payment',
        key: 'payment',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600 align-middle'
      },
      {
        label: 'Amount',
        key: 'amount',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600 align-middle'
      },
      {
        label: '- Share',
        key: 'amountPercent',
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
        label: '- Share',
        key: 'countPercent',
        sortable: true,
        thClass: 'text-nowrap',
        tdClass: 'text-nowrap text-gray-600 align-middle'
      }
    ]
  }),
  computed: {
    dataSet () {
      const paymentsSet = this.rawData.map(({ amountPercent }) => amountPercent)
      return {
        labels: this.rawData.map(({ payment }) => payment),
        datasets: [{
          data: paymentsSet
        }]
      }
    },
    paymentsLabelOpt () {
      return {
        font: { size: 12 },
        align ({ chart, dataIndex }) {
          const dataPeer = chart.data.labels.length - 1
          if (dataIndex === 0 || dataIndex === dataPeer || dataIndex === dataPeer - 1) {
            if (dataIndex !== dataPeer - 1) {
              return 'start'
            } else {
              const data = chart.data.datasets[0].data[dataIndex]
              return data < 13 ? 'start' : 'center'
            }
          } else {
            return 'center'
          }
        },
        offset ({ chart, dataIndex }) {
          const dataPeer = chart.data.labels.length - 1
          if (dataIndex === 0) {
            return -10
          } else if (dataIndex === dataPeer || dataIndex === (dataPeer - 1)) {
            const data = chart.data.datasets[0].data[dataIndex]
            return data < 13
              ? dataIndex === (dataPeer - 1) ? -10 : -4
              : -6.5
          } else {
            return 3
          }
        },
        formatter (value, context) {
          const formerLetter = context.chart.data.labels[context.dataIndex].split(' ')[0]
          return formerLetter
        }
      }
    },
    paymentTooltipOpt () {
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
    createPaymentLengendCb (chart) {
      return this.commonLegendCb(chart, 'payment')
    }
  }
}
</script>

<style>

</style>
