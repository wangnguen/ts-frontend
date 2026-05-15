import { http } from '../axios'
import type { AuthUser, UpdateProfileRequest, ChangePasswordRequest } from '../types'

export interface ChangePasswordResponse {
  message: string
}

// GET /users/me
export async function getMe(): Promise<AuthUser> {
  const { data } = await http.get<AuthUser>('/users/me')
  return data
}

// PATCH /users/me
export async function updateMe(payload: UpdateProfileRequest): Promise<AuthUser> {
  const { data } = await http.patch<AuthUser>('/users/me', payload)
  return data
}

// PATCH /users/me/password
export async function changePassword(
  payload: ChangePasswordRequest,
): Promise<ChangePasswordResponse> {
  const { data } = await http.patch<ChangePasswordResponse>('/users/me/password', payload)
  return data
}

// DELETE /users/me
export async function deleteAccount(): Promise<void> {
  await http.delete('/users/me')
}

export const usersService = { getMe, updateMe, changePassword, deleteAccount }
