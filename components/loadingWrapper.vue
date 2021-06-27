<template>
  <transition name="loadingFade" appear>
    <div v-show="loading" class="loadingWrapper">
      <div class="d-flex h-100 w-100 justify-content-center align-items-center fs-1">
        <strong class="mr-3 text-gray-700 user-select-none">Loading</strong>
        <div class="throb throb1" />
        <div class="throb throb2" />
        <div class="throb throb3" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LoadingWrapper',
  props: {
    loading: {
      type: Boolean,
      required: true,
      default: (loadingProps) => {
        return typeof loadingProps === 'undefined' ? false : loadingProps
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loadingWrapper {
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: white;
  width: 100%;
  height: calc(100% - 55.3px);
}

.loadingFade-enter-active {
  transition: opacity 0.5s;
}

.loadingFade-leave-active {
  transition: opacity 0.5s;
}

.loadingFade-enter,
.loadingFade-leave-active {
  opacity: 0;
}
</style>
