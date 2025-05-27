import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

interface User {
  id: string;
  email: string;
  name: String;
  role: String;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const data: any = authService.getToken();
    if (data.token) {
      setUser({
        id: data?.user?.id,
        email: data?.user.email,
        name: data?.user?.name,
        role: data?.user?.role,
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await authService.login({ email, password });
      setUser({
        id: res?.user?.id,
        email: res?.user.email,
        name: res?.user?.name,
        role: res?.user?.role,
      });
      return true;
    } catch (error) {
      return false;
    }
  };
  
  const register = async (name:string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await authService.register({ email, password, role: "user", name});
      setUser({
        id: res?.user?.id,
        email: res?.user.email,
        name: res?.user?.name,
        role: res?.user?.role,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
