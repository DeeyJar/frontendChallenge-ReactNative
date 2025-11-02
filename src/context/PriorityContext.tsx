import React, { createContext, useContext } from "react";
import { usePrioritiesServices } from "../hook/usePrioritiesServices";

const PriorityContext = createContext<ReturnType<typeof usePrioritiesServices> | null>(null);

export const PriorityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const priorityServices = usePrioritiesServices();
  return <PriorityContext.Provider value={priorityServices}>{children}</PriorityContext.Provider>;
};

export const usePriorityContext = () => {
  const context = useContext(PriorityContext);
  if (!context) throw new Error("usePriorityContext must be used within a PriorityProvider");
  return context;
};
