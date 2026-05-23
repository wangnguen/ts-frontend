import { Plus, Monitor as MonitorIcon, Loader2 } from 'lucide-react'
import { useMonitors } from './hooks'
import { StatCard } from './components/StatCard'
import { MonitorCard } from './components/MonitorCard'
import { MonitorModal } from './components/MonitorModal'
import { DeleteDialog } from './components/DeleteDialog'

export default function MonitorsPage() {
  const { monitors, total, isLoading, openCreateModal } = useMonitors()

  const up = monitors.filter((m) => m.isActive && m.currentStatus === 'up').length
  const down = monitors.filter((m) => m.isActive && m.currentStatus === 'down').length
  const pending = monitors.filter((m) => m.isActive && m.currentStatus === 'pending').length

  return (
    <>
      <div className='space-y-8'>
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
            style={{ background: 'var(--cta)', boxShadow: 'var(--clay-shadow-btn)' }}
          >
            <Plus size={16} />
            Thêm monitor
          </button>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          <StatCard label='Tổng' value={total} accent='var(--color-primary)' bg='var(--color-primary-light)' />
          <StatCard label='Hoạt động' value={up} accent='var(--color-up)' bg='rgba(16,185,129,0.08)' />
          <StatCard label='Sự cố' value={down} accent='var(--color-down)' bg='rgba(239,68,68,0.07)' />
          <StatCard label='Chờ' value={pending} accent='var(--color-warning)' bg='rgba(245,158,11,0.08)' />
        </div>

        {isLoading ? (
          <div className='flex items-center justify-center py-24'>
            <Loader2 size={16} className='animate-spin' />
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
              <MonitorIcon size={20} />
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
              style={{ background: 'var(--cta)', boxShadow: 'var(--clay-shadow-btn)' }}
            >
              <Plus size={16} />
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
