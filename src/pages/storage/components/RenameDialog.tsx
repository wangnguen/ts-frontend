import { useStorageStore } from '../store'
import { SimpleDialog } from './SimpleDialog'

export function RenameDialog() {
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
          style={{ background: 'var(--cta)' }}
        >
          Lưu
        </button>
      </div>
    </SimpleDialog>
  )
}
