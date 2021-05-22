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
    type: 'pie'
  }),
  mounted () {},
  methods: {}
}
</script>
