import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/user";
import { authService } from "@/services/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // On mount, check if we have a token in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      // Set the token in authService when user data is updated
      if (user.token) {
        authService.setToken(user.token);
      }
    } else {
      localStorage.removeItem("user");
      // Clear the token in authService when user is logged out
      authService.clearToken();
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Clear the token in authService when logout is called
    authService.clearToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        setIsLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
