export default {
  name: 'watchFetchStatePending',
  data () {
    return {}
  },
  watch: {
    '$fetchState.pending': {
      handler (state) {
        if (!state) {
          this.$nuxt.$emit('pageLoading', false)
        }
      }
    }
  },
  computed: {},
  created () {},
  mounted () {
    if (this.$fetchState.pending === false) {
      this.$nuxt.$emit('pageLoading', false)
    }
  },
  methods: {}
}
