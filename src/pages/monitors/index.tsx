import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMonitorsStore } from './store'
import type { Monitor, MonitorType } from '@lib/types'

// ─── Icons ────────────────────────────────────────────────────────────────────

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
const IconEdit = () => (
  <svg
    width='15'
    height='15'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
    <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
  </svg>
)
const IconTrash = () => (
  <svg
    width='15'
    height='15'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='3 6 5 6 21 6' />
    <path d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6' />
    <path d='M10 11v6' />
    <path d='M14 11v6' />
    <path d='M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2' />
  </svg>
)
const IconPause = () => (
  <svg
    width='15'
    height='15'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect x='6' y='4' width='4' height='16' />
    <rect x='14' y='4' width='4' height='16' />
  </svg>
)
const IconPlay = () => (
  <svg
    width='15'
    height='15'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polygon points='5 3 19 12 5 21 5 3' />
  </svg>
)
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
const IconX = () => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.5'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='18' y1='6' x2='6' y2='18' />
    <line x1='6' y1='6' x2='18' y2='18' />
  </svg>
)
const IconSpinner = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.5'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='animate-spin'
  >
    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
  </svg>
)

// ─── Status helpers ───────────────────────────────────────────────────────────

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
  const m = Math.floor(seconds / 60)
  return `${m} phút`
}

function formatLastChecked(iso: string | null) {
  if (!iso) return 'Chưa kiểm tra'
  const d = new Date(iso)
  const diff = Math.floor((Date.now() - d.getTime()) / 1000)
  if (diff < 60) return `${diff}s trước`
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`
  return d.toLocaleString('vi-VN')
}

// ─── Zod schema ───────────────────────────────────────────────────────────────

const monitorSchema = z.object({
  name: z.string().min(1, 'Tên không được trống'),
  type: z.enum(['http', 'https', 'tcp', 'ping']),
  target: z.string().min(1, 'Target không được trống'),
  interval: z.number().int().min(10),
  timeout: z.number().int().min(1),
  retries: z.number().int().min(0).max(10),
  acceptedStatusCodes: z.string(),
  keyword: z.string().optional()
})

type MonitorFormValues = z.infer<typeof monitorSchema>

// ─── Stat Card ────────────────────────────────────────────────────────────────

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

// ─── Monitor Card ─────────────────────────────────────────────────────────────

function MonitorCard({ monitor }: { monitor: Monitor }) {
  const { openEditModal, openDeleteDialog, togglePause, isTogglingId } = useMonitorsStore()
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
      {/* Status dot + info */}
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

      {/* Actions */}
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
          {isToggling ? <IconSpinner /> : monitor.isActive ? <IconPause /> : <IconPlay />}
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
          <IconEdit />
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
          <IconTrash />
        </button>
      </div>
    </div>
  )
}

// ─── Monitor Modal ────────────────────────────────────────────────────────────

function MonitorModal() {
  const { showModal, editingMonitor, closeModal, submitMonitor, isSaving } = useMonitorsStore()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<MonitorFormValues>({
    resolver: zodResolver(monitorSchema)
  })

  const selectedType = watch('type')

  useEffect(() => {
    if (showModal) {
      if (editingMonitor) {
        reset({
          name: editingMonitor.name,
          type: editingMonitor.type,
          target: editingMonitor.target,
          interval: editingMonitor.interval,
          timeout: editingMonitor.timeout,
          retries: editingMonitor.retries,
          acceptedStatusCodes: (editingMonitor.acceptedStatusCodes ?? [200]).join(','),
          keyword: editingMonitor.keyword ?? ''
        })
      } else {
        reset({
          name: '',
          type: 'https',
          target: '',
          interval: 60,
          timeout: 30,
          retries: 3,
          acceptedStatusCodes: '200,201,204',
          keyword: ''
        })
      }
    }
  }, [showModal, editingMonitor, reset])

  if (!showModal) return null

  const onSubmit = (values: MonitorFormValues) => {
    const codes = values.acceptedStatusCodes
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n))

    submitMonitor({
      name: values.name,
      type: values.type,
      target: values.target,
      interval: values.interval,
      timeout: values.timeout,
      retries: values.retries,
      acceptedStatusCodes: codes,
      keyword: values.keyword || undefined
    })
  }

  const isHttp = selectedType === 'http' || selectedType === 'https'

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className='w-full max-w-lg rounded-3xl p-6 flex flex-col gap-5'
        style={{
          background: 'var(--color-surface)',
          border: '2px solid var(--color-border)',
          boxShadow: 'var(--clay-shadow-lg)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-extrabold' style={{ color: 'var(--color-text)' }}>
            {editingMonitor ? 'Chỉnh sửa monitor' : 'Thêm monitor mới'}
          </h2>
          <button
            onClick={closeModal}
            className='w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer'
            style={{ background: 'var(--color-bg)', color: 'var(--color-muted)' }}
          >
            <IconX />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          {/* Name */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-bold uppercase tracking-wider' style={{ color: 'var(--color-muted)' }}>
              Tên monitor *
            </label>
            <input
              {...register('name')}
              placeholder='Ví dụ: API Production'
              className='w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all duration-150'
              style={{
                background: 'var(--color-bg)',
                border: `1.5px solid ${errors.name ? 'var(--color-down)' : 'var(--color-border)'}`,
                color: 'var(--color-text)'
              }}
            />
            {errors.name && (
              <span className='text-xs' style={{ color: 'var(--color-down)' }}>
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Type */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-bold uppercase tracking-wider' style={{ color: 'var(--color-muted)' }}>
              Loại *
            </label>
            <select
              {...register('type')}
              className='w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none cursor-pointer'
              style={{
                background: 'var(--color-bg)',
                border: '1.5px solid var(--color-border)',
                color: 'var(--color-text)'
              }}
            >
              <option value='http'>HTTP</option>
              <option value='https'>HTTPS</option>
              <option value='tcp'>TCP</option>
              <option value='ping'>Ping</option>
            </select>
          </div>

          {/* Target */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-bold uppercase tracking-wider' style={{ color: 'var(--color-muted)' }}>
              {isHttp ? 'URL *' : 'Host / IP *'}
            </label>
            <input
              {...register('target')}
              placeholder={isHttp ? 'https://example.com/api/health' : '192.168.1.1'}
              className='w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all duration-150'
              style={{
                background: 'var(--color-bg)',
                border: `1.5px solid ${errors.target ? 'var(--color-down)' : 'var(--color-border)'}`,
                color: 'var(--color-text)'
              }}
            />
            {errors.target && (
              <span className='text-xs' style={{ color: 'var(--color-down)' }}>
                {errors.target.message}
              </span>
            )}
          </div>

          {/* Interval / Timeout / Retries */}
          <div className='grid grid-cols-3 gap-3'>
            {(
              [
                { label: 'Khoảng cách (s)', field: 'interval' as const, placeholder: '60' },
                { label: 'Timeout (s)', field: 'timeout' as const, placeholder: '30' },
                { label: 'Số lần thử lại', field: 'retries' as const, placeholder: '3' }
              ] as const
            ).map(({ label, field, placeholder }) => (
              <div key={field} className='flex flex-col gap-1.5'>
                <label className='text-xs font-bold uppercase tracking-wider' style={{ color: 'var(--color-muted)' }}>
                  {label}
                </label>
                <input
                  {...register(field, { valueAsNumber: true })}
                  type='number'
                  placeholder={placeholder}
                  className='w-full px-3 py-2.5 rounded-xl text-sm font-medium outline-none'
                  style={{
                    background: 'var(--color-bg)',
                    border: '1.5px solid var(--color-border)',
                    color: 'var(--color-text)'
                  }}
                />
              </div>
            ))}
          </div>

          {/* HTTP-only fields */}
          {isHttp && (
            <>
              <div className='flex flex-col gap-1.5'>
                <label className='text-xs font-bold uppercase tracking-wider' style={{ color: 'var(--color-muted)' }}>
                  Mã trạng thái chấp nhận (phân cách bằng dấu phẩy)
                </label>
                <input
                  {...register('acceptedStatusCodes')}
                  placeholder='200,201,204'
                  className='w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none'
                  style={{
                    background: 'var(--color-bg)',
                    border: '1.5px solid var(--color-border)',
                    color: 'var(--color-text)'
                  }}
                />
              </div>
              <div className='flex flex-col gap-1.5'>
                <label className='text-xs font-bold uppercase tracking-wider' style={{ color: 'var(--color-muted)' }}>
                  Keyword (tuỳ chọn — phải có trong response body)
                </label>
                <input
                  {...register('keyword')}
                  placeholder='ok'
                  className='w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none'
                  style={{
                    background: 'var(--color-bg)',
                    border: '1.5px solid var(--color-border)',
                    color: 'var(--color-text)'
                  }}
                />
              </div>
            </>
          )}

          {/* Actions */}
          <div className='flex gap-3 pt-1'>
            <button
              type='button'
              onClick={closeModal}
              className='flex-1 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all duration-150'
              style={{
                background: 'var(--color-bg)',
                border: '1.5px solid var(--color-border)',
                color: 'var(--color-muted)'
              }}
            >
              Huỷ
            </button>
            <button
              type='submit'
              disabled={isSaving}
              className='flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer disabled:opacity-60 btn-primary'
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), #9333ea)',
                boxShadow: 'var(--clay-shadow-btn)'
              }}
            >
              {isSaving && <IconSpinner />}
              {editingMonitor ? 'Lưu thay đổi' : 'Tạo monitor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Delete Dialog ────────────────────────────────────────────────────────────

function DeleteDialog() {
  const { showDeleteDialog, closeDeleteDialog, confirmDelete, isDeleting, monitors, deletingMonitorId } =
    useMonitorsStore()
  if (!showDeleteDialog) return null
  const monitor = monitors.find((m) => m.id === deletingMonitorId)

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className='w-full max-w-sm rounded-3xl p-6 flex flex-col gap-5'
        style={{
          background: 'var(--color-surface)',
          border: '2px solid var(--color-border)',
          boxShadow: 'var(--clay-shadow-lg)'
        }}
      >
        <div className='flex flex-col gap-2 text-center'>
          <div
            className='w-12 h-12 rounded-2xl mx-auto flex items-center justify-center'
            style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--color-down)' }}
          >
            <IconTrash />
          </div>
          <h2 className='text-lg font-extrabold' style={{ color: 'var(--color-text)' }}>
            Xoá monitor?
          </h2>
          <p className='text-sm' style={{ color: 'var(--color-muted)' }}>
            Monitor <strong style={{ color: 'var(--color-text)' }}>{monitor?.name}</strong> sẽ bị xoá vĩnh viễn.
          </p>
        </div>
        <div className='flex gap-3'>
          <button
            onClick={closeDeleteDialog}
            className='flex-1 py-2.5 rounded-xl text-sm font-bold cursor-pointer'
            style={{
              background: 'var(--color-bg)',
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-muted)'
            }}
          >
            Huỷ
          </button>
          <button
            onClick={confirmDelete}
            disabled={isDeleting}
            className='flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer disabled:opacity-60 btn-ghost-danger'
            style={{ background: 'var(--color-down)', boxShadow: '0 4px 14px rgba(239,68,68,0.4)' }}
          >
            {isDeleting && <IconSpinner />}
            Xoá
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MonitorsPage() {
  const { monitors, total, isLoading, fetchMonitors, openCreateModal } = useMonitorsStore()

  useEffect(() => {
    fetchMonitors()
  }, [fetchMonitors])

  const up = monitors.filter((m) => m.isActive && m.currentStatus === 'up').length
  const down = monitors.filter((m) => m.isActive && m.currentStatus === 'down').length
  const pending = monitors.filter((m) => m.isActive && m.currentStatus === 'pending').length

  return (
    <>
      <div className='space-y-8'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-extrabold' style={{ color: 'var(--color-text)' }}>
              Monitors
            </h1>
            <p className='text-sm mt-0.5 font-medium' style={{ color: 'var(--color-muted)' }}>
              Theo dõi uptime website, API và dịch vụ của bạn
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer transition-all duration-200 btn-primary'
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), #9333ea)',
              boxShadow: 'var(--clay-shadow-btn)'
            }}
          >
            <IconPlus />
            Thêm monitor
          </button>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          <StatCard label='Tổng' value={total} accent='var(--color-primary)' bg='var(--color-primary-light)' />
          <StatCard label='Hoạt động' value={up} accent='var(--color-up)' bg='rgba(16,185,129,0.08)' />
          <StatCard label='Sự cố' value={down} accent='var(--color-down)' bg='rgba(239,68,68,0.07)' />
          <StatCard label='Chờ' value={pending} accent='var(--color-warning)' bg='rgba(245,158,11,0.08)' />
        </div>

        {/* List */}
        {isLoading ? (
          <div className='flex items-center justify-center py-24'>
            <IconSpinner />
            <span className='ml-2 text-sm font-medium' style={{ color: 'var(--color-muted)' }}>
              Đang tải...
            </span>
          </div>
        ) : monitors.length === 0 ? (
          <div
            className='rounded-3xl p-8 flex flex-col items-center justify-center gap-4 min-h-64 text-center'
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
                Thêm monitor đầu tiên để bắt đầu theo dõi uptime của website, API hoặc dịch vụ.
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white mt-2 cursor-pointer btn-primary'
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), #9333ea)',
                boxShadow: 'var(--clay-shadow-btn)'
              }}
            >
              <IconPlus />
              Thêm monitor đầu tiên
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-3'>
            {monitors.map((m) => (
              <MonitorCard key={m.id} monitor={m} />
            ))}
          </div>
        )}
      </div>

      <MonitorModal />
      <DeleteDialog />
    </>
  )
}
