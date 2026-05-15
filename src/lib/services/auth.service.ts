import { http } from '../axios'
import type {
  AuthUser,
  AuthResponse,
  TwoFactorRequired,
  TwoFactorSetup,
  TokenPair,
  RegisterRequest,
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
} from '../types'

export interface RegisterResponse {
  user: AuthUser
}

export interface GoogleOAuthUrlData extends GoogleOAuthUrlResponse {
  state: string
}

// ── Core auth ─────────────────────────────────────────────────────────────────

// POST /auth/register
export async function register(payload: RegisterRequest): Promise<RegisterResponse> {
  const { data } = await http.post<RegisterResponse>('/auth/register', payload, { skipAuth: true })
  return data
}

// POST /auth/login — step: "password"
export async function loginPassword(
  payload: LoginPasswordRequest,
): Promise<AuthResponse | TwoFactorRequired> {
  const { data } = await http.post<AuthResponse | TwoFactorRequired>('/auth/login', payload, {
    skipAuth: true,
  })
  return data
}

// POST /auth/login — step: "2fa"
export async function login2FA(payload: Login2FARequest): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>('/auth/login', payload, { skipAuth: true })
  return data
}

// POST /auth/logout  (refresh token as Bearer)
export async function logout(payload: LogoutRequest): Promise<void> {
  await http.post('/auth/logout', payload, {
    headers: { Authorization: `Bearer ${payload.refreshToken}` },
    skipAuth: true,
  })
}

// POST /auth/refresh-token  (refresh token as Bearer)
export async function refreshToken(payload: RefreshTokenRequest): Promise<TokenPair> {
  const { data } = await http.post<TokenPair>('/auth/refresh-token', payload, {
    headers: { Authorization: `Bearer ${payload.refreshToken}` },
    skipAuth: true,
  })
  return data
}

// ── Google OAuth ──────────────────────────────────────────────────────────────

// GET /auth/google
export async function getGoogleAuthUrl(): Promise<GoogleOAuthUrlData> {
  const { data } = await http.get<GoogleOAuthUrlData>('/auth/google', { skipAuth: true })
  return data
}

// POST /auth/google/callback  (mobile / SPA)
export async function googleCallback(payload: GoogleCallbackRequest): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>('/auth/google/callback', payload, {
    skipAuth: true,
  })
  return data
}

// ── Email (forgot / reset / verify) ──────────────────────────────────────────

// POST /auth/forgot-password
export async function forgotPassword(payload: ForgotPasswordRequest): Promise<void> {
  await http.post('/auth/forgot-password', payload, { skipAuth: true })
}

// POST /auth/reset-password
export async function resetPassword(payload: ResetPasswordRequest): Promise<void> {
  await http.post('/auth/reset-password', payload, { skipAuth: true })
}

// POST /auth/verify-email
export async function verifyEmail(payload: VerifyEmailRequest): Promise<void> {
  await http.post('/auth/verify-email', payload, { skipAuth: true })
}

// ── 2FA ───────────────────────────────────────────────────────────────────────

// GET /auth/2fa/setup
export async function setup2FA(): Promise<TwoFactorSetup> {
  const { data } = await http.get<TwoFactorSetup>('/auth/2fa/setup')
  return data
}

// POST /auth/2fa/setup/confirm
export async function confirm2FA(payload: Confirm2FARequest): Promise<void> {
  await http.post('/auth/2fa/setup/confirm', payload)
}

// DELETE /auth/2fa
export async function disable2FA(payload: Disable2FARequest): Promise<void> {
  await http.delete('/auth/2fa', { data: payload })
}

// ── Namespace export (optional convenience) ───────────────────────────────────

export const authService = {
  register,
  loginPassword,
  login2FA,
  logout,
  refreshToken,
  getGoogleAuthUrl,
  googleCallback,
  forgotPassword,
  resetPassword,
  verifyEmail,
  setup2FA,
  confirm2FA,
  disable2FA,
}
