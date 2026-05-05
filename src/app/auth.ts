const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.trim() || 'http://localhost:5000/api'

export type SessionUser = {
  id: string
  email: string
  role: string
}

function sessionUrl() {
  return `${API_BASE_URL.replace(/\/+$/, '')}/auth/session`
}

function logoutUrl() {
  return `${API_BASE_URL.replace(/\/+$/, '')}/auth/logout`
}

export async function checkAuthenticated() {
  const user = await getSessionUser()
  return Boolean(user)
}

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const response = await fetch(sessionUrl(), {
      method: 'GET',
      credentials: 'include',
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

export async function clearAuth() {
  try {
    await fetch(logoutUrl(), {
      method: 'POST',
      credentials: 'include',
    })
  } catch {
    // Ignore network errors on logout.
  }
}
