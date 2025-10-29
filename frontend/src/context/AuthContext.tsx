// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect} from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(sessionStorage.getItem("token"));
  const [user, setUser] = useState<any>(JSON.parse(sessionStorage.getItem("user") || "null"));

  useEffect(() => {
    if (token) axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await axiosInstance.post("/auth/login", { email, password });
    const { accessToken, user } = res.data;

    setToken(accessToken);
    setUser(user);
    sessionStorage.setItem("token", accessToken);
    sessionStorage.setItem("user", JSON.stringify(user));

    axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
    navigate("/dashboard");
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await axiosInstance.post("/auth/signup", { name, email, password });
    const { accessToken, user } = res.data;

    setToken(accessToken);
    setUser(user);
    sessionStorage.setItem("token", accessToken);
    sessionStorage.setItem("user", JSON.stringify(user));

    axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
    navigate("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
