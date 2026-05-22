export function StatCard({ label, value, accent, bg }: { label: string; value: number; accent: string; bg: string }) {
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
