import React, { createContext, useContext } from "react";
import { useListTaskServices } from "../hook/ListTask/useListTaskServices";

const TaskContext = createContext<ReturnType<typeof useListTaskServices> | null>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const taskServices = useListTaskServices();
  return <TaskContext.Provider value={taskServices}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};
