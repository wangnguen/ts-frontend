import { File, Pencil, Trash2 } from 'lucide-react'
import { useStorage } from '../hooks'
import type { StorageFile } from '@lib/types'

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

function getFileExt(name: string) {
  return name.split('.').pop()?.toLowerCase() ?? ''
}

function extColor(ext: string) {
  const map: Record<string, string> = {
    jpg: '#f59e0b',
    jpeg: '#f59e0b',
    png: '#10b981',
    gif: '#8b5cf6',
    svg: '#6366f1',
    pdf: '#ef4444',
    doc: '#3b82f6',
    docx: '#3b82f6',
    xls: '#10b981',
    xlsx: '#10b981',
    txt: '#6b7280',
    zip: '#f97316',
    rar: '#f97316',
    mp4: '#8b5cf6',
    mp3: '#ec4899'
  }
  return map[ext] ?? 'var(--color-muted)'
}

export function FileRow({ file }: { file: StorageFile }) {
  const { openRename, openDeleteFile } = useStorage()
  const ext = getFileExt(file.name)
  const color = extColor(ext)

  return (
    <div
      className='flex items-center gap-3 px-4 py-3 rounded-xl group'
      style={{ background: 'var(--color-bg)', border: '1.5px solid var(--color-border)' }}
    >
      <span style={{ color }}>
        <File size={18} />
      </span>
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-semibold truncate' style={{ color: 'var(--color-text)' }}>
          {file.name}
        </p>
        <p className='text-xs' style={{ color: 'var(--color-muted)' }}>
          {file.size ? formatFileSize(file.size) : ''}
          {file.mimeType ? ` · ${file.mimeType}` : ''}
        </p>
      </div>
      {file.url && (
        <a
          href={file.url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-150'
          style={{ color: 'var(--color-primary)' }}
          onClick={(e) => e.stopPropagation()}
        >
          Xem
        </a>
      )}
      <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-150'>
        <button
          onClick={() => openRename(file)}
          className='w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer'
          style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
          title='Đổi tên'
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => openDeleteFile(file)}
          className='w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer btn-ghost-danger'
          style={{ color: 'var(--color-down)' }}
          title='Xoá'
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
