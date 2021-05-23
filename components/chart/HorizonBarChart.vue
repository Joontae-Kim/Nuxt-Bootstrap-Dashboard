<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
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
