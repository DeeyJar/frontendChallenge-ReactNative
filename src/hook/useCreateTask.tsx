import { useState } from "react";
import { IFormData } from "../modal/dto/IFormTask";
import { API_URL } from "../config/api";
import { CreatedTaskResponse, CreateTaskPayload } from "../modal/dto/ICreateTask";
import { useTaskContext } from "../context/TaskContext";
import { ITask } from "../modal/dto/ITask";

export const useCreateTask = () => {
    const [loading, setLoading] = useState(false);
    const { addTask } = useTaskContext();
    const createTask = async (taskData: IFormData) => {
        setLoading(true);

        try {
            const payload: CreateTaskPayload = {
                title: taskData.title?.trim() ?? "",
                description: taskData.description?.trim() ?? "",
                priority: taskData.priority,
                category: taskData.category,
                status: "pending",
                completed: false,
                dueDate: null,
                createdAt: new Date().toISOString(),
            };
            const response = await fetch(`${API_URL}/listTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const text = await response.text().catch(() => "<no body>");
                throw new Error(`POST failed: ${response.status} ${response.statusText} - ${text}`);
            }

            const created: CreatedTaskResponse = await response.json();
            const createdTask: ITask = {
                id: created.id,
                title: created.title,
                description: created.description,
                priority: created.priority,
                category: created.category,
                status: created.status,
                completed: created.completed,
                dueDate: created.dueDate ? new Date(created.dueDate) : null,
                createdAt: new Date(created.createdAt),
            };
            addTask(createdTask);
            return created;

        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    };

    return { loading, createTask };
};