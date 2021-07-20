import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = () => import('~/pages/index')
const overview = () => import('~/pages/overview')
const page404 = () => import('~/pages/404')
const page500 = () => import('~/pages/500')
const events = () => import('~/pages/event/index')
const event = () => import('~/pages/event/_id')
const users = () => import('~/pages/users/index')
const user = () => import('~/pages/users/_id')

export function extendRoutes (routes, resolve) {
  return [
    {
      name: 'index',
      path: '/',
      component: resolve(__dirname, 'pages/index.vue'),
      chunkName: 'pages/index'
    },
    {
      name: '404',
      path: '/404',
      component: resolve(__dirname, 'pages/404.vue'),
      chunkName: 'pages/404'
    },
    {
      name: '500',
      path: '/500',
      component: resolve(__dirname, 'pages/500'),
      chunkName: 'pages/500'
    },
    {
      name: 'overview',
      path: '/overview',
      component: resolve(__dirname, 'pages/overview.vue'),
      chunkName: 'pages/overview'
    },
    {
      name: 'events',
      path: '/events',
      component: resolve(__dirname, 'pages/events/index'),
      chunkName: 'pages/event/index',
    },
    {
      name: 'eventDetails',
      path: '/events/event/:id',
      component: resolve(__dirname, 'pages/events/_id'),
      chunkName: 'pages/event/_id'
    },
    {
      name: 'users',
      path: '/users',
      component: resolve(__dirname, 'pages/users/index'),
      chunkName: 'pages/users/index'
    },
    {
      name: 'userDetails',
      path: 'users/user/:id',
      component: resolve(__dirname, 'pages/users/_id'),
      chunkName: 'pages/users/_id'
    }
  ]
}

export function createRouter () {
  return new Router({
    base: '/',
    mode: 'history',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    routes: [
      {
        name: 'index',
        path: '/',
        component: index
      },
      {
        name: '404',
        path: '/404',
        component: overview
      },
      {
        name: '500',
        path: '/500',
        component: page500
      },
      {
        name: 'overview',
        path: '/overview',
        component: page404
      },
      {
        name: 'events',
        path: '/events',
        component: events
      },
      {
        name: 'eventDetails',
        path: '/event/:id',
        component: event
      },
      {
        name: 'users',
        path: '/users',
        component: users
      },
      {
        name: 'userDetails',
        path: '/user/:id',
        component: user
      }
    ]
  })
}
