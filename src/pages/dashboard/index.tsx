import { useAuthStore } from '@stores/authStore'

const IconMonitor = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect x='2' y='3' width='20' height='14' rx='2' />
    <line x1='8' y1='21' x2='16' y2='21' />
    <line x1='12' y1='17' x2='12' y2='21' />
  </svg>
)

const IconPlus = () => (
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
    <line x1='12' y1='5' x2='12' y2='19' />
    <line x1='5' y1='12' x2='19' y2='12' />
  </svg>
)

interface StatCardProps {
  label: string
  value: string | number
  accent: string
  bg: string
}

function StatCard({ label, value, accent, bg }: StatCardProps) {
  return (
    <div
      className='rounded-2xl px-5 py-4 flex flex-col gap-1'
      style={{
        background: bg,
        border: `1.5px solid ${accent}22`,
        boxShadow: `0 4px 16px ${accent}18`
      }}
    >
      <span className='text-xs font-semibold uppercase tracking-widest' style={{ color: accent }}>
        {label}
      </span>
      <span className='text-3xl font-extrabold' style={{ color: 'var(--color-text)' }}>
        {value}
      </span>
    </div>
  )
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-extrabold' style={{ color: 'var(--color-text)' }}>
            Xin chào, {user?.fullName?.split(' ').at(-1) ?? 'bạn'} 👋
          </h1>
          <p className='text-sm mt-0.5 font-medium' style={{ color: 'var(--color-muted)' }}>
            Theo dõi trạng thái dịch vụ của bạn
          </p>
        </div>
        <button
          className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-150 cursor-pointer'
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), #9333ea)',
            boxShadow: 'var(--clay-shadow-btn)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--clay-shadow-btn-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--clay-shadow-btn)')}
        >
          <IconPlus />
          Thêm monitor
        </button>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        <StatCard label='Tổng' value={0} accent='var(--color-primary)' bg='var(--color-primary-light)' />
        <StatCard label='Hoạt động' value={0} accent='var(--color-up)' bg='rgba(16,185,129,0.08)' />
        <StatCard label='Sự cố' value={0} accent='var(--color-down)' bg='rgba(239,68,68,0.07)' />
        <StatCard label='Cảnh báo' value={0} accent='var(--color-warning)' bg='rgba(245,158,11,0.08)' />
      </div>

      {/* Monitor list */}
      <div
        className='rounded-3xl p-8 flex flex-col items-center justify-center gap-4 min-h-72 text-center'
        style={{
          background: 'var(--color-surface)',
          border: '2px solid var(--color-border)',
          boxShadow: 'var(--clay-shadow-md)'
        }}
      >
        <div
          className='w-16 h-16 rounded-2xl flex items-center justify-center'
          style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
        >
          <IconMonitor />
        </div>
        <div>
          <p className='text-lg font-extrabold' style={{ color: 'var(--color-text)' }}>
            Chưa có monitor nào
          </p>
          <p className='text-sm mt-1 max-w-xs' style={{ color: 'var(--color-muted)' }}>
            Thêm monitor đầu tiên để bắt đầu theo dõi uptime của website, API hoặc dịch vụ của bạn.
          </p>
        </div>
        <button
          className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white mt-2 cursor-pointer transition-all duration-150'
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), #9333ea)',
            boxShadow: 'var(--clay-shadow-btn)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--clay-shadow-btn-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--clay-shadow-btn)')}
        >
          <IconPlus />
          Thêm monitor đầu tiên
        </button>
      </div>
    </div>
  )
}
