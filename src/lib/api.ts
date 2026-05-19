export { ApiError, setAccessToken, getAccessToken } from './axios'

export type {
  AuthUser,
  AuthResponse,
  RefreshResponse,
  TwoFactorRequired,
  TwoFactorSetup,
  RegisterRequest,
  LoginRequest,
  LoginPasswordRequest,
  Login2FARequest,
  GoogleOAuthUrlResponse,
  GoogleCallbackRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  Confirm2FARequest,
  Disable2FARequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  Monitor,
  MonitorType,
  MonitorStatus,
  CreateMonitorRequest,
  UpdateMonitorRequest,
  PaginatedMonitors,
  StorageFile,
  StorageFolder
} from './types'

import { authService } from './services/auth.service'
import { usersService } from './services/users.service'
import { monitorsService } from './services/monitors.service'
import { storageService } from './services/storage.service'

export const authApi = {
  register: authService.register,
  loginPassword: authService.loginPassword,
  login2FA: authService.login2FA,
  verifyGoogle2FA: authService.verifyGoogle2FA,
  logout: authService.logout,
  refreshToken: authService.refreshToken,
  forgotPassword: (email: string) => authService.forgotPassword({ email }),
  resetPassword: (token: string, password: string, confirmPassword: string) =>
    authService.resetPassword({ token, password, confirmPassword }),
  verifyEmail: (token: string) => authService.verifyEmail({ token }),
  googleAuthUrl: authService.getGoogleAuthUrl,
  googleCallback: (code: string, state: string) => authService.googleCallback({ code, state }),
  setup2FA: authService.setup2FA,
  confirm2FA: (code: string, setUpToken: string) => authService.confirm2FA({ code, setUpToken }),
  disable2FA: (code: string) => authService.disable2FA({ code })
}

export const usersApi = {
  getMe: usersService.getMe,
  updateMe: usersService.updateMe,
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) =>
    usersService.changePassword({ currentPassword, newPassword, confirmPassword }),
  deleteAccount: usersService.deleteAccount
}

export const monitorsApi = {
  getMonitors: monitorsService.getMonitors,
  getMonitor: monitorsService.getMonitor,
  createMonitor: monitorsService.createMonitor,
  updateMonitor: monitorsService.updateMonitor,
  deleteMonitor: monitorsService.deleteMonitor,
  pauseMonitor: monitorsService.pauseMonitor,
  startMonitor: monitorsService.startMonitor
}

export const storageApi = {
  uploadFiles: storageService.uploadFiles,
  renameFile: storageService.renameFile,
  deleteFile: storageService.deleteFile,
  createFolder: storageService.createFolder,
  listFolders: storageService.listFolders,
  listFiles: storageService.listFiles,
  deleteFolder: storageService.deleteFolder
}

export { authService } from './services/auth.service'
export { usersService } from './services/users.service'
export { monitorsService } from './services/monitors.service'
export { storageService } from './services/storage.service'
