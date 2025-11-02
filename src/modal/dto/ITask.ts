export interface ITask {
    id: number;
    title: string;
    status: string;
    priority: string;
    completed: boolean;
    category: string;
    dueDate: Date | null;
    createdAt: Date;
    description: string;
}