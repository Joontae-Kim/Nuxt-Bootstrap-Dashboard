import bodyParser from 'body-parser'
import { extendRoutes } from './router'
const processEnv = require('dotenv').config({ path: `./env/.env.${process.env.NODE_ENV}` }).parsed

if (process.env.NODE_ENV !== 'production') {
  console.log('processEnv: ', processEnv)
  console.log(`process.env.NODE_ENV => ${process.env.NODE_ENV}`)
}

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
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
    '~/plugins/formatCurrency',
    '~/plugins/importBootstrapVueIcons'
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

  // Extend Router
  router: {
    base: processEnv.ROUTER_BASEURL,
    scrollBehavior: (to, from, savedPosition) => {
      return { x: 0, y: 0 }
    },
    extendRoutes,
    middleware: [
      'checkRoute',
      'redirectHttps'
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxt/image'
  ],

  axios: {
    baseURL: processEnv.AXIOS_BASEURL
  },

  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    icons: false,
    componentPlugins: [
      'BadgePlugin',
      'ButtonPlugin',
      'ButtonGroupPlugin',
      'CardPlugin',
      'DropdownPlugin',
      'FormPlugin',
      'FormCheckboxPlugin',
      'FormDatepickerPlugin',
      'FormGroupPlugin',
      'FormInputPlugin',
      'FormRadioPlugin',
      'FormSelectPlugin',
      'FormSpinbuttonPlugin',
      'ImagePlugin',
      'InputGroupPlugin',
      'LayoutPlugin',
      'LinkPlugin',
      'ListGroupPlugin',
      'NavPlugin',
      'NavbarPlugin',
      'OverlayPlugin',
      'PaginationPlugin',
      'ProgressPlugin',
      'SpinnerPlugin',
      'TablePlugin'
    ],
    directivePlugins: [
      'VBTogglePlugin'
    ],
    config: {
      breakpoints: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
    }
  },

  image: {
    screens: {
      xs: 479.98,
      sm: 639.98,
      md: 991.98,
      lg: 1119.98,
      xl: 1679.98,
      xxl: 2559.98,
      sxl: 2560
    }
  },

  serverMiddleware: [
    bodyParser.json(),
    { path: '/test', handler: '~/api/test.js' },
    { path: '/api/over', handler: '~/api/over.js' },
    { path: '/api/event', handler: '~/api/event.js' },
    { path: '/api/users', handler: '~/api/users.js' }
  ],

  // watch custom files for restarting the server.
  watch: [
    // '~/minxin/*.js',
    // '~/minxin/*/*.js'
    '~/minxin'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
    ['@nuxtjs/dotenv', { filename: `./env/.env.${process.env.NODE_ENV}`, systemvars: true }],
    '@nuxtjs/svg'
  ],

  // buildDir Configuration: https://nuxtjs.org/docs/configuration-glossary/configuration-builddir
  buildDir: process.env.BUILD_ANALYZE_DIR === 'null' ? processEnv.BUILD_DIR : processEnv.BUILD_ANALYZE_DIR,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true
    },
    devtools: processEnv.NODE_ENV !== 'production',
    analyze: process.env.BUILD_ANALYZE_DIR === 'null'
      ? false
      : {
          analyzerMode: 'server',
          analyzerHost: '0',
          openAnalyzer: process.env.BUILD_ANALYZE_DIR !== 'false'
        }
  }
}
