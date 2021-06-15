import bodyParser from 'body-parser'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-bootstrap-dashboard',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/chartjs',
    '~/plugins/createChartData',
    '~/plugins/formatCurrency'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: {
    dirs: [
      '~/components',
      {
        path: '~/components/base',
        prefix: 'base'
      },
      {
        path: '~/components/dashboard',
        prefix: 'dash'
      },
      '~/components/chart',
      '~/components/common'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: process.env.baseURL || 'http://localhost:3000' // Used as fallback if no runtime config is provided
  },

  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    icons: true
  },

  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },

  serverMiddleware: [
    bodyParser.json(),
    { path: '/test', handler: '~/api/test.js' },
    { path: '/over', handler: '~/api/over.js' },
    { path: '/api/event', handler: '~/api/event.js' },
    { path: '/api/users', handler: '~/api/users.js' }
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: {
      analyzerMode: 'server',
      analyzerHost: '0',
      openAnalyzer: true
    }
  }
}
