<template>
  <div class="d-flex align-items-center justify-content-around justify-content-md-center justify-content-lg-between flex-grow-1 layout__component">
    <slot name="left-icon">
      <b-icon :icon="leftIcon" :font-scale="iconDevice.scale" class="layout__device" />
    </slot>
    <b-icon
      v-bind="iconArrowLeftRightProps"
      class="d-none d-md-inline-block"
    />
    <b-icon
      v-bind="iconArrowLeftRightProps"
      class="d-md-none"
      rotate="-90"
    />
    <slot name="right-icon">
      <b-icon :icon="rightIcon" :font-scale="iconDevice.scale" class="layout__device" />
    </slot>
  </div>
</template>

<script>
export default {
  name: 'LayoutTransformStatus',
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    leftIcon: {
      type: [String, Object],
      default: null
    },
    rightIcon: {
      type: [String, Object],
      default: null
    }
  },
  data: () => ({
    iconArrowLeftRightProps: {
      icon: 'arrow-left-right',
      fontScale: 1.2,
      shiftV: -1,
      class: 'layout__transfer'
    },
    iconDevice: {
      scale: 1.7
    }
  })
}
</script>

<style lang="scss">
</style>
