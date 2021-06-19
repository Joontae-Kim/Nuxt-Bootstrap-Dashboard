<template>
  <b-container fluid>
    <UsersStatics />
    <b-row>
      <b-col cols md="3">
        group <pre>{{ group }}</pre>
      </b-col>
      <b-col cols md="9">
        <client-only>
          users <pre>{{ users }}</pre>
        </client-only>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'UserIdx',
  components: {
    UsersStatics: () => import('~/components/users/statics')
  },
  layout: 'dashboard',
  data: () => ({
    group: [
      'Active',
      'Not Yet Activated',
      'Inactive',
      'Pending Approval'
    ]
  }),
  async fetch () {
    const { list } = await this.$axios.$get('/api/users')
    await this.$store.dispatch('users/DISPATCH_SET', list)
  },
  computed: {
    ...mapGetters({
      users: 'users/getUsers'
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
  }
}
</script>

<style>

</style>
