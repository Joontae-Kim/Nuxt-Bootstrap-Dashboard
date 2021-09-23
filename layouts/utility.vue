<template>
  <transition name="fade" mode="out-in">
    <div v-show="showContent" class="wrapper wrapper--utility">
      <b-container class="h-100">
        <Nuxt class="" />
      </b-container>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'UtilityLayout',
  data: () => ({
    showContent: false
  }),
  mounted () {
    this.setDomHeight()
    this.$nextTick(() => { this.showContent = true })
  },
  destroyed () {
    setTimeout(() => {
      this.destractDomHeight()
    }, 1200)
  },
  methods: {
    setDomHeight () {
      document.getElementsByTagName('html')[0].classList.add('h-100')
      document.body.classList.add('h-100')
      document.getElementById('__nuxt').classList.add('h-100')
      document.getElementById('__layout').classList.add('h-100')
    },
    destractDomHeight () {
      document.getElementsByTagName('html')[0].classList.remove('h-100')
      document.body.classList.remove('h-100')
      document.getElementById('__nuxt').classList.remove('h-100')
      document.getElementById('__layout').classList.remove('h-100')
    }
  }
}
</script>

<style lang="scss">
</style>
