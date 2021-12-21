export default {
  name: 'drawChart',
  data () {
    return {
      chartInstance: null
    }
  },
  computed: {},
  methods: {
    drawChart (ctx, options) {
      if (!this.chartInstance) {
        this.chartInstance = this.$chartjs.createChart(ctx, {
          type: this.type,
          data: this.data,
          options
        })
      } else {
        this.$chartjs.updateChart(this.chartInstance, this.data, options)
      }
    }
  }
}
