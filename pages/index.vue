<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        nuxt-bootstrap-dashboard
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
        <nuxt-link :to="{path: '/error'}" class="button--grey">
          /error로 이동
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created () {
    await this.callAPITest()
  },
  methods: {
    async callAPITest () {
      try {
        console.log('callAPITest ~ ')
        // console.log(`            ~ `)
        const res = await this.$axios.$get('/test/')
        console.log('            ~ res => ', res)
      } catch (e) {
        console.log('            ~ e => ', e)
        console.log('            ~ e.response => ', e.response)
      }
    }
  }
}
</script>

<style>
</style>
