const cookiePath = process.env.BASE_URL || '/'
export function clearSession(http) {
  const paths = new Set([cookiePath, cookiePath.replace(/\/$/, '') || '/'])
  paths.forEach((path) => {
    document.cookie = `hexToken=; Max-Age=0; path=${path}; SameSite=Lax`
  })
  const { common } = http.defaults.headers
  delete common.Authorization
}
export function saveSession(token, expired) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `hexToken=${token}; expires=${new Date(expired).toUTCString()}; path=${cookiePath}; SameSite=Lax${secure}`
}
