import { Pencil, Trash2, Pause, Play, Loader2 } from 'lucide-react'
import { useMonitors } from '../hooks'
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

function formatInterval(seconds: number) {
  if (seconds < 60) return `${seconds}s`
  return `${Math.floor(seconds / 60)} phút`
}

function formatLastChecked(iso: string | null) {
  if (!iso) return 'Chưa kiểm tra'
  const d = new Date(iso)
  const diff = Math.floor((Date.now() - d.getTime()) / 1000)
  if (diff < 60) return `${diff}s trước`
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`
  return d.toLocaleString('vi-VN')
}

export function MonitorCard({ monitor }: { monitor: Monitor }) {
  const { openEditModal, openDeleteDialog, togglePause, isTogglingId } = useMonitors()
  const status = STATUS_CONFIG[monitor.currentStatus]
  const isToggling = isTogglingId === monitor.id

  return (
    <div
      className='rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4'
      style={{
        background: 'var(--color-surface)',
        border: '1.5px solid var(--color-border)',
        boxShadow: 'var(--clay-shadow-sm)',
        opacity: monitor.isActive ? 1 : 0.65
      }}
    >
      <div className='flex items-start gap-3 flex-1 min-w-0'>
        <div className='mt-1 shrink-0'>
          <span
            className='inline-block w-3 h-3 rounded-full'
            style={{
              background: monitor.isActive ? status.color : 'var(--color-border)',
              boxShadow: monitor.isActive ? `0 0 0 4px ${status.color}22` : 'none'
            }}
          />
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 flex-wrap'>
            <span className='font-bold text-sm' style={{ color: 'var(--color-text)' }}>
              {monitor.name}
            </span>
            <span
              className='text-xs font-semibold px-2 py-0.5 rounded-lg'
              style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
            >
              {TYPE_LABELS[monitor.type]}
            </span>
            {!monitor.isActive && (
              <span
                className='text-xs font-semibold px-2 py-0.5 rounded-lg'
                style={{ background: 'rgba(107,114,128,0.1)', color: 'var(--color-muted)' }}
              >
                Tạm dừng
              </span>
            )}
            {monitor.isActive && (
              <span
                className='text-xs font-semibold px-2 py-0.5 rounded-lg'
                style={{ background: status.bg, color: status.color }}
              >
                {status.label}
              </span>
            )}
          </div>
          <p className='text-xs mt-0.5 truncate' style={{ color: 'var(--color-muted)' }}>
            {monitor.target}
          </p>
          <div className='flex items-center gap-3 mt-1 text-xs' style={{ color: 'var(--color-muted)' }}>
            <span>Mỗi {formatInterval(monitor.interval)}</span>
            <span>·</span>
            <span>{formatLastChecked(monitor.lastCheckedAt)}</span>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-2 shrink-0'>
        <button
          onClick={() => togglePause(monitor)}
          disabled={isToggling}
          title={monitor.isActive ? 'Tạm dừng' : 'Bật lại'}
          className='w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer disabled:opacity-50'
          style={{
            background: 'var(--color-bg)',
            border: '1.5px solid var(--color-border)',
            color: 'var(--color-muted)'
          }}
        >
          {isToggling ? (
            <Loader2 size={16} className='animate-spin' />
          ) : monitor.isActive ? (
            <Pause size={15} />
          ) : (
            <Play size={15} />
          )}
        </button>
        <button
          onClick={() => openEditModal(monitor)}
          title='Chỉnh sửa'
          className='w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer'
          style={{
            background: 'var(--color-bg)',
            border: '1.5px solid var(--color-border)',
            color: 'var(--color-muted)'
          }}
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => openDeleteDialog(monitor.id)}
          title='Xoá'
          className='w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer btn-ghost-danger'
          style={{
            background: 'var(--color-bg)',
            border: '1.5px solid var(--color-border)',
            color: 'var(--color-down)'
          }}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}
