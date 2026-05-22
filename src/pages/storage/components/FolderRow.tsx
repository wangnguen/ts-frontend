import { Folder, Trash2 } from 'lucide-react'
import { useStorageStore } from '../store'
import type { StorageFolder } from '@lib/types'

export function FolderRow({ folder }: { folder: StorageFolder }) {
  const { navigate, openDeleteFolder } = useStorageStore()
  return (
    <div
      className='flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-150 group'
      style={{ background: 'var(--color-bg)', border: '1.5px solid var(--color-border)' }}
      onClick={() => navigate(folder.path)}
    >
      <span style={{ color: '#f59e0b' }}>
        <Folder size={18} />
      </span>
      <span className='flex-1 text-sm font-semibold truncate' style={{ color: 'var(--color-text)' }}>
        {folder.name}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation()
          openDeleteFolder(folder)
        }}
        className='opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer btn-ghost-danger'
        style={{ color: 'var(--color-down)' }}
        title='Xoá thư mục'
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
