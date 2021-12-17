export default function ({ isDev, req, redirect }) {
  const requestURL = process.server
    ? new URL(req.headers.referer)
    : new URL(window.location.origin)
  const isEncrypted = requestURL.protocol === 'https:'
  const requestedFullURL = process.server
    ? requestURL.href
    : window.location.href
  const redirectHTTPSURL = requestedFullURL.replace('http', 'https')
  if (process.env.NODE_ENV !== 'production') {
    console.log('redirectHTTPSURL => ', redirectHTTPSURL)
  }
  if (process.env.NODE_ENV !== 'development' && !isEncrypted) {
    redirect(redirectHTTPSURL)
  }
}
