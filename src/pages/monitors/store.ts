import { create } from 'zustand'
import type { Monitor } from '@lib/types'

interface MonitorsUIState {
  showModal: boolean
  editingMonitor: Monitor | null
  showDeleteDialog: boolean
  deletingMonitorId: string | null
  openCreateModal: () => void
  openEditModal: (monitor: Monitor) => void
  closeModal: () => void
  openDeleteDialog: (id: string) => void
  closeDeleteDialog: () => void
}

export const useMonitorsStore = create<MonitorsUIState>((set) => ({
  showModal: false,
  editingMonitor: null,
  showDeleteDialog: false,
  deletingMonitorId: null,
  openCreateModal: () => set({ showModal: true, editingMonitor: null }),
  openEditModal: (monitor) => set({ showModal: true, editingMonitor: monitor }),
  closeModal: () => set({ showModal: false, editingMonitor: null }),
  openDeleteDialog: (id) => set({ showDeleteDialog: true, deletingMonitorId: id }),
  closeDeleteDialog: () => set({ showDeleteDialog: false, deletingMonitorId: null })
}))
