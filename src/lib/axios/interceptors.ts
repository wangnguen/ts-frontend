import { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { axiosInstance, refreshClient } from './config'

// ── Custom config flag ────────────────────────────────────────────────────────

declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuth?: boolean
    _retry?: boolean
  }
}

// ── Token helpers ─────────────────────────────────────────────────────────────

export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken')
}
export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken')
}
export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}
export function clearTokens(): void {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

// ── ApiError ──────────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

function toApiError(error: AxiosError): ApiError {
  const body = error.response?.data as { message?: string } | undefined
  return new ApiError(error.response?.status ?? 0, body?.message ?? error.message, body)
}

// ── Refresh token state ───────────────────────────────────────────────────────

let isRefreshing = false
let refreshQueue: Array<(token: string | null) => void> = []

async function doRefresh(): Promise<string | null> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return null
  try {
    type Envelope = { data: { accessToken: string; refreshToken: string } }
    const res = await refreshClient.post<Envelope>(
      '/auth/refresh-token',
      { refreshToken },
      { headers: { Authorization: `Bearer ${refreshToken}` } },
    )
    const { accessToken, refreshToken: newRefresh } = res.data.data
    setTokens(accessToken, newRefresh)
    return accessToken
  } catch {
    clearTokens()
    return null
  }
}

// ── Attach interceptors ───────────────────────────────────────────────────────

export function applyInterceptors(instance: AxiosInstance): void {
  // Request — attach access token unless skipAuth
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (!config.skipAuth) {
      const token = getAccessToken()
      if (token) config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Response — unwrap envelope { statusCode, message, data } → data; 401 → refresh & retry
  instance.interceptors.response.use(
    (response) => {
      if (response.status === 204) return response
      const body = response.data
      if (body && typeof body === 'object' && 'data' in body) {
        response.data = body.data
      }
      return response
    },
    async (error: AxiosError) => {
      const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
      const skip = (original as { skipAuth?: boolean })?.skipAuth

      if (!original || error.response?.status !== 401 || original._retry || skip) {
        return Promise.reject(toApiError(error))
      }

      original._retry = true

      if (!isRefreshing) {
        isRefreshing = true
        const newToken = await doRefresh()
        isRefreshing = false
        refreshQueue.forEach((cb) => cb(newToken))
        refreshQueue = []

        if (!newToken) {
          window.location.href = '/login'
          return Promise.reject(toApiError(error))
        }
        original.headers.Authorization = `Bearer ${newToken}`
        return axiosInstance(original)
      }

      return new Promise<unknown>((resolve, reject) => {
        refreshQueue.push((token) => {
          if (!token) return reject(toApiError(error))
          original.headers.Authorization = `Bearer ${token}`
          resolve(axiosInstance(original))
        })
      })
    },
  )
}
