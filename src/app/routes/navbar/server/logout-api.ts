type LogoutError = {
  message: string
}

type LogoutResult = { ok: true } | { ok: false; error: LogoutError }

const BACKEND_API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.trim() || 'http://localhost:5000/api'

function buildBackendLogoutUrl() {
  const normalizedBaseUrl = BACKEND_API_BASE_URL.replace(/\/+$/, '')
  return `${normalizedBaseUrl}/auth/logout`
}

export async function logoutWithBackend(): Promise<LogoutResult> {
  try {
    const response = await fetch(buildBackendLogoutUrl(), {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) {
      let message = 'Logout failed. Please try again.'
      try {
        const payload = (await response.json()) as { message?: string }
        if (payload?.message) {
          message = payload.message
        }
      } catch {
        // Ignore JSON parse errors and use default message.
      }

      return { ok: false, error: { message } }
    }

    return { ok: true }
  } catch {
    return {
      ok: false,
      error: { message: 'Cannot connect to backend API. Please try again.' },
    }
  }
}
