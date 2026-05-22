import { useRef } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import { useStorageStore } from '../store'

export function UploadZone() {
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
          <Loader2 size={16} className='animate-spin' />
          <p className='text-sm font-semibold' style={{ color: 'var(--color-muted)' }}>
            Đang tải lên...
          </p>
        </>
      ) : (
        <>
          <span style={{ color: 'var(--color-primary)' }}>
            <Upload size={16} />
          </span>
          <p className='text-sm font-semibold' style={{ color: 'var(--color-muted)' }}>
            Kéo thả hoặc <span style={{ color: 'var(--color-primary)' }}>chọn file</span> để tải lên
          </p>
        </>
      )}
    </div>
  )
}
