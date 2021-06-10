<template>
  <canvas :id="canvasId" v-bind="{width, height}" />
</template>
<script>
import defaultProps from "../../mixins/chart/defaultProps"

export default {
  mixins: [defaultProps],
  data: () => ({
    type: 'doughnut'
  }),
  mounted () {},
  methods: {}
}
</script>
