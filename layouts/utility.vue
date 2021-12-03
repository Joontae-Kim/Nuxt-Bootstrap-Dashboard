<template>
  <transition name="fade" mode="out-in">
    <b-container v-show="showContent" class="px-0" fluid>
      <Nuxt class="min-vh-100" />
    </b-container>
  </transition>
</template>

<script>
export default {
  name: 'UtilityLayout',
  data: () => ({
    showContent: false
  }),
  mounted () {
    document.body.classList.add('wrapper', 'wrapper--utility')
    this.$nextTick(() => { this.showContent = true })
  },
  destroyed () {
    document.body.classList.remove('wrapper', 'wrapper--utility')
  },
  methods: {}
}
</script>

<style lang="scss">
</style>
