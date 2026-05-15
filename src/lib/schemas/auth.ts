import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
})

export const registerSchema = z
  .object({
    fullName: z.string().min(1, 'Vui lòng nhập họ tên'),
    username: z.string().min(3, 'Tên đăng nhập tối thiểu 3 ký tự').max(30, 'Tối đa 30 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
})

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'Mã OTP phải đủ 6 số')
    .regex(/^\d{6}$/, 'Mã OTP chỉ gồm chữ số'),
})

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type OtpInput = z.infer<typeof otpSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
