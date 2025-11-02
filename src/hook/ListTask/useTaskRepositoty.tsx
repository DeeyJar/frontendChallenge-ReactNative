import { API_URL } from "../../config/api";
import { ITask } from "../../modal/dto/ITask";
import { loadTasksFromStorage, saveTasksToStorage } from "../../config/asyncStorage";

export const useTaskRepository = () => {
  const parseTask = (t: any): ITask => ({
    ...t,
    createdAt: t?.createdAt ? new Date(t.createdAt) : new Date(),
    dueDate: t?.dueDate ? new Date(t.dueDate) : null,
  });

  const fetchTasks = async (): Promise<ITask[]> => {
    const response = await fetch(`${API_URL}/listTask`);
    if (!response.ok) throw new Error(`GET /listTask failed: ${response.status}`);
    const data = await response.json();
    return (data || []).map(parseTask);
  };

  const patchTask = async (id: number, data: Partial<ITask>): Promise<void> => {
    const res = await fetch(`${API_URL}/listTask/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`PATCH /listTask/${id} failed: ${res.status}`);
  };

  const deleteTask = async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/listTask/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`DELETE /listTask/${id} failed: ${res.status}`);
  };

  const saveLocal = async (tasks: ITask[]) => saveTasksToStorage(tasks);
  const loadLocal = async (): Promise<ITask[]> => loadTasksFromStorage();

  return { fetchTasks, patchTask, deleteTask, saveLocal, loadLocal };
};
