import { AuthCard, BackLink, AuthDivider, StatusBar } from '../components'

interface Props {
  email: string
  loading: boolean
  onResend: () => void
}

export function SentStep({ email, loading, onResend }: Props) {
  return (
    <>
      <div className='text-center mb-6'>
        <div className='flex justify-center mb-4'>
          <div
            className='w-16 h-16 rounded-2xl flex items-center justify-center'
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.12))',
              border: '2px solid rgba(124,58,237,0.2)',
              boxShadow: '0 8px 24px rgba(124,58,237,0.15)'
            }}
          >
            <svg
              className='w-8 h-8'
              style={{ color: 'var(--color-primary)' }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
              />
            </svg>
          </div>
        </div>
        <h1 className='text-2xl font-extrabold' style={{ color: 'var(--color-text)' }}>
          Kiểm tra email
        </h1>
        <p className='text-sm mt-2 font-medium' style={{ color: 'var(--color-muted)' }}>
          Đã gửi link đến
        </p>
        <p className='text-sm font-bold mt-0.5' style={{ color: 'var(--color-primary)' }}>
          {email}
        </p>
      </div>

      <AuthCard>
        <div className='space-y-3 mb-5'>
          {['Mở email từ TS Uptime', 'Nhấn link "Đặt lại mật khẩu"', 'Nhập mã OTP 6 chữ số', 'Tạo mật khẩu mới'].map(
            (label, i) => (
              <div key={i} className='flex items-center gap-3'>
                <div
                  className='w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold'
                  style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.12))',
                    border: '1.5px solid rgba(124,58,237,0.25)',
                    color: 'var(--color-primary)'
                  }}
                >
                  {i + 1}
                </div>
                <span className='text-sm font-medium' style={{ color: 'var(--color-text)' }}>
                  {label}
                </span>
              </div>
            )
          )}
        </div>

        <div
          className='flex items-start gap-2.5 p-3.5 rounded-2xl mb-5'
          style={{
            background: 'rgba(245,158,11,0.07)',
            border: '2px solid rgba(245,158,11,0.18)'
          }}
        >
          <svg
            className='w-4 h-4 mt-0.5 shrink-0'
            style={{ color: '#D97706' }}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
            />
          </svg>
          <p className='text-xs leading-relaxed font-medium' style={{ color: '#92400E' }}>
            Link hết hạn sau <strong>15 phút</strong>. Kiểm tra thư mục spam nếu không thấy email.
          </p>
        </div>

        <button
          type='button'
          disabled={loading}
          onClick={onResend}
          className='w-full py-3 px-4 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed'
          style={{
            background: 'transparent',
            border: `2px solid ${loading ? '#E5E7EB' : 'rgba(124,58,237,0.3)'}`,
            color: loading ? 'var(--color-muted)' : 'var(--color-primary)'
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = 'rgba(124,58,237,0.06)'
              e.currentTarget.style.borderColor = 'var(--color-primary)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            if (!loading) e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'
          }}
        >
          {loading ? (
            <span className='flex items-center justify-center gap-2'>
              <svg className='animate-spin w-4 h-4' viewBox='0 0 24 24' fill='none'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8H4z' />
              </svg>
              Đang gửi lại...
            </span>
          ) : (
            'Gửi lại email'
          )}
        </button>

        <AuthDivider />
        <BackLink to='/login'>Quay lại đăng nhập</BackLink>
      </AuthCard>

      <StatusBar />
    </>
  )
}
