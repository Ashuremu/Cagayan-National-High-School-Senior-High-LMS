import { API_ENDPOINTS, apiUrl, defaultFetchOptions } from '../config'

export type SessionUser = {
  id: string
  uid: string
  email: string
  roleId: string | null
  role: string | null
}

export async function checkAuthenticated(): Promise<boolean> {
  const user = await getSessionUser()
  return Boolean(user)
}

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const response = await fetch(apiUrl(API_ENDPOINTS.session), {
      method: 'GET',
      ...defaultFetchOptions,
    })
    if (!response.ok) return null

    const payload = (await response.json()) as {
      authenticated: boolean
      user?: SessionUser
    }

    if (!payload.authenticated || !payload.user) return null
    return payload.user
  } catch {
    return null
  }
}
