import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { monitorsService } from '@lib/services/monitors.service'
import { useMonitorsStore } from './store'
import type { CreateMonitorRequest, UpdateMonitorRequest, Monitor } from '@lib/types'

export function useMonitors() {
  const qc = useQueryClient()
  const ui = useMonitorsStore()

  const query = useQuery({
    queryKey: ['monitors'],
    queryFn: () => monitorsService.getMonitors()
  })

  const saveMutation = useMutation({
    mutationFn: ({ id, data }: { id?: string; data: CreateMonitorRequest | UpdateMonitorRequest }) =>
      id
        ? monitorsService.updateMonitor(id, data as UpdateMonitorRequest)
        : monitorsService.createMonitor(data as CreateMonitorRequest),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['monitors'] })
      toast.success(id ? 'Đã cập nhật monitor' : 'Đã tạo monitor mới')
      ui.closeModal()
    },
    onError: (e: unknown) => toast.error(e instanceof Error ? e.message : 'Đã xảy ra lỗi')
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => monitorsService.deleteMonitor(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['monitors'] })
      toast.success('Đã xoá monitor')
      ui.closeDeleteDialog()
    },
    onError: () => toast.error('Không thể xoá monitor')
  })

  const toggleMutation = useMutation({
    mutationFn: (monitor: Monitor) =>
      monitor.isActive ? monitorsService.pauseMonitor(monitor.id) : monitorsService.startMonitor(monitor.id),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ['monitors'] })
      toast.success(updated.isActive ? 'Đã bật monitor' : 'Đã tạm dừng monitor')
    },
    onError: () => toast.error('Không thể thay đổi trạng thái monitor')
  })

  return {
    monitors: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isSaving: saveMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isTogglingId: toggleMutation.isPending ? (toggleMutation.variables?.id ?? null) : null,
    ...ui,
    submitMonitor: (data: CreateMonitorRequest | UpdateMonitorRequest) =>
      saveMutation.mutate({ id: ui.editingMonitor?.id, data }),
    confirmDelete: () => {
      if (ui.deletingMonitorId) deleteMutation.mutate(ui.deletingMonitorId)
    },
    togglePause: (monitor: Monitor) => toggleMutation.mutate(monitor)
  }
}
