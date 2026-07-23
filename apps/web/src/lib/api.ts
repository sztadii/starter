import { queryClient } from '@/lib/queryClient'

const TOKEN_KEY = 'starter_token'

export function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export type Me = {
  id: string
  username: string
}

export type AuthResult = {
  token: string
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers)
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json')
  }

  const token = getToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const apiUrl = import.meta.env.VITE_API_URL
  const response = await fetch(`${apiUrl}${path}`, { ...init, headers })
  const data = (await response.json().catch(() => ({}))) as {
    error?: string
  } & T

  if (!response.ok) {
    if (response.status === 401 && shouldLogoutOnUnauthorized(path)) {
      logout()
    }
    throw new ApiError(data.error ?? 'Request failed', response.status)
  }
  return data
}

function shouldLogoutOnUnauthorized(path: string): boolean {
  return (
    path !== '/auth/login' &&
    path !== '/auth/register' &&
    path !== '/auth/change-password'
  )
}

export function logout(): void {
  clearToken()
  queryClient.clear()
  if (!window.location.pathname.startsWith('/login')) {
    window.location.assign('/login')
  }
}

export const api = {
  register(input: { username: string; password: string }) {
    return request<AuthResult>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },
  login(username: string, password: string) {
    return request<AuthResult>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  },
  me() {
    return request<Me>('/auth/me')
  },
  changePassword(input: { currentPassword: string; password: string }) {
    return request<{ ok: true }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },
}
