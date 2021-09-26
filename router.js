import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function extendRoutes (routes, resolve) {
  return [
    {
      name: 'index',
      path: '/',
      component: resolve(__dirname, 'pages/index.vue'),
      chunkName: 'pages/index'
    },
    {
      name: 'signin',
      path: '/signin',
      component: resolve(__dirname, 'pages/signin.vue'),
      chunkName: 'pages/signin',
      meta: { parent: 'authentication' }
    },
    {
      name: 'signup',
      path: '/signup',
      component: resolve(__dirname, 'pages/signup.vue'),
      chunkName: 'pages/signup',
      meta: { parent: 'authentication' }
    },
    {
      name: 'resetpassword',
      path: '/resetpassword',
      component: resolve(__dirname, 'pages/resetPassword.vue'),
      chunkName: 'pages/resetPassword',
      meta: { parent: 'authentication' }
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
      name: 'eventsStatics',
      path: '/events/statics',
      component: resolve(__dirname, 'pages/events/index'),
      chunkName: 'pages/event/index',
      meta: { parent: 'events' }
    },
    {
      name: 'eventsList',
      path: '/events/list',
      component: resolve(__dirname, 'pages/events/list'),
      chunkName: 'pages/event/list',
      meta: { parent: 'events' }
    },
    {
      name: 'eventDetails',
      path: '/events/event/:id',
      component: resolve(__dirname, 'pages/events/_id'),
      chunkName: 'pages/event/_id',
      meta: { parent: 'events' }
    },
    {
      name: 'userStatics',
      path: '/users/statics',
      component: resolve(__dirname, 'pages/users/statics'),
      chunkName: 'pages/users/statics',
      meta: { parent: 'users' }
    },
    {
      name: 'usersList',
      path: '/users/list',
      component: resolve(__dirname, 'pages/users/list'),
      chunkName: 'pages/users/list',
      meta: { parent: 'users' }
    },
    {
      name: 'userDetails',
      path: '/users/user/:id',
      component: resolve(__dirname, 'pages/users/_id'),
      chunkName: 'pages/users/_id',
      meta: { parent: 'users' }
    },
    {
      name: 'notFound',
      path: '/404',
      component: resolve(__dirname, 'pages/404.vue')
    },
    {
      name: 'serverError',
      path: '/500',
      component: resolve(__dirname, 'pages/404.vue')
    }
  ]
}
