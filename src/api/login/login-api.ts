import { API_ENDPOINTS, apiUrl, defaultFetchOptions } from '../config'

export type LoginRequest = {
  email: string
  password: string
}

export type LoginUser = {
  id: string
  uid: string
  email: string
  roleId: string | null
  role: string | null
}

export type LoginSuccess = {
  user: LoginUser
}

export type LoginError = {
  message: string
}

export type LoginResult = { ok: true; data: LoginSuccess } | { ok: false; error: LoginError }

export async function loginWithBackend(credentials: LoginRequest): Promise<LoginResult> {
  try {
    const response = await fetch(apiUrl(API_ENDPOINTS.login), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      ...defaultFetchOptions,
      body: JSON.stringify(credentials),
    })

    const payload = await response.json()

    if (!response.ok) {
      return {
        ok: false,
        error: { message: payload.message ?? 'Login failed. Please try again.' },
      }
    }

    return { ok: true, data: payload as LoginSuccess }
  } catch {
    return {
      ok: false,
      error: { message: 'Cannot connect to backend API. Please try again.' },
    }
  }
}
