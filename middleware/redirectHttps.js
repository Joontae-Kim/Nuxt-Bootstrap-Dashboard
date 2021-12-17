export default function ({ req, redirect }) {
  let isEncrypted = true
  if (process.server) {
    isEncrypted = req.headers['x-forwarded-proto'] === 'https'
  }

  if (process.client) {
    isEncrypted = new URL(window.location.origin).protocol === 'https:'
  }

  if (process.env.NODE_ENV !== 'development' && !isEncrypted) {
    const redirectHTTPSURL = process.server
      ? 'https://' + req.headers.host + req.originalUrl
      : window.location.href.replace('http', 'https')
    redirect(redirectHTTPSURL)
  }
}
