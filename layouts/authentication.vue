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
        <template v-else-if="$route.name === 'signup'">
          <div class="bar">
            <template v-for="index in 6">
              <div :key="index" :class="`bar__ticks bar__ticks--${index}`" />
            </template>
          </div>
        </template>
        <template v-else>
          <b-row class="doughnuts h-100">
            <b-col
              v-for="r in 6"
              :key="r"
              cols="6"
              sm="4"
              md="6"
              lg="4"
              class="d-flex"
              align-self="center"
            >
              <div :class="['doughnut', `doughnut--${r}`, 'my-4 mx-auto m-sm-auto my-md-4 m-lg-auto']">
                <div class="doughnut__punch" />
              </div>
            </b-col>
          </b-row>
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
    document.body.classList.add('vh-100', 'overflow-hidden')
    this.$nextTick(() => { this.showContent = true })
  },
  destroyed () {
    document.body.classList.remove('vh-100', 'overflow-hidden')
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
