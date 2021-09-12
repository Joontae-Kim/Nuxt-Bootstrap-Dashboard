<template>
  <div class="wrapper vh-100">
    <b-container fluid class="h-100 p-3 position-relative wrapper--authentication">
      <template v-for="index in 6">
        <span :key="index" :class="`circle circle-layer-${index}`" />
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
