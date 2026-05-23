import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Loader2 } from 'lucide-react'
import { useMonitors } from '../hooks'

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

export function MonitorModal() {
  const { showModal, editingMonitor, closeModal, submitMonitor, isSaving } = useMonitors()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<MonitorFormValues>({ resolver: zodResolver(monitorSchema) })

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
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-extrabold' style={{ color: 'var(--color-text)' }}>
            {editingMonitor ? 'Chỉnh sửa monitor' : 'Thêm monitor mới'}
          </h2>
          <button
            onClick={closeModal}
            className='w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer'
            style={{ background: 'var(--color-bg)', color: 'var(--color-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
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
              style={{ background: 'var(--cta)', boxShadow: 'var(--clay-shadow-btn)' }}
            >
              {isSaving && <Loader2 size={16} className='animate-spin' />}
              {editingMonitor ? 'Lưu thay đổi' : 'Tạo monitor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
