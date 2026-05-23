import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { storageService } from '@lib/services/storage.service'
import { useStorageStore } from './store'

export function useStorage() {
  const qc = useQueryClient()
  const ui = useStorageStore()
  const { currentPath } = ui

  const query = useQuery({
    queryKey: ['storage', currentPath],
    queryFn: async () => {
      const [files, folders] = await Promise.all([
        storageService.listFiles(currentPath || undefined),
        storageService.listFolders(currentPath || undefined)
      ])
      return { files, folders }
    }
  })

  const invalidate = () => qc.invalidateQueries({ queryKey: ['storage', currentPath] })

  const uploadMutation = useMutation({
    mutationFn: (files: File[]) => storageService.uploadFiles(files, currentPath || undefined),
    onSuccess: (_, files) => {
      invalidate()
      toast.success(`Đã tải lên ${files.length} file`)
    },
    onError: () => toast.error('Tải lên thất bại')
  })

  const createFolderMutation = useMutation({
    mutationFn: (name: string) => storageService.createFolder(name, currentPath || undefined),
    onSuccess: () => {
      invalidate()
      ui.closeCreateFolder()
      toast.success('Đã tạo thư mục')
    },
    onError: () => toast.error('Không thể tạo thư mục')
  })

  const renameMutation = useMutation({
    mutationFn: ({ oldName, newName }: { oldName: string; newName: string }) =>
      storageService.renameFile(oldName, newName, currentPath || undefined),
    onSuccess: () => {
      invalidate()
      ui.closeRename()
      toast.success('Đã đổi tên file')
    },
    onError: () => toast.error('Không thể đổi tên file')
  })

  const deleteFileMutation = useMutation({
    mutationFn: (name: string) => storageService.deleteFile(name, currentPath || undefined),
    onSuccess: () => {
      invalidate()
      ui.closeDeleteFile()
      toast.success('Đã xoá file')
    },
    onError: () => toast.error('Không thể xoá file')
  })

  const deleteFolderMutation = useMutation({
    mutationFn: (path: string) => storageService.deleteFolder(path),
    onSuccess: () => {
      invalidate()
      ui.closeDeleteFolder()
      toast.success('Đã xoá thư mục')
    },
    onError: () => toast.error('Không thể xoá thư mục')
  })

  return {
    files: query.data?.files ?? [],
    folders: query.data?.folders ?? [],
    isLoading: query.isLoading,
    isUploading: uploadMutation.isPending,
    ...ui,
    uploadFiles: (files: File[]) => uploadMutation.mutate(files),
    confirmCreateFolder: () => {
      if (ui.newFolderName.trim()) createFolderMutation.mutate(ui.newFolderName.trim())
    },
    confirmRename: () => {
      if (ui.renamingFile && ui.newFileName.trim())
        renameMutation.mutate({ oldName: ui.renamingFile.name, newName: ui.newFileName.trim() })
    },
    confirmDeleteFile: () => {
      if (ui.deletingFile) deleteFileMutation.mutate(ui.deletingFile.name)
    },
    confirmDeleteFolder: () => {
      if (ui.deletingFolder) deleteFolderMutation.mutate(ui.deletingFolder.path)
    }
  }
}
