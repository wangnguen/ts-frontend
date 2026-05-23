import { http } from '../axios'
import type { StorageFile, StorageFolder, UploadFilesResponse } from '../types'

export async function uploadFiles(files: File[], folderPath?: string): Promise<UploadFilesResponse> {
  const form = new FormData()
  files.forEach((f) => form.append('files', f))
  if (folderPath) form.append('folderPath', folderPath)
  const { data } = await http.post<UploadFilesResponse>('/storage/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data
}

export async function renameFile(oldFileName: string, newFileName: string, folderPath?: string): Promise<void> {
  await http.patch('/storage/change-file-name', { oldFileName, newFileName, folderPath })
}

export async function deleteFile(fileName: string, folderPath?: string): Promise<void> {
  await http.patch('/storage/delete-file', { fileName, folderPath })
}

export async function createFolder(folderName: string, folderPath?: string): Promise<void> {
  await http.post('/storage/folder/create', { folderName, folderPath })
}

export async function listFolders(folderPath?: string): Promise<StorageFolder[]> {
  const { data } = await http.get<{ folderList: StorageFolder[] }>('/storage/folder/list', {
    params: folderPath ? { folderPath } : undefined
  })
  return data.folderList ?? []
}

export async function listFiles(folderPath?: string): Promise<StorageFile[]> {
  const { data } = await http.get<{ fileList: StorageFile[] }>('/storage/files/list', {
    params: folderPath ? { folderPath } : undefined
  })
  return data.fileList ?? []
}

export async function deleteFolder(folderPath: string): Promise<void> {
  await http.patch('/storage/folder/delete', { folderPath })
}

export const storageService = {
  uploadFiles,
  renameFile,
  deleteFile,
  createFolder,
  listFolders,
  listFiles,
  deleteFolder
}
