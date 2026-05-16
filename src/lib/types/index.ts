export interface ApiErrorBody {
  statusCode: number
  message: string
  path?: string
  timestamp?: string
}

export interface AuthUser {
  id: string
  username: string | null
  email: string
  fullName: string
  role: 'user' | 'admin'
  googleId: string | null
  avatarUrl: string | null
  isTwoFactorEnabled: boolean
}

export interface AuthResponse {
  accessToken: string
  user: AuthUser
}

export interface RefreshResponse {
  accessToken: string
}

export interface TwoFactorRequired {
  requiresTwoFactor: true
  pendingToken: string
}

export interface TwoFactorSetup {
  otpauthUrl: string
  setUpToken: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
  fullName: string
}

export interface LoginPasswordRequest {
  email: string
  password: string
}

export interface Login2FARequest {
  email: string
  password: string
  pendingToken: string
  code: string
}

export type LoginRequest = LoginPasswordRequest | Login2FARequest

export interface GoogleOAuthUrlResponse {
  url: string
}

export interface GoogleCallbackRequest {
  code: string
  state: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface VerifyEmailRequest {
  token: string
}

export interface Confirm2FARequest {
  code: string
  setUpToken: string
}

export interface Disable2FARequest {
  code: string
}

export interface UpdateProfileRequest {
  username?: string
  fullName?: string
  avatarUrl?: string | null
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
