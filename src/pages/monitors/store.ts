import { create } from 'zustand'
import { toast } from 'sonner'
import { monitorsService } from '@lib/services/monitors.service'
import type { Monitor, CreateMonitorRequest, UpdateMonitorRequest } from '@lib/types'

interface MonitorsState {
  monitors: Monitor[]
  total: number
  isLoading: boolean
  isSaving: boolean
  isDeleting: boolean
  isTogglingId: string | null

  showModal: boolean
  editingMonitor: Monitor | null

  showDeleteDialog: boolean
  deletingMonitorId: string | null

  fetchMonitors: () => Promise<void>
  openCreateModal: () => void
  openEditModal: (monitor: Monitor) => void
  closeModal: () => void
  openDeleteDialog: (id: string) => void
  closeDeleteDialog: () => void
  submitMonitor: (data: CreateMonitorRequest | UpdateMonitorRequest) => Promise<void>
  confirmDelete: () => Promise<void>
  togglePause: (monitor: Monitor) => Promise<void>
}

export const useMonitorsStore = create<MonitorsState>((set, get) => ({
  monitors: [],
  total: 0,
  isLoading: false,
  isSaving: false,
  isDeleting: false,
  isTogglingId: null,

  showModal: false,
  editingMonitor: null,

  showDeleteDialog: false,
  deletingMonitorId: null,

  fetchMonitors: async () => {
    set({ isLoading: true })
    try {
      const result = await monitorsService.getMonitors()
      set({ monitors: result.items ?? [], total: result.total ?? 0 })
    } catch {
      toast.error('Không thể tải danh sách monitor')
    } finally {
      set({ isLoading: false })
    }
  },

  openCreateModal: () => set({ showModal: true, editingMonitor: null }),
  openEditModal: (monitor) => set({ showModal: true, editingMonitor: monitor }),
  closeModal: () => set({ showModal: false, editingMonitor: null }),

  openDeleteDialog: (id) => set({ showDeleteDialog: true, deletingMonitorId: id }),
  closeDeleteDialog: () => set({ showDeleteDialog: false, deletingMonitorId: null }),

  submitMonitor: async (data) => {
    const { editingMonitor } = get()
    set({ isSaving: true })
    try {
      if (editingMonitor) {
        const updated = await monitorsService.updateMonitor(editingMonitor.id, data as UpdateMonitorRequest)
        set((s) => ({
          monitors: s.monitors.map((m) => (m.id === updated.id ? updated : m))
        }))
        toast.success('Đã cập nhật monitor')
      } else {
        const created = await monitorsService.createMonitor(data as CreateMonitorRequest)
        set((s) => ({ monitors: [created, ...s.monitors], total: s.total + 1 }))
        toast.success('Đã tạo monitor mới')
      }
      set({ showModal: false, editingMonitor: null })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Đã xảy ra lỗi'
      toast.error(msg)
    } finally {
      set({ isSaving: false })
    }
  },

  confirmDelete: async () => {
    const { deletingMonitorId } = get()
    if (!deletingMonitorId) return
    set({ isDeleting: true })
    try {
      await monitorsService.deleteMonitor(deletingMonitorId)
      set((s) => ({
        monitors: s.monitors.filter((m) => m.id !== deletingMonitorId),
        total: s.total - 1,
        showDeleteDialog: false,
        deletingMonitorId: null
      }))
      toast.success('Đã xoá monitor')
    } catch {
      toast.error('Không thể xoá monitor')
    } finally {
      set({ isDeleting: false })
    }
  },

  togglePause: async (monitor) => {
    set({ isTogglingId: monitor.id })
    try {
      const updated = monitor.isActive
        ? await monitorsService.pauseMonitor(monitor.id)
        : await monitorsService.startMonitor(monitor.id)
      set((s) => ({
        monitors: s.monitors.map((m) => (m.id === updated.id ? updated : m))
      }))
      toast.success(updated.isActive ? 'Đã bật monitor' : 'Đã tạm dừng monitor')
    } catch {
      toast.error('Không thể thay đổi trạng thái monitor')
    } finally {
      set({ isTogglingId: null })
    }
  }
}))
