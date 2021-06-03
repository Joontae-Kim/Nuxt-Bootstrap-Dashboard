<template>
  <b-container fluid>
    <b-row>
      <b-col cols>
        $route.params {{ $route.params }}
      </b-col>
      <b-col cols>
        event
        <pre>{{ event }}</pre>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'EventDetailed',
  layout: 'dashboard',
  data: () => ({
    event: null
  }),
  async fetch () {
    try {
      console.log(`fetch ~ `)
      // console.log(`      ~ `)
      // this.$nuxt.$emit('pageLoading', true)
      const eventId = this.$route.params.id
      const res = await this.$axios.$get(`/api/event/${eventId}`)
      console.log(`      ~ res => `, res)
      this.event = res.event
    } catch (err) {
      // console.log(`      ~ err => `, err)
      console.log(`      ~ err.message => `, err.message)
      console.log(`      ~ err.response => `, err.response)
    }
  },
  computed: {},
  watch: {
    '$fetchState.pending': {
      immediate: true,
      handler (state) {
        // console.log(`$fetchState.pending ~ `)
        // // console.log(`                    ~ `)
        // console.log(`                    ~ state => `, state)
        if (typeof state !== 'undefined') {
          this.$nuxt.$emit('pageLoading', state)
        }
      }
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {},
  methods: {}
}
</script>

<style>

</style>
