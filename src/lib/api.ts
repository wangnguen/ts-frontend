export { ApiError, setTokens, clearTokens, getAccessToken, getRefreshToken } from './axios'

export type {
  AuthUser,
  AuthResponse,
  TwoFactorRequired,
  TwoFactorSetup,
  TokenPair,
  RegisterRequest,
  LoginRequest,
  LoginPasswordRequest,
  Login2FARequest,
  LogoutRequest,
  RefreshTokenRequest,
  GoogleOAuthUrlResponse,
  GoogleCallbackRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  Confirm2FARequest,
  Disable2FARequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from './types'

import { authService } from './services/auth.service'
import { usersService } from './services/users.service'

export const authApi = {
  register: authService.register,
  loginPassword: authService.loginPassword,
  login2FA: authService.login2FA,
  logout: (refreshToken: string) => authService.logout({ refreshToken }),
  refreshToken: (refreshToken: string) => authService.refreshToken({ refreshToken }),
  forgotPassword: (email: string) => authService.forgotPassword({ email }),
  resetPassword: (token: string, password: string, confirmPassword: string) =>
    authService.resetPassword({ token, password, confirmPassword }),
  verifyEmail: (token: string) => authService.verifyEmail({ token }),
  googleAuthUrl: authService.getGoogleAuthUrl,
  googleCallback: (code: string, state: string) => authService.googleCallback({ code, state }),
  setup2FA: authService.setup2FA,
  confirm2FA: (code: string, setUpToken: string) => authService.confirm2FA({ code, setUpToken }),
  disable2FA: (code: string) => authService.disable2FA({ code }),
}

export const usersApi = {
  getMe: usersService.getMe,
  updateMe: usersService.updateMe,
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) =>
    usersService.changePassword({ currentPassword, newPassword, confirmPassword }),
  deleteAccount: usersService.deleteAccount,
}

export { authService } from './services/auth.service'
export { usersService } from './services/users.service'
