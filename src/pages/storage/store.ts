import { create } from 'zustand'
import type { StorageFile, StorageFolder } from '@lib/types'

interface StorageUIState {
  currentPath: string
  navigate: (path: string) => void

  showCreateFolderDialog: boolean
  newFolderName: string
  openCreateFolder: () => void
  closeCreateFolder: () => void
  setNewFolderName: (name: string) => void

  showRenameDialog: boolean
  renamingFile: StorageFile | null
  newFileName: string
  openRename: (file: StorageFile) => void
  closeRename: () => void
  setNewFileName: (name: string) => void

  showDeleteFileDialog: boolean
  deletingFile: StorageFile | null
  openDeleteFile: (file: StorageFile) => void
  closeDeleteFile: () => void

  showDeleteFolderDialog: boolean
  deletingFolder: StorageFolder | null
  openDeleteFolder: (folder: StorageFolder) => void
  closeDeleteFolder: () => void
}

export const useStorageStore = create<StorageUIState>((set) => ({
  currentPath: '',
  navigate: (path) => set({ currentPath: path }),

  showCreateFolderDialog: false,
  newFolderName: '',
  openCreateFolder: () => set({ showCreateFolderDialog: true, newFolderName: '' }),
  closeCreateFolder: () => set({ showCreateFolderDialog: false }),
  setNewFolderName: (name) => set({ newFolderName: name }),

  showRenameDialog: false,
  renamingFile: null,
  newFileName: '',
  openRename: (file) => set({ showRenameDialog: true, renamingFile: file, newFileName: file.name }),
  closeRename: () => set({ showRenameDialog: false, renamingFile: null }),
  setNewFileName: (name) => set({ newFileName: name }),

  showDeleteFileDialog: false,
  deletingFile: null,
  openDeleteFile: (file) => set({ showDeleteFileDialog: true, deletingFile: file }),
  closeDeleteFile: () => set({ showDeleteFileDialog: false, deletingFile: null }),

  showDeleteFolderDialog: false,
  deletingFolder: null,
  openDeleteFolder: (folder) => set({ showDeleteFolderDialog: true, deletingFolder: folder }),
  closeDeleteFolder: () => set({ showDeleteFolderDialog: false, deletingFolder: null })
}))
