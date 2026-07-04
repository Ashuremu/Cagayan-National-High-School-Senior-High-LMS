import { API_ENDPOINTS, apiUrl, defaultFetchOptions } from '../config'

export type ManageUserRecord = {
  id: string
  uid: string
  firstName: string | null
  middleName: string | null
  lastName: string | null
  suffix: string | null
  name: string
  role: string | null
  roleId: string | null
  email: string
  status: string
  lastLogin: string | null
  createdAt: string
}

export type CreateUserRequest = {
  firstName: string
  middleName: string
  lastName: string
  suffix?: string
  email: string
  role: string
  password?: string
}

export type CreateUserSuccess = {
  user: ManageUserRecord
  temporaryPassword: string | null
}

export type UsersListSuccess = {
  users: ManageUserRecord[]
}

type ApiError = { message: string }

export type CreateUserResult =
  | { ok: true; data: CreateUserSuccess }
  | { ok: false; error: ApiError }

export type UsersListResult =
  | { ok: true; data: UsersListSuccess }
  | { ok: false; error: ApiError }

export async function createUserWithBackend(payload: CreateUserRequest): Promise<CreateUserResult> {
  try {
    const response = await fetch(apiUrl(API_ENDPOINTS.users), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      ...defaultFetchOptions,
      body: JSON.stringify(payload),
    })

    const body = await response.json()

    if (!response.ok) {
      return {
        ok: false,
        error: { message: body.message ?? 'Failed to create user.' },
      }
    }

    return { ok: true, data: body as CreateUserSuccess }
  } catch {
    return {
      ok: false,
      error: { message: 'Cannot connect to backend API. Please try again.' },
    }
  }
}

export async function fetchUsers(): Promise<UsersListResult> {
  try {
    const response = await fetch(apiUrl(API_ENDPOINTS.users), {
      method: 'GET',
      ...defaultFetchOptions,
    })

    const body = await response.json()

    if (!response.ok) {
      return {
        ok: false,
        error: { message: body.message ?? 'Failed to load users.' },
      }
    }

    return { ok: true, data: body as UsersListSuccess }
  } catch {
    return {
      ok: false,
      error: { message: 'Cannot connect to backend API. Please try again.' },
    }
  }
}

function formatLastLogin(value: string | null): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function toManageUserRow(user: ManageUserRecord) {
  return {
    id: user.uid,
    name: user.name,
    role: user.role ?? '—',
    email: user.email,
    status: user.status,
    lastLogin: formatLastLogin(user.lastLogin),
  }
}
