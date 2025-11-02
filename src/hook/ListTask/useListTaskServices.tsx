import { useMemo, useState } from "react";
import { LayoutAnimation } from "react-native";
import { ITask } from "../../modal/dto/ITask";
import { useTaskRepository } from "./useTaskRepositoty";
import { useTaskManager } from "./useTaskManager";

export const useListTaskServices = () => {
  const MIN_FEEDBACK_MS = 250;
  const repo = useTaskRepository();
  const manager = useTaskManager();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const fetchListTask = async () => {
    manager.setLoading(true);
    try {
      if (manager.listTask.length === 0) {
        const cached = await repo.loadLocal();
        if (cached.length > 0) {
          manager.setTasks(cached);
        }
      }
      const remote = await repo.fetchTasks();
      manager.setTasks(remote);
      setSelectedIds(new Set());
      await repo.saveLocal(remote);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      manager.setLoading(false);
    }
  };

  const toggleFilter = manager.toggleFilter;

  const addTask = (task: ITask) => {
    const updated = manager.addTask(task);
    repo.saveLocal(updated);
  };

  const clearAllFilters = manager.clearAllFilters;

  const selectedCount = selectedIds.size;
  const isSelected = (id: number) => selectedIds.has(id);
  const toggleSelect = (id: number, value?: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const shouldSelect = typeof value === "boolean" ? value : !next.has(id);
      if (shouldSelect) next.add(id);
      else next.delete(id);
      return next;
    });
  };
  const clearSelection = () => setSelectedIds(new Set());
  const selectAllFiltered = () => {
    setSelectedIds(new Set(manager.listTaskFilter.map((t) => t.id)));
  };

  const selectedTasks = useMemo(
    () => manager.listTask.filter((t) => selectedIds.has(t.id)),
    [manager.listTask, selectedIds]
  );

  const markSelectedCompleted = async () => {
    if (selectedIds.size === 0) return;
    manager.setLoading(true);
    try {
      const ids = Array.from(selectedIds);
      await Promise.all(
        ids.map(async (id) => {
          await repo.patchTask(id, { status: "completed", completed: true });
          return true;
        })
      );
      const updated = manager.listTask.map((t) =>
        selectedIds.has(t.id) ? { ...t, status: "completed", completed: true } : t
      );
      manager.setTasks(updated);
      await repo.saveLocal(updated);
      setSelectedIds(new Set());
    } catch (e) {
      console.error(e);
    } finally {
      manager.setLoading(false);
    }
  };

  const deleteSelected = async () => {
    if (selectedIds.size === 0) return;
    manager.setLoading(true);
    try {
      const ids = Array.from(selectedIds);
      await Promise.all(
        ids.map(async (id) => {
          await repo.deleteTask(id);
          return true;
        })
      );
      const updated = manager.listTask.filter((t) => !selectedIds.has(t.id));
      manager.setTasks(updated);
      await repo.saveLocal(updated);
      setSelectedIds(new Set());
    } catch (e) {
      console.error(e);
    } finally {
      manager.setLoading(false);
    }
  };

  const updateTaskCompleted = async (id: number, completed: boolean) => {
    const key = String(id);
    manager.beginUpdating(id);
    try {
      await repo.patchTask(id, { completed, status: completed ? "completed" : "pending" });
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const updated = manager.listTask.map((t) => (t.id === id ? { ...t, completed, status: completed ? "completed" : "pending" } : t));
      manager.setTasks(updated);
      await repo.saveLocal(updated);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        manager.endUpdating(id);
      }, MIN_FEEDBACK_MS);
    }
  };

  const deleteTaskById = async (id: number) => {
    const key = String(id);
    manager.beginDeleting(id);
    try {
      await repo.deleteTask(id);
      const finalize = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const updated = manager.listTask.filter((t) => t.id !== id);
        manager.setTasks(updated);
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        manager.endDeleting(id);
      };
      setTimeout(finalize, MIN_FEEDBACK_MS);
    } catch (e) {
      console.error(e);
      manager.endDeleting(id);
    }
  };

  const updateTask = async (id: number, patch: Partial<ITask>) => {
    manager.beginUpdating(id);
    try {
      await repo.patchTask(id, patch);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const updated = manager.listTask.map((t) => (t.id === id ? { ...t, ...patch } : t));
      manager.setTasks(updated);
      await repo.saveLocal(updated);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        manager.endUpdating(id);
      }, MIN_FEEDBACK_MS);
    }
  };

  return {
    listTask: manager.listTask,
    listTaskFilter: manager.listTaskFilter,
    loading: manager.loading,
    activeFilters: manager.activeFilters,
    selectedIds,
    selectedCount,
    selectedTasks,
    fetchListTask,
    toggleFilter,
    clearAllFilters,
    addTask,
    isSelected,
    toggleSelect,
    clearSelection,
    selectAllFiltered,
    markSelectedCompleted,
    deleteSelected,
    updateTaskCompleted,
    deleteTaskById,
    updateTask,
    isUpdating: (id: number) => manager.isUpdating(id),
    isDeleting: (id: number) => manager.isDeleting(id),
  };
};
