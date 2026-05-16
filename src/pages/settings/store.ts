import { toast } from 'sonner'
import { create } from 'zustand'
import { authApi, usersApi, ApiError } from '@lib/api'
import type { TwoFactorSetup } from '@lib/api'
import { useAuthStore } from '@stores/authStore'
import type { UpdateProfileInput, ChangePasswordInput } from '@lib/schemas/auth'

interface SettingsState {
  activeTab: 'profile' | 'security'
  setActiveTab: (tab: 'profile' | 'security') => void

  profileLoading: boolean
  profileError: string
  submitProfile: (data: UpdateProfileInput) => Promise<void>

  passwordLoading: boolean
  passwordError: string
  submitPassword: (data: ChangePasswordInput) => Promise<void>

  twoFASetup: TwoFactorSetup | null
  twoFALoading: boolean
  twoFAError: string
  startSetup2FA: () => Promise<void>
  confirmSetup2FA: (code: string) => Promise<void>
  cancelSetup2FA: () => void
  disable2FA: (code: string) => Promise<void>

  deleteLoading: boolean
  deleteError: string
  deleteAccount: () => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set) => ({
  activeTab: 'profile',
  setActiveTab: (tab) => set({ activeTab: tab }),

  profileLoading: false,
  profileError: '',
  submitProfile: async (data) => {
    set({ profileLoading: true, profileError: '' })
    try {
      const updated = await usersApi.updateMe({
        fullName: data.fullName,
        username: data.username || undefined
      })
      useAuthStore.getState().setUser(updated)
      toast.success('Cập nhật hồ sơ thành công!')
    } catch (err) {
      set({ profileError: err instanceof ApiError ? err.message : 'Cập nhật thất bại' })
    } finally {
      set({ profileLoading: false })
    }
  },

  passwordLoading: false,
  passwordError: '',
  submitPassword: async (data) => {
    set({ passwordLoading: true, passwordError: '' })
    try {
      await usersApi.changePassword(data.currentPassword, data.newPassword, data.confirmPassword)
      toast.success('Đổi mật khẩu thành công!')
    } catch (err) {
      set({ passwordError: err instanceof ApiError ? err.message : 'Đổi mật khẩu thất bại' })
    } finally {
      set({ passwordLoading: false })
    }
  },

  twoFASetup: null,
  twoFALoading: false,
  twoFAError: '',
  startSetup2FA: async () => {
    set({ twoFALoading: true, twoFAError: '' })
    try {
      const setup = await authApi.setup2FA()
      set({ twoFASetup: setup })
    } catch (err) {
      set({ twoFAError: err instanceof ApiError ? err.message : 'Không thể khởi tạo 2FA' })
    } finally {
      set({ twoFALoading: false })
    }
  },
  confirmSetup2FA: async (code) => {
    const { twoFASetup } = useSettingsStore.getState()
    if (!twoFASetup) return
    set({ twoFALoading: true, twoFAError: '' })
    try {
      await authApi.confirm2FA(code, twoFASetup.setUpToken)
      const currentUser = useAuthStore.getState().user
      if (currentUser) useAuthStore.getState().setUser({ ...currentUser, isTwoFAEnabled: true })
      set({ twoFASetup: null })
      toast.success('Xác thực 2 yếu tố đã được kích hoạt!')
    } catch (err) {
      set({ twoFAError: err instanceof ApiError ? err.message : 'Mã không hợp lệ' })
    } finally {
      set({ twoFALoading: false })
    }
  },
  cancelSetup2FA: () => set({ twoFASetup: null, twoFAError: '' }),
  disable2FA: async (code) => {
    set({ twoFALoading: true, twoFAError: '' })
    try {
      await authApi.disable2FA(code)
      const currentUser = useAuthStore.getState().user
      if (currentUser) useAuthStore.getState().setUser({ ...currentUser, isTwoFAEnabled: false })
      toast.success('Đã tắt xác thực 2 yếu tố.')
    } catch (err) {
      set({ twoFAError: err instanceof ApiError ? err.message : 'Không thể tắt 2FA' })
    } finally {
      set({ twoFALoading: false })
    }
  },

  deleteLoading: false,
  deleteError: '',
  deleteAccount: async () => {
    set({ deleteLoading: true, deleteError: '' })
    try {
      await usersApi.deleteAccount()
      await useAuthStore.getState().logout()
    } catch (err) {
      set({ deleteError: err instanceof ApiError ? err.message : 'Không thể xóa tài khoản' })
    } finally {
      set({ deleteLoading: false })
    }
  }
}))
