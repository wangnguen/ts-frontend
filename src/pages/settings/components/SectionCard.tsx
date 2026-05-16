export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className='rounded-3xl p-6 space-y-5'
      style={{
        background: 'var(--color-surface)',
        border: '2px solid var(--color-border)',
        boxShadow: 'var(--clay-shadow-md)'
      }}
    >
      <h2 className='text-base font-bold' style={{ color: 'var(--color-text)' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

export function SaveButton({ loading, text = 'Lưu thay đổi' }: { loading: boolean; text?: string }) {
  return (
    <button
      type='submit'
      disabled={loading}
      className='px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
      style={{
        background: 'linear-gradient(135deg, var(--color-primary), #9333ea)',
        boxShadow: 'var(--clay-shadow-btn)'
      }}
    >
      {loading ? 'Đang lưu...' : text}
    </button>
  )
}
