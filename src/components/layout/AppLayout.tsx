import type { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@stores/authStore'

const IconDashboard = () => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect x='3' y='3' width='7' height='7' rx='1' />
    <rect x='14' y='3' width='7' height='7' rx='1' />
    <rect x='14' y='14' width='7' height='7' rx='1' />
    <rect x='3' y='14' width='7' height='7' rx='1' />
  </svg>
)

const IconMonitor = () => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect x='2' y='3' width='20' height='14' rx='2' />
    <line x1='8' y1='21' x2='16' y2='21' />
    <line x1='12' y1='17' x2='12' y2='21' />
  </svg>
)

const IconStorage = () => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' />
  </svg>
)

const IconSettings = () => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='12' cy='12' r='3' />
    <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' />
  </svg>
)

const IconLogout = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
    <polyline points='16 17 21 12 16 7' />
    <line x1='21' y1='12' x2='9' y2='12' />
  </svg>
)

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <IconDashboard /> },
  { to: '/monitors', label: 'Monitors', icon: <IconMonitor /> },
  { to: '/storage', label: 'Storage', icon: <IconStorage /> },
  { to: '/settings', label: 'Cài đặt', icon: <IconSettings /> }
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function Sidebar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside
      className='fixed top-0 left-0 h-screen w-64 flex flex-col z-20'
      style={{
        background: 'var(--color-surface)',
        borderRight: '2px solid var(--color-border)',
        boxShadow: 'var(--clay-shadow-md)'
      }}
    >
      {/* Logo */}
      <div className='px-6 py-5 flex items-center gap-3' style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div
          className='w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0'
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
        >
          U
        </div>
        <span className='font-extrabold text-base tracking-tight' style={{ color: 'var(--color-text)' }}>
          UptimeWatch
        </span>
      </div>

      {/* Nav */}
      <nav className='flex-1 px-3 py-4 space-y-1'>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer',
                isActive
                  ? 'text-white'
                  : 'text-(--color-muted) hover:bg-(--color-primary-light) hover:text-(--color-primary)'
              ].join(' ')
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background: 'linear-gradient(135deg, var(--color-primary), #9333ea)',
                    boxShadow: 'var(--clay-shadow-btn)'
                  }
                : {}
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User card */}
      <div className='px-3 pb-4' style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className='flex items-center gap-3 px-3 pt-4 pb-2'>
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className='w-9 h-9 rounded-full object-cover shrink-0'
              style={{ boxShadow: 'var(--clay-shadow-sm)' }}
            />
          ) : (
            <div
              className='w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0'
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
            >
              {user ? getInitials(user.fullName) : '?'}
            </div>
          )}
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-bold truncate' style={{ color: 'var(--color-text)' }}>
              {user?.fullName ?? ''}
            </p>
            <p className='text-xs truncate' style={{ color: 'var(--color-muted)' }}>
              {user?.email ?? ''}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          aria-label='Đăng xuất'
          className='w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer btn-ghost-danger'
          style={{ color: 'var(--color-down)' }}
        >
          <IconLogout />
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <main className='flex-1 pl-64 min-h-screen' style={{ background: 'inherit' }}>
        <div className='max-w-5xl mx-auto px-8 py-8'>{children}</div>
      </main>
    </div>
  )
}
