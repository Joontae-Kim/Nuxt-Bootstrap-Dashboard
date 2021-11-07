<template>
  <b-card no-body :class="['d-flex', 'align-items-center', 'p-4 py-md-3 px-3 mb-5 my-md-3 my-lg-4', 'shadow-lg border-0', 'layoutGuide']">
    <h3 class="d-none d-xl-block text-white mt-2 mb-0">Fully Responsive & Flexible Layout</h3>
    <h4 class="d-xl-none text-light mb-4 mb-xl-0">Responsive & Flexible Layout</h4>
    <div class="d-flex align-items-center justify-content-around justify-content-md-between mb-4 mb-lg-4 my-xl-5">
      <b-iconstack font-scale="2.5">
        <BIconDisplayFill font-scale="0.45" class="layoutGuide__device" />
        <BIconSquareFill font-scale="0.2" shift-h="3" shift-v="-7.5" class="layoutGuide__devicebg" />
        <BIconSquareFill font-scale="0.2" shift-h="17" shift-v="-7.5" class="layoutGuide__devicebg" />
      </b-iconstack>
      <b-icon v-bind="iconArrowLeftRightStackProps" />
      <b-iconstack font-scale="2.5">
        <BIconTabletFill font-scale="0.45" class="layoutGuide__device" />
        <BIconSquareFill font-scale="0.255" shift-h="6" shift-v="-3" class="layoutGuide__devicebg" />
      </b-iconstack>
      <b-icon v-bind="iconArrowLeftRightStackProps" />
      <b-iconstack font-scale="2.5">
        <BIconTabletLandscapeFill font-scale="0.45" class="layoutGuide__device" />
        <BIconSquareFill font-scale="0.255" shift-h="3" shift-v="-6" class="layoutGuide__devicebg" />
      </b-iconstack>
      <b-icon v-bind="iconArrowLeftRightStackProps" />
      <b-iconstack font-scale="2.5">
        <BIconPhoneFill font-scale="0.45" class="layoutGuide__device" />
        <BIconSquareFill font-scale="0.19" shift-h="11" shift-v="-3.5" class="layoutGuide__devicebg" />
        <BIconSquareFill font-scale="0.19" shift-h="11" shift-v="-10.5" class="layoutGuide__devicebg" />
      </b-iconstack>
    </div>
    <p class="d-none d-lg-block text-center text-light mb-2 font-italic font-weight-normal">With mobile, tablet & desktop support <br> it doesn't matter what device you're using.</p>
    <p class="d-lg-none text-light text-center text-light mb-0 mb-lg-2 font-italic font-weight-normal">With mobile, tablet & desktop support it doesn't matter what device you're using.</p>
  </b-card>
</template>

<script>
import {
  BIconDisplayFill,
  BIconTabletFill,
  BIconTabletLandscapeFill,
  BIconPhoneFill,
  BIconSquareFill
} from "bootstrap-vue"

export default {
  name: 'LayoutSectionGuide',
  components: {
    BIconDisplayFill,
    BIconTabletFill,
    BIconTabletLandscapeFill,
    BIconPhoneFill,
    BIconSquareFill
  },
  data: () => ({
    iconArrowLeftRightStackProps: {
      icon: 'arrow-left-right',
      fontScale: 1.1,
      class: 'layoutGuide__transform text-secondary mx-3 mx-lg-4'
    },
    iconArrowLeftRightProps: {
      icon: 'arrow-left-right',
      fontScale: 0.45,
      shiftV: -10,
      shiftH: 10,
      variant: 'white'
    }
  })
}
</script>

<style lang="scss" scoped>
// $layout-transfer-color: #1b4c8c;
$layout-transfer-color: #fff;
$layout-device-color: #ced4da;

.layoutGuide {
  background: linear-gradient(135deg, #153D77, #2F70AF);

  &__device {
    color: $layout-transfer-color;
  }

  &__devicebg {
    color: #174a8e;
  }

  &__transform {
    color: $layout-device-color !important;
  }
}
</style>
