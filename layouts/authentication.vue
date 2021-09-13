<template>
  <div class="wrapper h-100">
    <b-container fluid class="h-100 p-3 position-relative wrapper--authentication">
      <template v-if="$route.name === 'signin'">
        <template v-for="index in 6">
          <div :key="index" :class="`circle circle-layer-${index}`" />
        </template>
      </template>
      <template v-else>
        <div class="bar">
          <template v-for="index in 6">
            <div :key="index" :class="`bar__ticks bar__ticks--${index}`" />
          </template>
        </div>
      </template>
      <Nuxt class="rounded" />
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'AuthenticationLayout',
  data: () => ({}),
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
@import '../assets/styles/layout/authentication.scss';
</style>
