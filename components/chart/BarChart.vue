<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>
<script>
import defaultProps from "../../mixins/chart/defaultProps"

export default {
  mixins: [defaultProps],
  data: () => ({
    type: 'bar',
    option: {
      scales: {
        xAxes: [{
          gridLines: false
        }],
        yAxes: [{
          gridLines: {
            borderDash: [3, 4]
          },
          ticks: {
            beginAtZero: true,
            stepSize: 5,
            padding: 25
          }
        }]
      }
    }
  }),
  mounted () {},
  methods: {}
}
</script>
