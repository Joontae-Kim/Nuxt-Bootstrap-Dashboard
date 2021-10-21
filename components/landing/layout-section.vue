<template>
  <div class="d-flex align-items-center justify-content-around justify-content-md-center justify-content-lg-between flex-grow-1">
    <slot name="left-icon" />
    <b-iconstack font-scale="1.6" shift-h="-3.5" shift-v="2.5">
      <b-icon icon="circle-fill" variant="dark" />
      <template v-if="!vertical">
        <b-icon
          icon="arrow-left-right"
          font-scale="0.5"
          shift-v="-8"
          shift-h="8"
          variant="white"
          class="d-none d-md-inline-block"
        />
      </template>
      <b-icon
        icon="arrow-left-right"
        font-scale="0.5"
        shift-v="-8"
        shift-h="8"
        variant="white"
        rotate="-90"
        :class="!vertical ? 'd-md-none' : ''"
      />
    </b-iconstack>
    <slot name="right-icon" />
  </div>
</template>

<script>
export default {
  name: 'LayoutTransformStatus',
  props: {
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
