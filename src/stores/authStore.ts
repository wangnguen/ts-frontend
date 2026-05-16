import { create } from 'zustand'
import { type AuthUser, type AuthResponse, authApi, usersApi, setAccessToken } from '../lib/api'

interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  pendingToken: string | null
  pendingEmail: string | null
  pendingPassword: string | null
  isAuthenticated: boolean

  setAuth: (data: AuthResponse) => void
  setPending2FA: (token: string, email: string, password: string) => void
  logout: () => Promise<void>
  initAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  pendingToken: null,
  pendingEmail: null,
  pendingPassword: null,
  isAuthenticated: false,

  setAuth: (data: AuthResponse) => {
    setAccessToken(data.accessToken)
    set({
      user: data.user,
      accessToken: data.accessToken,
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
    await authApi.logout().catch(() => {})
    setAccessToken(null)
    set({
      user: null,
      accessToken: null,
      pendingToken: null,
      pendingEmail: null,
      pendingPassword: null,
      isAuthenticated: false,
    })
  },

  
  initAuth: async () => {
    try {
      const { accessToken } = await authApi.refreshToken()
      setAccessToken(accessToken)
      const user = await usersApi.getMe()
      set({ user, accessToken, isAuthenticated: true })
    } catch {
      setAccessToken(null)
      set({ user: null, accessToken: null, isAuthenticated: false })
    }
  },
}))
