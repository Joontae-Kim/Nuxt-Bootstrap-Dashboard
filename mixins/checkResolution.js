export default {
  data: () => ({
    isMobile: null
  }),
  mounted () {
    this.checkIsMobile()
    window.addEventListener('resize', this.checkIsMobile)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.checkIsMobile)
  },
  methods: {
    checkIsMobile () {
      this.isMobile = window.innerWidth < 1024
    }
  }
}
