<template>
  <b-container fluid>
    <b-row>
      <b-col cols>
        {{ res }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Event',
  layout: 'dashboard',
  data: () => ({
    res: {}
  }),
  async fetch () {
    this.res = await this.$axios.$get('/api/event')
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
