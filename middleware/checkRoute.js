export default function ({ store, route, redirect }) {
  if (process.server) {
    if (route.name === null) {
      redirect({ name: 'notFound' })
    }
  } else if (process.client) {
    store.app.router.beforeEach((to, from, next) => {
      if (to.name !== null) {
        next()
      } else {
        next({ name: 'notFound' })
      }
    })
  }
}
