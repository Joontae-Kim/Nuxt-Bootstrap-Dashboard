<template>
  <b-row class="mb-5 py-5" align-h="center">
    <b-col cols="12" class="text-center mb-4">
      <h2 class="mb-0">Responsive Layout & Mobile Friendly Interface</h2>
    </b-col>
    <b-col cols="12" md="10">
      <b-row no-gutters class="d-flex d-md-none">
        <b-col cols>
          <b-card no-body :class="[responsiveLayoutClass.card, 'flex-grow-1', 'p-3 my-4']">
            Common Message Zone on mobile
          </b-card>
        </b-col>
      </b-row>
      <b-row class="">
        <b-col cols md="10" class="d-flex flex-column">
          <b-row class="mb-4 h-100">
            <b-col cols md="9" class="mb-4">
              <b-card no-body :class="responsiveLayoutClass.card">
                <img src="1-pc-xxl.png" alt="" :class="responsiveLayoutClass.img">
              </b-card>
            </b-col>
            <b-col cols md="3" class="d-flex align-items-center justify-content-center my-4 my-md-0 layoutWrapper">
              <layoutTransform class="justify-content-xl-around" left-icon="display" right-icon="phone" />
            </b-col>
            <b-col cols md="3" class="d-none d-md-flex align-items-center justify-content-center layoutWrapper">
              <layoutTransform class="justify-content-xl-around" left-icon="tablet" right-icon="display" :vertical="true" />
            </b-col>
            <b-col cols md="7" offset-md="1">
              <b-card no-body :class="['d-none d-md-flex', responsiveLayoutClass.card, 'flex-grow-1', 'p-3 my-5']">
                Common Message Zone on md size device
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols md="2" class="d-flex flex-column align-items-end mb-4 mb-md-0 layoutWrapper">
          <div class="mb-4 mb-md-0 w-100">
            <b-card no-body :class="responsiveLayoutClass.card">
              <img src="4-1-mobile-xs.png" alt="" :class="responsiveLayoutClass.img">
            </b-card>
          </div>
          <layoutTransform class="my-4 my-md-auto my-xl-4 w-100" right-icon="phone" :vertical="true">
            <template #left-icon>
              <b-icon icon="tablet-landscape" font-scale="1.5" class="d-none d-lg-inline-block layout__device" />
              <b-icon icon="tablet" font-scale="1.5" class="d-inline-block d-md-none layout__device" />
            </template>
          </layoutTransform>
        </b-col>
        <b-col cols md="12">
          <b-row>
            <b-col cols md="4" class="mb-4 mb-md-0">
              <b-card no-body :class="responsiveLayoutClass.card">
                <img src="3-tablet-md.png" alt="" :class="responsiveLayoutClass.img">
              </b-card>
            </b-col>
            <b-col cols md="2" class="d-flex align-items-center py-4 mb-4 my-md-0 layoutWrapper">
              <layoutTransform>
                <template #left-icon>
                  <b-icon icon="tablet" font-scale="1.5" class="d-none d-lg-inline-block layout__device" />
                  <b-icon icon="tablet-landscape" font-scale="1.5" class="d-inline-block d-md-none layout__device" />
                </template>
                <template #right-icon>
                  <b-icon icon="tablet-landscape" font-scale="1.5" class="d-none d-lg-inline-block layout__device" />
                  <b-icon icon="tablet" font-scale="1.5" class="d-inline-block d-md-none layout__device" />
                </template>
              </layoutTransform>
            </b-col>
            <b-col cols md="6">
              <b-card no-body :class="responsiveLayoutClass.card">
                <img src="2-tablet-md.png" alt="" :class="responsiveLayoutClass.img">
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import layoutTransform from "~/components/landing/ui/layout-transform"

export default {
  name: 'LayoutSection',
  components: {
    layoutTransform
  },
  data: () => ({
    responsiveLayoutClass: {
      card: 'shadow border-0',
      img: 'w-100 rounded'
    }
  })
}
</script>

<style lang="scss" scoped>
$layout-transfer-color: #1b4c8c; // #1b4d8d;
$layout-device-color: #adb5bd;

.layout {
  &__device {
    color: $layout-device-color;
  }
  &__transfer {
    color: $layout-transfer-color;
  }
}

.layoutWrapper::v-deep .layout__component {
  .layout {
    &__device {
      color: $layout-device-color;
    }
    &__transfer {
      color: $layout-transfer-color;
    }
  }
}
</style>
