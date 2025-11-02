import React, { createContext, useContext } from "react";
import { useCategoriesServices } from "../hook/useCategoriesServices";

const CategoryContext = createContext<ReturnType<typeof useCategoriesServices> | null>(null);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const categoryServices = useCategoriesServices();
  return <CategoryContext.Provider value={categoryServices}>{children}</CategoryContext.Provider>;
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("useCategoryContext must be used within a CategoryProvider");
  return context;
};
