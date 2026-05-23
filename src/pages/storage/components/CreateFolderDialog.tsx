import { useStorage } from '../hooks'
import { SimpleDialog } from './SimpleDialog'

export function CreateFolderDialog() {
  const { showCreateFolderDialog, newFolderName, closeCreateFolder, setNewFolderName, confirmCreateFolder } =
    useStorage()

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
          style={{ background: 'var(--cta)' }}
        >
          Tạo
        </button>
      </div>
    </SimpleDialog>
  )
}
