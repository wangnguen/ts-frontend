import { create } from 'zustand'
import { toast } from 'sonner'
import { storageService } from '@lib/services/storage.service'
import type { StorageFile, StorageFolder } from '@lib/types'

interface StorageState {
  currentPath: string
  files: StorageFile[]
  folders: StorageFolder[]
  isLoading: boolean
  isUploading: boolean

  showCreateFolderDialog: boolean
  newFolderName: string

  showRenameDialog: boolean
  renamingFile: StorageFile | null
  newFileName: string

  showDeleteFileDialog: boolean
  deletingFile: StorageFile | null

  showDeleteFolderDialog: boolean
  deletingFolder: StorageFolder | null

  navigate: (path: string) => void
  reload: () => Promise<void>
  uploadFiles: (files: File[]) => Promise<void>

  openCreateFolder: () => void
  closeCreateFolder: () => void
  setNewFolderName: (name: string) => void
  confirmCreateFolder: () => Promise<void>

  openRename: (file: StorageFile) => void
  closeRename: () => void
  setNewFileName: (name: string) => void
  confirmRename: () => Promise<void>

  openDeleteFile: (file: StorageFile) => void
  closeDeleteFile: () => void
  confirmDeleteFile: () => Promise<void>

  openDeleteFolder: (folder: StorageFolder) => void
  closeDeleteFolder: () => void
  confirmDeleteFolder: () => Promise<void>
}

export const useStorageStore = create<StorageState>((set, get) => ({
  currentPath: '',
  files: [],
  folders: [],
  isLoading: false,
  isUploading: false,

  showCreateFolderDialog: false,
  newFolderName: '',

  showRenameDialog: false,
  renamingFile: null,
  newFileName: '',

  showDeleteFileDialog: false,
  deletingFile: null,

  showDeleteFolderDialog: false,
  deletingFolder: null,

  navigate: (path) => {
    set({ currentPath: path })
    get().reload()
  },

  reload: async () => {
    const { currentPath } = get()
    set({ isLoading: true })
    try {
      const [files, folders] = await Promise.all([
        storageService.listFiles(currentPath || undefined),
        storageService.listFolders(currentPath || undefined)
      ])
      set({ files, folders })
    } catch {
      toast.error('Không thể tải dữ liệu')
    } finally {
      set({ isLoading: false })
    }
  },

  uploadFiles: async (files) => {
    const { currentPath, reload } = get()
    set({ isUploading: true })
    try {
      await storageService.uploadFiles(files, currentPath || undefined)
      toast.success(`Đã tải lên ${files.length} file`)
      reload()
    } catch {
      toast.error('Tải lên thất bại')
    } finally {
      set({ isUploading: false })
    }
  },

  openCreateFolder: () => set({ showCreateFolderDialog: true, newFolderName: '' }),
  closeCreateFolder: () => set({ showCreateFolderDialog: false }),
  setNewFolderName: (name) => set({ newFolderName: name }),
  confirmCreateFolder: async () => {
    const { newFolderName, currentPath, reload } = get()
    if (!newFolderName.trim()) return
    try {
      await storageService.createFolder(newFolderName.trim(), currentPath || undefined)
      set({ showCreateFolderDialog: false, newFolderName: '' })
      toast.success('Đã tạo thư mục')
      reload()
    } catch {
      toast.error('Không thể tạo thư mục')
    }
  },

  openRename: (file) => set({ showRenameDialog: true, renamingFile: file, newFileName: file.name }),
  closeRename: () => set({ showRenameDialog: false, renamingFile: null }),
  setNewFileName: (name) => set({ newFileName: name }),
  confirmRename: async () => {
    const { renamingFile, newFileName, currentPath, reload } = get()
    if (!renamingFile || !newFileName.trim()) return
    try {
      await storageService.renameFile(renamingFile.name, newFileName.trim(), currentPath || undefined)
      set({ showRenameDialog: false, renamingFile: null })
      toast.success('Đã đổi tên file')
      reload()
    } catch {
      toast.error('Không thể đổi tên file')
    }
  },

  openDeleteFile: (file) => set({ showDeleteFileDialog: true, deletingFile: file }),
  closeDeleteFile: () => set({ showDeleteFileDialog: false, deletingFile: null }),
  confirmDeleteFile: async () => {
    const { deletingFile, currentPath, reload } = get()
    if (!deletingFile) return
    try {
      await storageService.deleteFile(deletingFile.name, currentPath || undefined)
      set({ showDeleteFileDialog: false, deletingFile: null })
      toast.success('Đã xoá file')
      reload()
    } catch {
      toast.error('Không thể xoá file')
    }
  },

  openDeleteFolder: (folder) => set({ showDeleteFolderDialog: true, deletingFolder: folder }),
  closeDeleteFolder: () => set({ showDeleteFolderDialog: false, deletingFolder: null }),
  confirmDeleteFolder: async () => {
    const { deletingFolder, reload } = get()
    if (!deletingFolder) return
    try {
      await storageService.deleteFolder(deletingFolder.path)
      set({ showDeleteFolderDialog: false, deletingFolder: null })
      toast.success('Đã xoá thư mục')
      reload()
    } catch {
      toast.error('Không thể xoá thư mục')
    }
  }
}))
