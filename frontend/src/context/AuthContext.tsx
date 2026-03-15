"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage on mount
    const savedToken = localStorage.getItem("hx_token");
    const savedUser = localStorage.getItem("hx_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      // Optionally verify with backend /auth/me here
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("hx_token", newToken);
    localStorage.setItem("hx_user", JSON.stringify(userData));

    // Redirect based on role
    if (userData.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/client/dashboard");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("hx_token");
    localStorage.removeItem("hx_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
