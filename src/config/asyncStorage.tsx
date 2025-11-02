import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITask } from "../modal/dto/ITask";

const STORAGE_KEY = "@tasks:list";

export const saveTasksToStorage = async (tasks: ITask[]) => {
    try {
        const plain = tasks.map((t) => ({
            ...t,
            createdAt: t.createdAt ? new Date(t.createdAt).toISOString() : new Date().toISOString(),
            dueDate: t.dueDate ? new Date(t.dueDate).toISOString() : null,
        }));
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(plain));
    } catch (e) {
        console.warn("Failed saving tasks locally", e);
    }
};

export const loadTasksFromStorage = async (): Promise<ITask[]> => {
    try {
        const s = await AsyncStorage.getItem(STORAGE_KEY);
        if (!s) return [];
        const arr = JSON.parse(s || "[]");
        return (arr || []).map((t: any) => ({
            ...t,
            createdAt: t.createdAt ? new Date(t.createdAt) : new Date(),
            dueDate: t.dueDate ? new Date(t.dueDate) : null,
        }));
    } catch (e) {
        console.warn("Failed loading tasks locally", e);
        return [];
    }
};