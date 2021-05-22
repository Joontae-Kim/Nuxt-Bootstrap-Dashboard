<template>
  <div :style="{'position: relative; height:40vh; width:80vw': option.responsive}">
    <canvas :id="canvasId" v-bind="{width, height}" />
  </div>
</template>
<script>
import defaultProps from "~/mixins/chart/defaultProps"

export default {
  mixins: [defaultProps],
  data: () => ({
    type: 'horizontalBar',
    option: {
      scales: {
        yAxes: [
          { ticks: { beginAtZero: true } }
        ],
        xAxes: [
          { ticks: { beginAtZero: true } }
        ]
      }
    }
  }),
  mounted () {},
  methods: {}
}
</script>
