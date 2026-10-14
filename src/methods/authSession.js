const cookiePath = process.env.BASE_URL || '/'
const cookieName = 'snblAuthToken'

export function readSession() {
  const prefix = `${cookieName}=`
  const cookie = document.cookie.split(';').map(value => value.trim()).find(value => value.startsWith(prefix))
  return cookie ? cookie.slice(prefix.length) : ''
}

export function clearSession(http) {
  const paths = new Set([cookiePath, cookiePath.replace(/\/$/, '') || '/'])
  paths.forEach((path) => {
    document.cookie = `${cookieName}=; Max-Age=0; path=${path}; SameSite=Lax`
    // Only remove the old cookie at this application's paths, not another site's root cookie.
    document.cookie = `hexToken=; Max-Age=0; path=${path}; SameSite=Lax`
  })
  const { common } = http.defaults.headers
  delete common.Authorization
}
export function saveSession(token, expired) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${cookieName}=${token}; expires=${new Date(expired).toUTCString()}; path=${cookiePath}; SameSite=Lax${secure}`
}
