export default {
  methods: {
    async searchEvent (query) {
      const querys = {}
      for (const [key, value] of Object.entries(query)) {
        console.log(`${key}: ${value}`)
        if (value) {
          querys[key] = value
        }
      }
      const queryRes = await this.$axios.$get('/api/event/', { params: querys })
      return queryRes
    }
  }
}
