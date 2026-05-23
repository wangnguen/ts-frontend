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
  email?: string
  password?: string
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

// ─── Monitors ────────────────────────────────────────────────────────────────

export type MonitorType = 'http' | 'https' | 'tcp' | 'ping'
export type MonitorStatus = 'up' | 'down' | 'pending'

export interface Monitor {
  id: string
  name: string
  type: MonitorType
  target: string
  interval: number
  timeout: number
  retries: number
  isActive: boolean
  currentStatus: MonitorStatus
  lastCheckedAt: string | null
  acceptedStatusCodes: number[]
  keyword: string | null
  userId: string
}

export interface CreateMonitorRequest {
  name: string
  type?: MonitorType
  target: string
  interval?: number
  timeout?: number
  retries?: number
  isActive?: boolean
  acceptedStatusCodes?: number[]
  keyword?: string
}

export type UpdateMonitorRequest = Partial<CreateMonitorRequest>

export interface PaginatedMonitors {
  items: Monitor[]
  total: number
  page: number
  limit: number
}

// ─── Storage ─────────────────────────────────────────────────────────────────

export interface StorageFile {
  name: string
  path?: string
  size: number
  mimeType?: string
  createdAt: string
  url: string
}

export interface StorageFolder {
  name: string
  path: string
}

export interface UploadFilesResponse {
  files: StorageFile[]
}

export interface StorageListResponse {
  files: StorageFile[]
}

export interface FolderListResponse {
  folders: StorageFolder[]
}
