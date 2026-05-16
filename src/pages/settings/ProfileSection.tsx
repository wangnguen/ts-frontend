import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@stores/authStore'
import { useSettingsStore } from './store'
import { updateProfileSchema, type UpdateProfileInput } from '@lib/schemas/auth'
import { FieldInput, ErrorBanner } from '../auth/components'
import { SectionCard, SaveButton } from './components'

export function ProfileSection() {
  const user = useAuthStore((s) => s.user)
  const { profileLoading, profileError, submitProfile } = useSettingsStore()

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
