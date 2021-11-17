<template>
  <img :data-src="icon" :alt="title" :title="title" style="width: 2rem;">
</template>

<script>
export default {
  props: {
    icon: {
      required: true,
      type: String
    },
    title: {
      required: true,
      type: String
    }
  }
}
</script>

<style>

</style>
