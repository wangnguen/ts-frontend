import { FolderPlus, Folder, Loader2 } from 'lucide-react'
import { useStorage } from './hooks'
import { Breadcrumb } from './components/Breadcrumb'
import { FolderRow } from './components/FolderRow'
import { FileRow } from './components/FileRow'
import { UploadZone } from './components/UploadZone'
import { CreateFolderDialog } from './components/CreateFolderDialog'
import { RenameDialog } from './components/RenameDialog'
import { DeleteFileDialog } from './components/DeleteFileDialog'
import { DeleteFolderDialog } from './components/DeleteFolderDialog'

export default function StoragePage() {
  const { files, folders, isLoading, openCreateFolder } = useStorage()

  const isEmpty = files.length === 0 && folders.length === 0

  return (
    <>
      <div className='space-y-6'>
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
            <FolderPlus size={16} />
            Tạo thư mục
          </button>
        </div>

        <div
          className='px-4 py-2.5 rounded-xl'
          style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)' }}
        >
          <Breadcrumb />
        </div>

        <UploadZone />

        {isLoading ? (
          <div className='flex items-center justify-center py-16'>
            <Loader2 size={16} className='animate-spin' />
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
              <Folder size={18} />
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

            {folders.length > 0 && files.length > 0 && (
              <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />
            )}

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
