import { Link } from 'react-router-dom'
import { useAuthStore } from '@stores/authStore'

export default function NotFoundPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <div className='min-h-screen flex items-center justify-center px-4 relative overflow-hidden'>
      {/* Background blobs */}
      <div
        className='clay-blob blob-float w-80 h-80 -top-20 -left-20'
        style={{ background: 'rgba(167,139,250,0.3)' }}
      />
      <div
        className='clay-blob blob-float-delay w-64 h-64 top-1/3 -right-16'
        style={{ background: 'rgba(249,115,22,0.2)' }}
      />
      <div
        className='clay-blob blob-float-slow w-72 h-72 -bottom-24 left-1/4'
        style={{ background: 'rgba(236,72,153,0.18)' }}
      />

      <div className='relative z-10 text-center space-y-6 max-w-md'>
        {/* 404 number */}
        <div className='relative inline-block'>
          <span
            className='text-[8rem] font-extrabold leading-none select-none'
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 8px 24px rgba(124,58,237,0.25))'
            }}
          >
            404
          </span>
        </div>

        <div className='clay-card px-8 py-8 space-y-4'>
          <div
            className='w-14 h-14 rounded-2xl flex items-center justify-center mx-auto'
            style={{ background: 'var(--color-primary-light)' }}
          >
            <svg
              width='26'
              height='26'
              viewBox='0 0 24 24'
              fill='none'
              stroke='var(--color-primary)'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='8' />
              <line x1='21' y1='21' x2='16.65' y2='16.65' />
              <line x1='11' y1='8' x2='11' y2='11' />
              <line x1='11' y1='14' x2='11.01' y2='14' />
            </svg>
          </div>

          <div>
            <h1 className='text-xl font-extrabold' style={{ color: 'var(--color-text)' }}>
              Trang không tồn tại
            </h1>
            <p className='text-sm mt-2 font-medium' style={{ color: 'var(--color-muted)' }}>
              Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            </p>
          </div>

          <Link
            to={isAuthenticated ? '/dashboard' : '/login'}
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-150'
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), #9333ea)',
              boxShadow: 'var(--clay-shadow-btn)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--clay-shadow-btn-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--clay-shadow-btn)')}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='15 18 9 12 15 6' />
            </svg>
            {isAuthenticated ? 'Về Dashboard' : 'Về trang đăng nhập'}
          </Link>
        </div>
      </div>
    </div>
  )
}
