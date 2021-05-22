export default function ({ $axios, redirect }) {
  // Set baseURL
  // $axios.setBaseURL(process.env.baseURL || 'http://localhost:3000')

  // Add Interceptor
  $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect('/500')
    } else if (error.response.status === 404) {
      redirect('/404')
    } else {
      return Promise.reject(error)
    }
  })
}
