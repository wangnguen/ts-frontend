import { useEffect, useRef } from 'react'
import { useStorageStore } from './store'
import type { StorageFile, StorageFolder } from '@lib/types'

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconFolder = () => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' />
  </svg>
)
const IconFile = () => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z' />
    <polyline points='13 2 13 9 20 9' />
  </svg>
)
const IconUpload = () => (
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
    <polyline points='16 16 12 12 8 16' />
    <line x1='12' y1='12' x2='12' y2='21' />
    <path d='M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3' />
  </svg>
)
const IconFolderPlus = () => (
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
    <path d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' />
    <line x1='12' y1='11' x2='12' y2='17' />
    <line x1='9' y1='14' x2='15' y2='14' />
  </svg>
)
const IconEdit = () => (
  <svg
    width='14'
    height='14'
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
    width='14'
    height='14'
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
const IconChevronRight = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.5'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='9 18 15 12 9 6' />
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb() {
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
            <IconChevronRight />
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

// ─── Folder Row ───────────────────────────────────────────────────────────────

function FolderRow({ folder }: { folder: StorageFolder }) {
  const { navigate, openDeleteFolder } = useStorageStore()
  return (
    <div
      className='flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-150 group'
      style={{ background: 'var(--color-bg)', border: '1.5px solid var(--color-border)' }}
      onClick={() => navigate(folder.path)}
    >
      <span style={{ color: '#f59e0b' }}>
        <IconFolder />
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
        <IconTrash />
      </button>
    </div>
  )
}

// ─── File Row ─────────────────────────────────────────────────────────────────

function FileRow({ file }: { file: StorageFile }) {
  const { openRename, openDeleteFile } = useStorageStore()
  const ext = getFileExt(file.name)
  const color = extColor(ext)

  return (
    <div
      className='flex items-center gap-3 px-4 py-3 rounded-xl group'
      style={{ background: 'var(--color-bg)', border: '1.5px solid var(--color-border)' }}
    >
      <span style={{ color }}>
        <IconFile />
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
          <IconEdit />
        </button>
        <button
          onClick={() => openDeleteFile(file)}
          className='w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer btn-ghost-danger'
          style={{ color: 'var(--color-down)' }}
          title='Xoá'
        >
          <IconTrash />
        </button>
      </div>
    </div>
  )
}

// ─── Simple Dialog ────────────────────────────────────────────────────────────

function SimpleDialog({
  open,
  onClose,
  title,
  children
}: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
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
            <IconX />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ─── Dialogs ──────────────────────────────────────────────────────────────────

function CreateFolderDialog() {
  const { showCreateFolderDialog, newFolderName, closeCreateFolder, setNewFolderName, confirmCreateFolder } =
    useStorageStore()
  return (
    <SimpleDialog open={showCreateFolderDialog} onClose={closeCreateFolder} title='Tạo thư mục mới'>
      <input
        autoFocus
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && confirmCreateFolder()}
        placeholder='Tên thư mục'
        className='w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none'
        style={{ background: 'var(--color-bg)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }}
      />
      <div className='flex gap-3'>
        <button
          onClick={closeCreateFolder}
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
          onClick={confirmCreateFolder}
          className='flex-1 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer btn-primary'
          style={{ background: 'linear-gradient(135deg, var(--color-primary), #9333ea)' }}
        >
          Tạo
        </button>
      </div>
    </SimpleDialog>
  )
}

function RenameDialog() {
  const { showRenameDialog, renamingFile, newFileName, closeRename, setNewFileName, confirmRename } = useStorageStore()
  return (
    <SimpleDialog open={showRenameDialog} onClose={closeRename} title={`Đổi tên: ${renamingFile?.name ?? ''}`}>
      <input
        autoFocus
        value={newFileName}
        onChange={(e) => setNewFileName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && confirmRename()}
        placeholder='Tên mới'
        className='w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none'
        style={{ background: 'var(--color-bg)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }}
      />
      <div className='flex gap-3'>
        <button
          onClick={closeRename}
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
          onClick={confirmRename}
          className='flex-1 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer btn-primary'
          style={{ background: 'linear-gradient(135deg, var(--color-primary), #9333ea)' }}
        >
          Lưu
        </button>
      </div>
    </SimpleDialog>
  )
}

function DeleteFileDialog() {
  const { showDeleteFileDialog, deletingFile, closeDeleteFile, confirmDeleteFile } = useStorageStore()
  return (
    <SimpleDialog open={showDeleteFileDialog} onClose={closeDeleteFile} title='Xoá file?'>
      <p className='text-sm' style={{ color: 'var(--color-muted)' }}>
        File <strong style={{ color: 'var(--color-text)' }}>{deletingFile?.name}</strong> sẽ bị xoá vĩnh viễn.
      </p>
      <div className='flex gap-3'>
        <button
          onClick={closeDeleteFile}
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
          onClick={confirmDeleteFile}
          className='flex-1 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer'
          style={{ background: 'var(--color-down)' }}
        >
          Xoá
        </button>
      </div>
    </SimpleDialog>
  )
}

function DeleteFolderDialog() {
  const { showDeleteFolderDialog, deletingFolder, closeDeleteFolder, confirmDeleteFolder } = useStorageStore()
  return (
    <SimpleDialog open={showDeleteFolderDialog} onClose={closeDeleteFolder} title='Xoá thư mục?'>
      <p className='text-sm' style={{ color: 'var(--color-muted)' }}>
        Thư mục <strong style={{ color: 'var(--color-text)' }}>{deletingFolder?.name}</strong> và toàn bộ nội dung bên
        trong sẽ bị xoá.
      </p>
      <div className='flex gap-3'>
        <button
          onClick={closeDeleteFolder}
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
          onClick={confirmDeleteFolder}
          className='flex-1 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer'
          style={{ background: 'var(--color-down)' }}
        >
          Xoá
        </button>
      </div>
    </SimpleDialog>
  )
}

// ─── Drop Zone ────────────────────────────────────────────────────────────────

function UploadZone() {
  const { uploadFiles, isUploading } = useStorageStore()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length) uploadFiles(files)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length) uploadFiles(files)
    e.target.value = ''
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className='rounded-2xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-all duration-150'
      style={{ border: '2px dashed var(--color-border)', background: 'var(--color-bg)' }}
    >
      <input ref={inputRef} type='file' multiple className='hidden' onChange={handleChange} />
      {isUploading ? (
        <>
          <IconSpinner />
          <p className='text-sm font-semibold' style={{ color: 'var(--color-muted)' }}>
            Đang tải lên...
          </p>
        </>
      ) : (
        <>
          <span style={{ color: 'var(--color-primary)' }}>
            <IconUpload />
          </span>
          <p className='text-sm font-semibold' style={{ color: 'var(--color-muted)' }}>
            Kéo thả hoặc <span style={{ color: 'var(--color-primary)' }}>chọn file</span> để tải lên
          </p>
        </>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function StoragePage() {
  const { files, folders, isLoading, reload, openCreateFolder } = useStorageStore()

  useEffect(() => {
    reload()
  }, [reload])

  const isEmpty = files.length === 0 && folders.length === 0

  return (
    <>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-extrabold' style={{ color: 'var(--color-text)' }}>
              Storage
            </h1>
            <p className='text-sm mt-0.5 font-medium' style={{ color: 'var(--color-muted)' }}>
              Quản lý file và thư mục của bạn
            </p>
          </div>
          <button
            onClick={openCreateFolder}
            className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200'
            style={{
              background: 'var(--color-surface)',
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-text)',
              boxShadow: 'var(--clay-shadow-sm)'
            }}
          >
            <IconFolderPlus />
            Tạo thư mục
          </button>
        </div>

        {/* Breadcrumb */}
        <div
          className='px-4 py-2.5 rounded-xl'
          style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)' }}
        >
          <Breadcrumb />
        </div>

        {/* Upload zone */}
        <UploadZone />

        {/* Content */}
        {isLoading ? (
          <div className='flex items-center justify-center py-16'>
            <IconSpinner />
            <span className='ml-2 text-sm font-medium' style={{ color: 'var(--color-muted)' }}>
              Đang tải...
            </span>
          </div>
        ) : isEmpty ? (
          <div
            className='rounded-3xl p-10 flex flex-col items-center gap-4 text-center'
            style={{
              background: 'var(--color-surface)',
              border: '2px solid var(--color-border)',
              boxShadow: 'var(--clay-shadow-md)'
            }}
          >
            <div
              className='w-14 h-14 rounded-2xl flex items-center justify-center'
              style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
            >
              <IconFolder />
            </div>
            <div>
              <p className='text-base font-extrabold' style={{ color: 'var(--color-text)' }}>
                Thư mục trống
              </p>
              <p className='text-sm mt-1' style={{ color: 'var(--color-muted)' }}>
                Tải lên file hoặc tạo thư mục mới để bắt đầu.
              </p>
            </div>
          </div>
        ) : (
          <div
            className='rounded-3xl p-5 flex flex-col gap-3'
            style={{
              background: 'var(--color-surface)',
              border: '2px solid var(--color-border)',
              boxShadow: 'var(--clay-shadow-md)'
            }}
          >
            {/* Folders */}
            {folders.length > 0 && (
              <div className='flex flex-col gap-2'>
                <p className='text-xs font-bold uppercase tracking-widest px-1' style={{ color: 'var(--color-muted)' }}>
                  Thư mục ({folders.length})
                </p>
                {folders.map((f) => (
                  <FolderRow key={f.path} folder={f} />
                ))}
              </div>
            )}

            {/* Divider */}
            {folders.length > 0 && files.length > 0 && (
              <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />
            )}

            {/* Files */}
            {files.length > 0 && (
              <div className='flex flex-col gap-2'>
                <p className='text-xs font-bold uppercase tracking-widest px-1' style={{ color: 'var(--color-muted)' }}>
                  File ({files.length})
                </p>
                {files.map((f) => (
                  <FileRow key={f.path ?? f.name} file={f} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <CreateFolderDialog />
      <RenameDialog />
      <DeleteFileDialog />
      <DeleteFolderDialog />
    </>
  )
}
