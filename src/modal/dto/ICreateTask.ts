export type CreateTaskPayload = {
  title: string;
  status: string;
  priority: string;
  completed: boolean;
  category: string;
  dueDate: string | null;
  createdAt: string;
  description: string;
};

export type CreatedTaskResponse = CreateTaskPayload & {
  id: number;
};
