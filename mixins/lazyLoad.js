export default {
  name: 'lazyLoadMixin',
  data: () => ({
    disabledLazy: false,
    lazyLoader: null,
    isSupportIntersectionObserver: true
  }),
  computed: {},
  beforeDestroy () {
    if (this.lazyLoader && window.IntersectionObserver) {
      this.lazyLoader.disconnect()
    }
  },
  methods: {
    createLazyload (handler, option, el, customEntriesHandler = null, customHandler = null, customObserver = null) {
      // Declare wheather the brower support IntersectionObserver API to `isSupportIntersectionObserver` variable
      this.isSupportIntersectionObserver = window.IntersectionObserver

      // Check wheather the brower support IntersectionObserver API
      if (this.isSupportIntersectionObserver) {
        // Create the IntersectionObserver Instance
        this.lazyLoader = new IntersectionObserver(
          !customEntriesHandler
            ? function (entries, observer) {
              entries.forEach(({ target, isIntersecting }) => {
                if (isIntersecting) {
                  handler(target)
                  observer.unobserve(target)
                }
              })
            }
            : customEntriesHandler
          , option)
        // Observe el
        if (el.length) {
          if (customObserver) {
            customObserver(el)
          } else {
            el.forEach(dom => this.lazyLoader.observe(dom))
          }
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (!customHandler) {
          el.forEach((dom) => {
            handler(dom)
          })
        } else {
          el.forEach((dom) => {
            customHandler(dom)
          })
        }
      }
    }
  }
}
