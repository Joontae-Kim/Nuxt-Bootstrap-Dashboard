<template>
  <div :style="{'position: relative; height:40vh; width:80vw': option.responsive}">
    <canvas :id="canvasId" v-bind="{width, height}" />
  </div>
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
