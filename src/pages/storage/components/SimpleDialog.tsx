import { X } from 'lucide-react'

interface SimpleDialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function SimpleDialog({ open, onClose, title, children }: SimpleDialogProps) {
  if (!open) return null
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className='w-full max-w-sm rounded-3xl p-6 flex flex-col gap-4'
        style={{
          background: 'var(--color-surface)',
          border: '2px solid var(--color-border)',
          boxShadow: 'var(--clay-shadow-lg)'
        }}
      >
        <div className='flex items-center justify-between'>
          <h2 className='text-base font-extrabold' style={{ color: 'var(--color-text)' }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className='w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer'
            style={{ color: 'var(--color-muted)' }}
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
