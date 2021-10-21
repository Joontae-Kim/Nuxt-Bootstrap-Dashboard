<template>
  <div class="d-flex align-items-center justify-content-around justify-content-md-center justify-content-lg-between flex-grow-1 layout__component">
    <slot name="left-icon">
      <b-icon :icon="leftIcon" :font-scale="iconDevice.scale" class="d-md-none d-lg-inline-block layout__device" />
    </slot>
    <b-iconstack font-scale="1.6" shift-h="-3.5" shift-v="3" class="">
      <b-icon icon="circle-fill" class="layout__transfer" />
      <template v-if="!vertical">
        <b-icon
          v-bind="iconArrowLeftRightProps"
          class="d-none d-md-inline-block "
        />
      </template>
      <b-icon
        v-bind="iconArrowLeftRightProps"
        rotate="-90"
        :class="!vertical ? 'd-md-none' : ''"
      />
    </b-iconstack>
    <slot name="right-icon">
      <b-icon :icon="rightIcon" :font-scale="iconDevice.scale" class="d-md-none d-lg-inline-block layout__device" />
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
      fontScale: 0.45,
      shiftV: -10,
      shiftH: 10,
      variant: 'white'
    },
    iconDevice: {
      scale: 1.5
    }
  })
}
</script>

<style lang="scss">
</style>
