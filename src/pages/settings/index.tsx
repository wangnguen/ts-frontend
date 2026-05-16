import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@stores/authStore'
import { useSettingsStore } from './store'
import {
  updateProfileSchema,
  changePasswordSchema,
  otpSchema,
  type UpdateProfileInput,
  type ChangePasswordInput,
  type OtpInput
} from '@lib/schemas/auth'
import { FieldInput, ErrorBanner } from '../auth/components'

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className='rounded-3xl p-6 space-y-5'
      style={{
        background: 'var(--color-surface)',
        border: '2px solid var(--color-border)',
        boxShadow: 'var(--clay-shadow-md)'
      }}
    >
      <h2 className='text-base font-bold' style={{ color: 'var(--color-text)' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function SuccessBanner({ message }: { message: string }) {
  if (!message) return null
  return (
    <div
      className='px-4 py-3 rounded-xl text-sm font-semibold'
      style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--color-up)', border: '1px solid rgba(16,185,129,0.2)' }}
    >
      {message}
    </div>
  )
}

function SaveButton({ loading, text = 'Lưu thay đổi' }: { loading: boolean; text?: string }) {
  return (
    <button
      type='submit'
      disabled={loading}
      className='px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
      style={{
        background: 'linear-gradient(135deg, var(--color-primary), #9333ea)',
        boxShadow: 'var(--clay-shadow-btn)'
      }}
    >
      {loading ? 'Đang lưu...' : text}
    </button>
  )
}

function ProfileTab() {
  const user = useAuthStore((s) => s.user)
  const { profileLoading, profileError, profileSuccess, submitProfile } = useSettingsStore()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { fullName: user?.fullName ?? '', username: user?.username ?? '' }
  })

  return (
    <SectionCard title='Thông tin cá nhân'>
      <form onSubmit={handleSubmit(submitProfile)} className='space-y-4'>
        <ErrorBanner message={profileError} />
        <SuccessBanner message={profileSuccess} />
        <FieldInput
          id='fullName'
          label='Họ và tên'
          type='text'
          placeholder='Nguyễn Văn A'
          error={errors.fullName}
          registration={register('fullName')}
        />
        <FieldInput
          id='username'
          label='Tên đăng nhập'
          type='text'
          placeholder='nguyen_van_a'
          error={errors.username}
          registration={register('username')}
        />
        <div>
          <label className='block text-xs font-semibold mb-1.5' style={{ color: 'var(--color-text-2)' }}>
            Email
          </label>
          <div
            className='w-full px-4 py-3 rounded-xl text-sm font-medium select-none'
            style={{
              background: 'var(--color-surface-2)',
              border: '1.5px solid var(--color-border-2)',
              color: 'var(--color-muted)'
            }}
          >
            {user?.email}
          </div>
          <p className='text-xs mt-1' style={{ color: 'var(--color-muted)' }}>
            Email không thể thay đổi
          </p>
        </div>
        <div className='pt-1'>
          <SaveButton loading={profileLoading} />
        </div>
      </form>
    </SectionCard>
  )
}

function ChangePasswordSection() {
  const { passwordLoading, passwordError, passwordSuccess, submitPassword } = useSettingsStore()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ChangePasswordInput>({ resolver: zodResolver(changePasswordSchema) })

  const onSubmit = async (data: ChangePasswordInput) => {
    await submitPassword(data)
    reset()
  }

  return (
    <SectionCard title='Đổi mật khẩu'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <ErrorBanner message={passwordError} />
        <SuccessBanner message={passwordSuccess} />
        <FieldInput
          id='currentPassword'
          label='Mật khẩu hiện tại'
          type='password'
          placeholder='••••••••'
          error={errors.currentPassword}
          registration={register('currentPassword')}
        />
        <FieldInput
          id='newPassword'
          label='Mật khẩu mới'
          type='password'
          placeholder='••••••••'
          error={errors.newPassword}
          registration={register('newPassword')}
        />
        <FieldInput
          id='confirmPassword'
          label='Xác nhận mật khẩu mới'
          type='password'
          placeholder='••••••••'
          error={errors.confirmPassword}
          registration={register('confirmPassword')}
        />
        <div className='pt-1'>
          <SaveButton loading={passwordLoading} text='Đổi mật khẩu' />
        </div>
      </form>
    </SectionCard>
  )
}

function extractTotpSecret(otpauthUrl: string): string {
  try {
    const params = new URLSearchParams(otpauthUrl.split('?')[1])
    return params.get('secret') ?? otpauthUrl
  } catch {
    return otpauthUrl
  }
}

function TwoFASection() {
  const {
    twoFASetup,
    twoFALoading,
    twoFAError,
    twoFASuccess,
    startSetup2FA,
    confirmSetup2FA,
    cancelSetup2FA,
    disable2FA
  } = useSettingsStore()

  const {
    register: regOtp,
    handleSubmit: handleOtp,
    reset: resetOtp,
    formState: { errors: otpErrors }
  } = useForm<OtpInput>({ resolver: zodResolver(otpSchema) })

  const {
    register: regDisable,
    handleSubmit: handleDisable,
    reset: resetDisable,
    formState: { errors: disableErrors }
  } = useForm<OtpInput>({ resolver: zodResolver(otpSchema) })

  const onConfirm = async ({ otp }: OtpInput) => {
    await confirmSetup2FA(otp)
    resetOtp()
  }

  const onDisable = async ({ otp }: OtpInput) => {
    await disable2FA(otp)
    resetDisable()
  }

  return (
    <SectionCard title='Xác thực 2 yếu tố (2FA)'>
      <p className='text-sm' style={{ color: 'var(--color-muted)' }}>
        Tăng cường bảo mật bằng cách yêu cầu mã xác thực khi đăng nhập.
      </p>

      <ErrorBanner message={twoFAError} />
      <SuccessBanner message={twoFASuccess} />

      {!twoFASetup ? (
        <div className='flex flex-col sm:flex-row gap-3'>
          <button
            onClick={startSetup2FA}
            disabled={twoFALoading}
            className='px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-150 cursor-pointer disabled:opacity-60'
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), #9333ea)',
              boxShadow: 'var(--clay-shadow-btn)'
            }}
          >
            {twoFALoading ? 'Đang tải...' : 'Thiết lập 2FA'}
          </button>
        </div>
      ) : (
        <div className='space-y-4'>
          <div
            className='rounded-2xl p-4 space-y-3'
            style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}
          >
            <p className='text-sm font-semibold' style={{ color: 'var(--color-text)' }}>
              Mở app xác thực (Google Authenticator, Authy...) và nhập thủ công mã bí mật sau:
            </p>
            <div
              className='px-4 py-3 rounded-xl font-mono text-sm break-all select-all'
              style={{
                background: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                border: '1.5px solid rgba(124,58,237,0.2)'
              }}
            >
              {extractTotpSecret(twoFASetup.otpauthUrl)}
            </div>
            <p className='text-xs' style={{ color: 'var(--color-muted)' }}>
              Bấm vào mã để chọn tất cả, sau đó copy và nhập vào ứng dụng xác thực.
            </p>
          </div>

          <form onSubmit={handleOtp(onConfirm)} className='space-y-3'>
            <FieldInput
              id='otp-confirm'
              label='Nhập mã 6 số từ app xác thực'
              type='text'
              placeholder='123456'
              error={otpErrors.otp}
              registration={regOtp('otp')}
            />
            <div className='flex gap-3'>
              <SaveButton loading={twoFALoading} text='Xác nhận & kích hoạt' />
              <button
                type='button'
                onClick={cancelSetup2FA}
                className='px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer'
                style={{ color: 'var(--color-muted)', border: '1.5px solid var(--color-border-2)' }}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Disable 2FA */}
      {!twoFASetup && (
        <div className='pt-2 border-t' style={{ borderColor: 'var(--color-border-2)' }}>
          <p className='text-xs font-semibold mb-3' style={{ color: 'var(--color-muted)' }}>
            Nếu 2FA đang bật, nhập mã để tắt:
          </p>
          <form onSubmit={handleDisable(onDisable)} className='flex flex-col sm:flex-row gap-3 items-start'>
            <div className='flex-1'>
              <FieldInput
                id='otp-disable'
                label=''
                type='text'
                placeholder='Mã 6 số'
                error={disableErrors.otp}
                registration={regDisable('otp')}
              />
            </div>
            <button
              type='submit'
              disabled={twoFALoading}
              className='px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer disabled:opacity-60 mt-0.5 shrink-0'
              style={{
                color: 'var(--color-down)',
                border: '1.5px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.06)'
              }}
            >
              {twoFALoading ? 'Đang xử lý...' : 'Tắt 2FA'}
            </button>
          </form>
        </div>
      )}
    </SectionCard>
  )
}

function DangerZone() {
  const navigate = useNavigate()
  const { deleteLoading, deleteError, deleteAccount } = useSettingsStore()
  const [confirm, setConfirm] = useState(false)

  const handleDelete = async () => {
    await deleteAccount()
    navigate('/login', { replace: true })
  }

  return (
    <div
      className='rounded-3xl p-6 space-y-4'
      style={{
        background: 'rgba(239,68,68,0.04)',
        border: '2px solid rgba(239,68,68,0.2)',
        boxShadow: '0 4px 16px rgba(239,68,68,0.08)'
      }}
    >
      <h2 className='text-base font-bold' style={{ color: 'var(--color-down)' }}>
        Vùng nguy hiểm
      </h2>
      <p className='text-sm' style={{ color: 'var(--color-muted)' }}>
        Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu. Hành động này không thể hoàn tác.
      </p>
      <ErrorBanner message={deleteError} />
      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className='px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer'
          style={{
            color: 'var(--color-down)',
            border: '1.5px solid rgba(239,68,68,0.35)',
            background: 'rgba(239,68,68,0.07)'
          }}
        >
          Xóa tài khoản
        </button>
      ) : (
        <div className='flex flex-col sm:flex-row gap-3 items-start sm:items-center'>
          <p className='text-sm font-semibold' style={{ color: 'var(--color-down)' }}>
            Bạn chắc chắn muốn xóa?
          </p>
          <div className='flex gap-2'>
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className='px-4 py-2 rounded-xl text-sm font-bold text-white cursor-pointer disabled:opacity-60'
              style={{ background: 'var(--color-down)', boxShadow: '0 4px 12px rgba(239,68,68,0.4)' }}
            >
              {deleteLoading ? 'Đang xóa...' : 'Xác nhận xóa'}
            </button>
            <button
              onClick={() => setConfirm(false)}
              className='px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer'
              style={{ color: 'var(--color-muted)', border: '1.5px solid var(--color-border-2)' }}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SettingsPage() {
  const { activeTab, setActiveTab } = useSettingsStore()

  useEffect(() => {
    return () => {
      useSettingsStore.setState({
        profileError: '',
        profileSuccess: '',
        passwordError: '',
        passwordSuccess: '',
        twoFAError: '',
        twoFASuccess: '',
        twoFASetup: null,
        deleteError: ''
      })
    }
  }, [])

  const tabs = [
    { key: 'profile' as const, label: 'Hồ sơ' },
    { key: 'security' as const, label: 'Bảo mật' }
  ]

  return (
    <div className='space-y-6 max-w-2xl'>
      <div>
        <h1 className='text-2xl font-extrabold' style={{ color: 'var(--color-text)' }}>
          Cài đặt
        </h1>
        <p className='text-sm mt-0.5 font-medium' style={{ color: 'var(--color-muted)' }}>
          Quản lý tài khoản và bảo mật của bạn
        </p>
      </div>

      {/* Tab bar */}
      <div
        className='flex gap-1 p-1 rounded-2xl w-fit'
        style={{
          background: 'var(--color-surface)',
          border: '2px solid var(--color-border)',
          boxShadow: 'var(--clay-shadow-sm)'
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className='px-5 py-2 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer'
            style={
              activeTab === tab.key
                ? {
                    background: 'linear-gradient(135deg, var(--color-primary), #9333ea)',
                    color: '#fff',
                    boxShadow: 'var(--clay-shadow-btn)'
                  }
                : { color: 'var(--color-muted)' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'profile' && <ProfileTab />}
      {activeTab === 'security' && (
        <div className='space-y-5'>
          <ChangePasswordSection />
          <TwoFASection />
        </div>
      )}

      <DangerZone />
    </div>
  )
}
