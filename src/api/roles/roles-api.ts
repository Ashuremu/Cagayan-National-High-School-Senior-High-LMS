import { API_ENDPOINTS, apiUrl, defaultFetchOptions } from '../config'

export type RoleOption = {
  id: string
  code: string
  label: string
  uidPrefix: string
  description?: string
  sortOrder: number
}

export type RolesResult =
  | { ok: true; data: { roles: RoleOption[] } }
  | { ok: false; error: { message: string } }

export async function fetchRoles(): Promise<RolesResult> {
  try {
    const response = await fetch(apiUrl(API_ENDPOINTS.roles), {
      method: 'GET',
      ...defaultFetchOptions,
    })

    const payload = await response.json()

    if (!response.ok) {
      return {
        ok: false,
        error: { message: payload.message ?? 'Failed to load roles.' },
      }
    }

    return { ok: true, data: payload as { roles: RoleOption[] } }
  } catch {
    return {
      ok: false,
      error: { message: 'Cannot connect to backend API. Please try again.' },
    }
  }
}
