// ─────────────────────────────────────────────────────────────────────────────
// Shared domain types derived from OpenAPI spec at GET /docs/json
// ─────────────────────────────────────────────────────────────────────────────

// ── Common ───────────────────────────────────────────────────────────────────

export interface ApiErrorBody {
  statusCode: number
  message: string
  path?: string
  timestamp?: string
}

// ── Auth schemas ──────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string
  username: string | null
  email: string
  fullName: string
  role: 'user' | 'admin'
  googleId: string | null
  avatarUrl: string | null
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse extends TokenPair {
  user: AuthUser
}

export interface TwoFactorRequired {
  requiresTwoFactor: true
  pendingToken: string
}

export interface TwoFactorSetup {
  otpauthUrl: string
  setUpToken: string
}

// ── Auth — POST /auth/register ────────────────────────────────────────────────

export interface RegisterRequest {
  username: string       // 3–30 chars
  email: string          // email format
  password: string       // min 8, pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])
  confirmPassword: string
  fullName: string       // 1–255 chars
}

// Response: 201 AuthResponse | 409 conflict | 422 validation | 429 rate-limit

// ── Auth — POST /auth/login (oneOf) ──────────────────────────────────────────

export interface LoginPasswordRequest {
  step: 'password'
  email: string
  password: string       // min 8
}

export interface Login2FARequest {
  step: '2fa'
  pendingToken: string
  code: string           // exactly 6 digits
}

export type LoginRequest = LoginPasswordRequest | Login2FARequest

// Response 200: AuthResponse | TwoFactorRequired

// ── Auth — POST /auth/logout ──────────────────────────────────────────────────

export interface LogoutRequest {
  refreshToken: string
}

// Response 200: void

// ── Auth — POST /auth/refresh-token ──────────────────────────────────────────

export interface RefreshTokenRequest {
  refreshToken: string
}

// Response 200: TokenPair

// Response 200: TokenPair

// ── Auth — Google OAuth ───────────────────────────────────────────────────────

export interface GoogleOAuthUrlResponse {
  url: string
}

export interface GoogleCallbackRequest {
  code: string   // 10–512 chars
  state: string  // min 1
}

// Response 200: AuthResponse

// ── Auth — Email (forgot / reset / verify) ───────────────────────────────────

export interface ForgotPasswordRequest {
  email: string
}

// Response 200: void | 409 google-user | 422 validation | 429 rate

export interface ResetPasswordRequest {
  token: string           // exactly 6 chars (OTP code)
  password: string        // same pattern as register
  confirmPassword: string
}

// Response 200: void | 401 invalid/expired token | 422 | 429

export interface VerifyEmailRequest {
  token: string           // min 6 chars
}

// Response 200: void | 401 invalid/expired token | 422 | 429

// ── Auth — 2FA ────────────────────────────────────────────────────────────────

// GET /auth/2fa/setup → TwoFactorSetup
// Requires: bearerAuth

export interface Confirm2FARequest {
  code: string        // exactly 6 digits
  setUpToken: string
}

// Response 200: void | 400 bad code | 401 | 409 already enabled | 422

export interface Disable2FARequest {
  code: string        // exactly 6 digits
}

// Response 200: void | 400 bad code | 401 | 422

// ── Users ─────────────────────────────────────────────────────────────────────

// GET  /users/me → AuthUser
// DELETE /users/me → 204 void

export interface UpdateProfileRequest {
  username?: string         // 3–30 chars
  fullName?: string         // 1–255 chars
  avatarUrl?: string | null // URI or null
}

// Response 200: AuthUser | 400 no fields | 401 | 409 username taken

export interface ChangePasswordRequest {
  currentPassword: string   // same pattern
  newPassword: string       // same pattern
  confirmPassword: string
}

// Response 200: void | 400 mismatch | 401 wrong current password
