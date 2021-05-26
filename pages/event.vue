<template>
  <b-container fluid>
    <b-row>
      <b-col cols>
        {{ events }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'Event',
  layout: 'dashboard',
  data: () => ({}),
  async fetch () {
    const res = await this.$axios.$get('/api/event')
    this.$store.commit('events/add', res)
  },
  computed: {
    ...mapGetters({
      events: 'events/getEvents'
    })
  },
  watch: {
    '$fetchState.pending': {
      immediate: true,
      handler (state) {
        if (typeof state !== 'undefined') {
          this.$nuxt.$emit('pageLoading', state)
        }
      }
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style>

</style>
