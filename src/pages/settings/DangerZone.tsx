import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from './store'
import { ErrorBanner } from '../auth/components'

export function DangerZone() {
  const navigate = useNavigate()
  const { deleteLoading, deleteError, deleteAccount } = useSettingsStore()
  const [confirm, setConfirm] = useState(false)

  const handleDelete = async () => {
    await deleteAccount()
    navigate('/login', { replace: true })
  }

  return (
    <div
      className='rounded-3xl p-6 space-y-4'
      style={{
        background: 'rgba(239,68,68,0.04)',
        border: '2px solid rgba(239,68,68,0.2)',
        boxShadow: '0 4px 16px rgba(239,68,68,0.08)'
      }}
    >
      <h2 className='text-base font-bold' style={{ color: 'var(--color-down)' }}>
        Vùng nguy hiểm
      </h2>
      <p className='text-sm' style={{ color: 'var(--color-muted)' }}>
        Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu. Hành động này không thể hoàn tác.
      </p>
      <ErrorBanner message={deleteError} />
      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className='px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer'
          style={{
            color: 'var(--color-down)',
            border: '1.5px solid rgba(239,68,68,0.35)',
            background: 'rgba(239,68,68,0.07)'
          }}
        >
          Xóa tài khoản
        </button>
      ) : (
        <div className='flex flex-col sm:flex-row gap-3 items-start sm:items-center'>
          <p className='text-sm font-semibold' style={{ color: 'var(--color-down)' }}>
            Bạn chắc chắn muốn xóa?
          </p>
          <div className='flex gap-2'>
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className='px-4 py-2 rounded-xl text-sm font-bold text-white cursor-pointer disabled:opacity-60'
              style={{ background: 'var(--color-down)', boxShadow: '0 4px 12px rgba(239,68,68,0.4)' }}
            >
              {deleteLoading ? 'Đang xóa...' : 'Xác nhận xóa'}
            </button>
            <button
              onClick={() => setConfirm(false)}
              className='px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer'
              style={{ color: 'var(--color-muted)', border: '1.5px solid var(--color-border-2)' }}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
