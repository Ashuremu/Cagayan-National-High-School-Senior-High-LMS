type LoginRequest = {
  email: string
  password: string
}

type LoginUser = {
  id: string
  email: string
  role: string
}

type LoginSuccess = {
  user: LoginUser
}

type LoginError = {
  message: string
}

type LoginResult = { ok: true; data: LoginSuccess } | { ok: false; error: LoginError }
const BACKEND_API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.trim() || 'http://localhost:5000/api'

function buildBackendLoginUrl() {
  const normalizedBaseUrl = BACKEND_API_BASE_URL.replace(/\/+$/, '')
  return `${normalizedBaseUrl}/auth/login`
}

export async function loginWithBackend(credentials: LoginRequest): Promise<LoginResult> {
  try {
    const response = await fetch(buildBackendLoginUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
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
