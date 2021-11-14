<template>
  <div class="container">
    <b-row>
      <b-col cols>
        <b-btn @click="callAPITest">
          call Test API
        </b-btn>
      </b-col>
      <b-col cols>
        <b-btn @click="requestError()">
          default
        </b-btn>
      </b-col>
      <b-col cols>
        <b-btn @click="requestError('notfound')">
          notfound
        </b-btn>
      </b-col>
      <b-col cols>
        <b-btn @click="requestError('serverError')">
          serverError
        </b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
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
    },
    async requestError (api = '') {
      try {
        console.log('requestError ~ ')
        // console.log('             ~ ')
        const res = await this.$axios.$get(`/error/${api}`)
        console.log('             ~ res => ', res)
      } catch (e) {
        console.log('             ~  e => ', e)
        console.log('             ~  e.response => ', e.response)
      }
    }
  }
}
</script>

<style>

</style>
