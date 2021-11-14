export default {
  methods: {
    async searchUser (query) {
      const querys = {}
      for (const [key, value] of Object.entries(query)) {
        if (value !== null) {
          if (typeof value === 'string') {
            querys[key] = value
          } else if (Array.isArray(value) && value.length) {
            querys[key] = value.join(',')
          }
        }
      }
      const queryRes = await this.$axios.$get('/api/users/', { params: querys })
      return queryRes
    }
  }
}
