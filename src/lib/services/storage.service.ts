import { http } from '../axios'
import type { StorageFile, StorageFolder, UploadFilesResponse, StorageListResponse, FolderListResponse } from '../types'

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
  const { data } = await http.get<FolderListResponse>('/storage/folder/list', {
    params: folderPath ? { folderPath } : undefined
  })
  return (data as unknown as StorageFolder[]) ?? []
}

export async function listFiles(folderPath?: string): Promise<StorageFile[]> {
  const { data } = await http.get<StorageListResponse>('/storage/files/list', {
    params: folderPath ? { folderPath } : undefined
  })
  return (data as unknown as StorageFile[]) ?? []
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
