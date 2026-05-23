import { useNavigate } from 'react-router-dom'
import { Plus, Monitor as MonitorIcon, ArrowRight, Loader2 } from 'lucide-react'
import { useAuthStore } from '@stores/authStore'
import { useMonitors } from '@pages/monitors/hooks'
import type { Monitor, MonitorType } from '@lib/types'

const STATUS_CONFIG = {
  up: { label: 'Hoạt động', color: 'var(--color-up)', bg: 'rgba(16,185,129,0.12)' },
  down: { label: 'Sự cố', color: 'var(--color-down)', bg: 'rgba(239,68,68,0.10)' },
  pending: { label: 'Chờ', color: 'var(--color-warning)', bg: 'rgba(245,158,11,0.10)' }
} as const

const TYPE_LABELS: Record<MonitorType, string> = {
  http: 'HTTP',
  https: 'HTTPS',
  tcp: 'TCP',
  ping: 'Ping'
}

function StatCard({ label, value, accent, bg }: { label: string; value: number; accent: string; bg: string }) {
  return (
    <div
      className='rounded-2xl px-5 py-4 flex flex-col gap-1'
      style={{ background: bg, border: `1.5px solid ${accent}22`, boxShadow: `0 4px 16px ${accent}18` }}
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

function MonitorRow({ monitor }: { monitor: Monitor }) {
  const status = STATUS_CONFIG[monitor.currentStatus]
  return (
    <div
      className='flex items-center gap-3 px-4 py-3 rounded-xl'
      style={{
        background: 'var(--color-bg)',
        border: '1.5px solid var(--color-border)',
        opacity: monitor.isActive ? 1 : 0.6
      }}
    >
      <span
        className='w-2.5 h-2.5 rounded-full shrink-0'
        style={{ background: monitor.isActive ? status.color : 'var(--color-border)' }}
      />
      <span className='flex-1 text-sm font-semibold truncate' style={{ color: 'var(--color-text)' }}>
        {monitor.name}
      </span>
      <span
        className='text-xs font-medium px-2 py-0.5 rounded-lg shrink-0'
        style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
      >
        {TYPE_LABELS[monitor.type]}
      </span>
      <span
        className='text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0'
        style={{
          background: monitor.isActive ? status.bg : 'rgba(107,114,128,0.1)',
          color: monitor.isActive ? status.color : 'var(--color-muted)'
        }}
      >
        {monitor.isActive ? status.label : 'Tạm dừng'}
      </span>
    </div>
  )
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()
  const { monitors, total, isLoading, openCreateModal } = useMonitors()

  const up = monitors.filter((m) => m.isActive && m.currentStatus === 'up').length
  const down = monitors.filter((m) => m.isActive && m.currentStatus === 'down').length
  const pending = monitors.filter((m) => m.isActive && m.currentStatus === 'pending').length
  const preview = monitors.slice(0, 5)

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-extrabold' style={{ color: 'var(--color-text)' }}>
            Xin chào, {user?.fullName?.split(' ').slice(-1)[0] ?? 'bạn'} 👋
          </h1>
          <p className='text-sm mt-0.5 font-medium' style={{ color: 'var(--color-muted)' }}>
            Theo dõi trạng thái dịch vụ của bạn
          </p>
        </div>
        <button
          onClick={() => {
            openCreateModal()
            navigate('/monitors')
          }}
          className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 cursor-pointer btn-primary'
          style={{
            background: 'var(--cta)',
            boxShadow: 'var(--clay-shadow-btn)'
          }}
        >
          <Plus size={16} />
          Thêm monitor
        </button>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        <StatCard label='Tổng' value={total} accent='var(--color-primary)' bg='var(--color-primary-light)' />
        <StatCard label='Hoạt động' value={up} accent='var(--color-up)' bg='rgba(16,185,129,0.08)' />
        <StatCard label='Sự cố' value={down} accent='var(--color-down)' bg='rgba(239,68,68,0.07)' />
        <StatCard label='Cảnh báo' value={pending} accent='var(--color-warning)' bg='rgba(245,158,11,0.08)' />
      </div>

      {/* Monitor preview */}
      <div
        className='rounded-3xl p-6 flex flex-col gap-4'
        style={{
          background: 'var(--color-surface)',
          border: '2px solid var(--color-border)',
          boxShadow: 'var(--clay-shadow-md)'
        }}
      >
        <div className='flex items-center justify-between'>
          <h2 className='text-base font-extrabold' style={{ color: 'var(--color-text)' }}>
            Monitors gần đây
          </h2>
          {total > 0 && (
            <button
              onClick={() => navigate('/monitors')}
              className='flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all duration-150'
              style={{ color: 'var(--color-primary)' }}
            >
              Xem tất cả <ArrowRight size={14} />
            </button>
          )}
        </div>

        {isLoading ? (
          <div className='py-10 flex items-center justify-center'>
            <Loader2 size={20} className='animate-spin' style={{ color: 'var(--color-muted)' }} />
          </div>
        ) : monitors.length === 0 ? (
          <div className='flex flex-col items-center gap-3 py-10 text-center'>
            <div
              className='w-12 h-12 rounded-2xl flex items-center justify-center'
              style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
            >
              <MonitorIcon size={20} />
            </div>
            <div>
              <p className='text-sm font-extrabold' style={{ color: 'var(--color-text)' }}>
                Chưa có monitor nào
              </p>
              <p className='text-xs mt-0.5 max-w-xs' style={{ color: 'var(--color-muted)' }}>
                Thêm monitor đầu tiên để bắt đầu theo dõi uptime.
              </p>
            </div>
            <button
              onClick={() => {
                openCreateModal()
                navigate('/monitors')
              }}
              className='flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white cursor-pointer btn-primary'
              style={{
                background: 'var(--cta)',
                boxShadow: 'var(--clay-shadow-btn)'
              }}
            >
              <Plus size={16} />
              Thêm monitor đầu tiên
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            {preview.map((m) => (
              <MonitorRow key={m.id} monitor={m} />
            ))}
            {total > 5 && (
              <button
                onClick={() => navigate('/monitors')}
                className='text-xs font-bold py-2 rounded-xl cursor-pointer transition-all duration-150'
                style={{
                  background: 'var(--color-bg)',
                  border: '1.5px solid var(--color-border)',
                  color: 'var(--color-muted)'
                }}
              >
                + {total - 5} monitor khác
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
