// src/context/AppContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axiosInstance from "../api/axios";
import { useAuth } from "./AuthContext";

interface AppContextType {
  projects: any[];
  tasks: any[];
  fetchProjects: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  refreshAll: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchProjects = async () => {
    if (!token) return;
    const res = await axiosInstance.get("/projects");
    setProjects(res.data);
  };

  const fetchTasks = async () => {
    if (!token) return;
    const res = await axiosInstance.get("/tasks");
    setTasks(res.data);
  };

  const refreshAll = async () => {
    await Promise.all([fetchProjects(), fetchTasks()]);
  };

  useEffect(() => {
    if (token) refreshAll();
  }, [token]);

  return (
    <AppContext.Provider value={{ projects, tasks, fetchProjects, fetchTasks, refreshAll }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
