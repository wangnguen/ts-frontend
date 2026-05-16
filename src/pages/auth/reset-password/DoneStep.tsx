import { Link } from 'react-router-dom'
import { AuthCard } from '../components'

export function DoneStep() {
  return (
    <>
      <div className='text-center mb-6'>
        <div className='flex justify-center mb-4'>
          <div
            className='w-16 h-16 rounded-2xl flex items-center justify-center'
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(52,211,153,0.12))',
              border: '2px solid rgba(16,185,129,0.3)',
              boxShadow: '0 8px 24px rgba(16,185,129,0.2)'
            }}
          >
            <svg
              className='w-8 h-8'
              style={{ color: 'var(--color-up)' }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M5 13l4 4L19 7' />
            </svg>
          </div>
        </div>
        <h1 className='text-2xl font-extrabold' style={{ color: 'var(--color-text)' }}>
          Mật khẩu đã được đặt lại!
        </h1>
        <p className='text-sm mt-2 font-medium' style={{ color: 'var(--color-muted)' }}>
          Bạn có thể đăng nhập bằng mật khẩu mới ngay bây giờ
        </p>
      </div>

      <AuthCard>
        <Link
          to='/login'
          className='block w-full py-3 px-4 rounded-2xl text-sm font-bold text-center transition-all duration-200 cursor-pointer'
          style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
            color: '#FFFFFF',
            boxShadow: 'var(--clay-shadow-btn)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #6D28D9 0%, #9333EA 100%)'
            e.currentTarget.style.boxShadow = 'var(--clay-shadow-btn-hover)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)'
            e.currentTarget.style.boxShadow = 'var(--clay-shadow-btn)'
            e.currentTarget.style.transform = 'translateY(0px)'
          }}
        >
          Đăng nhập ngay
        </Link>
      </AuthCard>
    </>
  )
}
