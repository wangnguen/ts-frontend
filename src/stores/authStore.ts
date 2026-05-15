import { create } from 'zustand'
import {
  type AuthUser,
  type AuthResponse,
  authApi,
  setTokens,
  clearTokens,
  getAccessToken,
  getRefreshToken,
} from '../lib/api'

interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  refreshToken: string | null
  pendingToken: string | null
  pendingEmail: string | null
  pendingPassword: string | null
  isAuthenticated: boolean

  setAuth: (data: AuthResponse) => void
  setPending2FA: (token: string, email: string, password: string) => void
  logout: () => Promise<void>
  loadFromStorage: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  pendingToken: null,
  pendingEmail: null,
  pendingPassword: null,
  isAuthenticated: false,

  setAuth: (data: AuthResponse) => {
    setTokens(data.accessToken, data.refreshToken)
    localStorage.setItem('user', JSON.stringify(data.user))
    set({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      pendingToken: null,
      pendingEmail: null,
      pendingPassword: null,
      isAuthenticated: true,
    })
  },

  setPending2FA: (token: string, email: string, password: string) => {
    set({ pendingToken: token, pendingEmail: email, pendingPassword: password })
  },

  logout: async () => {
    const { refreshToken } = get()
    if (refreshToken) {
      try { await authApi.logout(refreshToken) } catch { /* ignore */ }
    }
    clearTokens()
    localStorage.removeItem('user')
    set({ user: null, accessToken: null, refreshToken: null, pendingToken: null, pendingEmail: null, pendingPassword: null, isAuthenticated: false })
  },

  loadFromStorage: () => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()
    const userStr = localStorage.getItem('user')
    if (accessToken && refreshToken && userStr) {
      try {
        const user = JSON.parse(userStr) as AuthUser
        set({ user, accessToken, refreshToken, isAuthenticated: true })
      } catch {
        clearTokens()
        localStorage.removeItem('user')
      }
    }
  },
}))
