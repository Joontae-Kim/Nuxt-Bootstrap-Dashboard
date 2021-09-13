<template>
  <transition name="fade" mode="out-in">
    <div v-show="showContent" class="wrapper h-100">
      <b-container fluid class="h-100 p-3 position-relative wrapper--authentication">
        <template v-if="$route.name === 'signin'">
          <template v-for="index in 3">
            <div :key="4 - index" :class="`circle circle-layer-${4 - index}`" />
          </template>
          <template v-for="index in 3">
            <div :key="index + 3" :class="`circle circle-layer-${index + 3}`" />
          </template>
        </template>
        <template v-else>
          <div class="bar">
            <template v-for="index in 6">
              <div :key="index" :class="`bar__ticks bar__ticks--${index}`" />
            </template>
          </div>
        </template>
        <transition name="fade" mode="out-in">
          <Nuxt class="rounded z-index-1000" />
        </transition>
      </b-container>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AuthenticationLayout',
  data: () => ({
    showContent: false
  }),
  computed: {},
  watch: {},
  created () {},
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

<style lang="scss" scoped>
@import '../assets/styles/layout/authentication.scss';
</style>
