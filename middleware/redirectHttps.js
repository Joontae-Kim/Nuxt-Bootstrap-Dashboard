export default function ({ req, redirect }) {
  let isEncrypted = true
  if (process.server) {
    // x-forwarded-proto
    console.log(`req.headers => `, req.headers)
    console.log(`req.originalUrl => `, req.originalUrl)
    isEncrypted = req.headers['x-forwarded-proto'] === 'https'
  }

  if (process.client) {
    isEncrypted = new URL(window.location.origin).protocol === 'https:'
  }

  console.log('isEncrypted: ', isEncrypted)
  if (process.env.NODE_ENV !== 'development' && !isEncrypted) {
    const redirectHTTPSURL = process.server
      ? 'https://' + req.get('host') + req.originalUrl
      : window.location.href.replace('http', 'https')
    console.log(`redirectHTTPSURL => ${redirectHTTPSURL}`)
    // redirect(redirectHTTPSURL)
  }
}
