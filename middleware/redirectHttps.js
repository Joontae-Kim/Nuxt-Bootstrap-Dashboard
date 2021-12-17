export default function ({ isDev, req, redirect }) {
  const requestURL = process.server
    ? new URL(req.headers.referer)
    : new URL(window.location.origin)
  const isEncrypted = requestURL.protocol === 'https:'
  if (!isDev && !isEncrypted) {
    const redirectHTTPSURL = requestURL.origin.replace('http', 'https')
    redirect(redirectHTTPSURL)
  }
}
