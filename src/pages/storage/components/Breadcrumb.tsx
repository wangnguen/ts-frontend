import { ChevronRight } from 'lucide-react'
import { useStorageStore } from '../store'

export function Breadcrumb() {
  const { currentPath, navigate } = useStorageStore()
  const parts = currentPath ? currentPath.split('/').filter(Boolean) : []

  return (
    <nav className='flex items-center gap-1 text-sm flex-wrap'>
      <button
        onClick={() => navigate('')}
        className='font-bold cursor-pointer hover:underline'
        style={{ color: parts.length === 0 ? 'var(--color-primary)' : 'var(--color-muted)' }}
      >
        Tất cả file
      </button>
      {parts.map((part, i) => {
        const pathTo = parts.slice(0, i + 1).join('/')
        const isLast = i === parts.length - 1
        return (
          <span key={pathTo} className='flex items-center gap-1'>
            <ChevronRight size={14} />
            <button
              onClick={() => !isLast && navigate(pathTo)}
              className={['font-bold', isLast ? '' : 'cursor-pointer hover:underline'].join(' ')}
              style={{
                color: isLast ? 'var(--color-text)' : 'var(--color-muted)',
                cursor: isLast ? 'default' : 'pointer'
              }}
            >
              {part}
            </button>
          </span>
        )
      })}
    </nav>
  )
}
