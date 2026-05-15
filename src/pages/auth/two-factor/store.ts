import { create } from 'zustand'
import { authApi, ApiError } from '@lib/api'
import { useAuthStore } from '@stores/authStore'

interface TwoFactorState {
  loading: boolean
  error: string

  submit: (otp: string, navigate: (path: string) => void) => Promise<void>
  reset: () => void
}

export const useTwoFactorStore = create<TwoFactorState>((set) => ({
  loading: false,
  error: '',

  submit: async (otp, navigate) => {
    const { pendingToken, pendingEmail, pendingPassword } = useAuthStore.getState()
    if (!pendingToken || !pendingEmail || !pendingPassword) {
      set({ error: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại' })
      return
    }
    set({ error: '', loading: true })
    try {
      const res = await authApi.login2FA({ email: pendingEmail, password: pendingPassword, pendingToken, code: otp })
      useAuthStore.getState().setAuth(res)
      navigate('/dashboard')
    } catch (err) {
      set({ error: err instanceof ApiError ? err.message : 'Mã xác thực không hợp lệ' })
    } finally {
      set({ loading: false })
    }
  },

  reset: () => set({ loading: false, error: '' }),
}))
