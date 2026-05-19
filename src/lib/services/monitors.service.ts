import { http } from '../axios'
import type { Monitor, CreateMonitorRequest, UpdateMonitorRequest, PaginatedMonitors } from '../types'

export async function getMonitors(page = 1, limit = 50): Promise<PaginatedMonitors> {
  const { data } = await http.get<PaginatedMonitors>('/monitors', { params: { page, limit } })
  return data
}

export async function getMonitor(id: string): Promise<Monitor> {
  const { data } = await http.get<Monitor>(`/monitors/${id}`)
  return data
}

export async function createMonitor(payload: CreateMonitorRequest): Promise<Monitor> {
  const { data } = await http.post<Monitor>('/monitors', payload)
  return data
}

export async function updateMonitor(id: string, payload: UpdateMonitorRequest): Promise<Monitor> {
  const { data } = await http.patch<Monitor>(`/monitors/${id}`, payload)
  return data
}

export async function deleteMonitor(id: string): Promise<Monitor> {
  const { data } = await http.delete<Monitor>(`/monitors/${id}`)
  return data
}

export async function pauseMonitor(id: string): Promise<Monitor> {
  const { data } = await http.patch<Monitor>(`/monitors/${id}/pause`)
  return data
}

export async function startMonitor(id: string): Promise<Monitor> {
  const { data } = await http.patch<Monitor>(`/monitors/${id}/start`)
  return data
}

export const monitorsService = {
  getMonitors,
  getMonitor,
  createMonitor,
  updateMonitor,
  deleteMonitor,
  pauseMonitor,
  startMonitor
}
