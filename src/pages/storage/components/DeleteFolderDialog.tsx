import { useStorageStore } from '../store'
import { SimpleDialog } from './SimpleDialog'

export function DeleteFolderDialog() {
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
