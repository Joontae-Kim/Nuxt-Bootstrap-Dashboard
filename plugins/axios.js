export default function ({ $axios, redirect }) {
  // Set baseURL
  // $axios.setBaseURL(process.env.baseURL || 'http://localhost:3000')

  // Add Interceptor
  $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect({ name: 'serverError' })
    } else if (error.response.status === 404) {
      console.log('error.response: ', error.response)
      const requestPath = error.response.request.path
      console.log('error.response.request.path ', error.response.request.path)
      const queryiedType = requestPath.includes('/api/users/')
        ? { _org: 'usr', tp: 'qr' }
        : requestPath.includes('/api/event')
          ? { _org: 'evt', tp: 'qr' }
          : null
      redirect({ name: 'notFound', query: queryiedType })
    } else {
      return Promise.reject(error)
    }
  })
}
