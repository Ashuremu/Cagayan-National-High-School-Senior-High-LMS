export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.trim() || 'http://localhost:5000/api'

/** Endpoint paths — mirror Cagayan_Backend/src/endpoints/ folders */
export const API_ENDPOINTS = {
  apiStatus: '/',
  login: '/login',
  session: '/session',
  logout: '/logout',
  roles: '/roles',
  users: '/users',
  logs: '/logs',
} as const

export function apiUrl(path: string): string {
  const base = API_BASE_URL.replace(/\/+$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalizedPath}`
}

export const defaultFetchOptions = {
  credentials: 'include' as const,
}
