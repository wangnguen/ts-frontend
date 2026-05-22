import { useStorageStore } from '../store'
import { SimpleDialog } from './SimpleDialog'

export function DeleteFileDialog() {
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
