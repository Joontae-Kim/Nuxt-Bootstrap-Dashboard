<template>
  <div class="d-flex flex-lg-row align-items-center justify-content-around justify-content-sm-around flex-grow-1 h-sm-100 h-lg-auto layout__component layout__icon-component">
    <slot name="left-icon">
      <div class="layoutIcon__deviceWrapper layout__deviceWrapper">
        <b-icon :icon="leftIcon" :font-scale="iconDevice.scale" class="layoutIcon__device layout__device" />
      </div>
    </slot>
    <template v-if="!vertical">
      <b-icon
        v-bind="iconArrowLeftRightProps"
        class="d-none d-md-inline-block layout__transfer"
      />
    </template>
    <b-icon
      v-bind="iconArrowLeftRightProps"
      rotate="-90"
      :class="[!vertical ? 'd-md-none' : '', 'layout__transfer']"
    />
    <slot name="right-icon">
      <div class="layoutIcon__deviceWrapper layout__deviceWrapper">
        <b-icon :icon="rightIcon" :font-scale="iconDevice.scale" class="layoutIcon__device layout__device" />
      </div>
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
      fontScale: 1.0,
      shiftV: -1
    },
    iconDevice: {
      scale: 1.7
    }
  })
}
</script>

<style lang="scss">
</style>
