export default function ({ req, redirect }) {
  if (process.server) {
    console.log(`req.headers => `, req.headers)
    console.log(`req.headers.host => `, req.headers.host)
  }

  if (process.client) {
    console.log(`window.location.origin => `, window.location.origin)
  }
  // const requestURL = process.server
  //   ? new URL(req.headers.referer)
  //   : new URL(window.location.origin)
  // const isEncrypted = requestURL.protocol === 'https:'
  // if (process.env.NODE_ENV !== 'production') {
  //   console.log(`requestURL => ${requestURL}`)
  //   console.log(`isEncrypted => ${isEncrypted}`)
  //   console.log(`requestURL.protocol => ${requestURL.protocol}`)
  // }
  // const requestedFullURL = process.server
  //   ? requestURL.href
  //   : window.location.href
  // if (process.env.NODE_ENV !== 'production') {
  //   console.log(`requestedFullURL => ${requestedFullURL}`)
  // }
  // if (process.env.NODE_ENV !== 'development' && !isEncrypted) {
  //   const redirectHTTPSURL = requestedFullURL.replace('http:', 'https:')
  //   console.log(`redirectHTTPSURL => ${redirectHTTPSURL}`)
  //   // redirect(redirectHTTPSURL)
  // }
}
