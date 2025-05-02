import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/user";

interface AuthContextType {
  user: User | null;
  pendingUserId: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setPendingUserId: (id: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
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

    const storedPendingId = localStorage.getItem("pendingUserId");
    if (storedPendingId) {
      setPendingUserId(storedPendingId);
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Save pendingUserId to localStorage whenever it changes
  useEffect(() => {
    if (pendingUserId) {
      localStorage.setItem("pendingUserId", pendingUserId);
    } else {
      localStorage.removeItem("pendingUserId");
    }
  }, [pendingUserId]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        pendingUserId,
        isLoading,
        setUser,
        setPendingUserId,
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
