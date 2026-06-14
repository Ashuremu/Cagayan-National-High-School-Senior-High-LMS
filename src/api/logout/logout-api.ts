import { API_ENDPOINTS, apiUrl, defaultFetchOptions } from '../config'

export type LogoutError = {
  message: string
}

export type LogoutResult = { ok: true } | { ok: false; error: LogoutError }

export async function logoutWithBackend(): Promise<LogoutResult> {
  try {
    const response = await fetch(apiUrl(API_ENDPOINTS.logout), {
      method: 'POST',
      ...defaultFetchOptions,
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
