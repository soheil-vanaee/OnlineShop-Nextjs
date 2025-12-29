"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";
import { User } from "@/auth/auth";

type AuthContextType = {
  user: any;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  const login = async (email: string, password: string) => {
    try {
      const result = await nextAuthSignIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, you would have a backend endpoint for registration
    // For this example, we'll just call login after adding the user to our mock database
    console.log("Registering user:", { name, email, password });
    // In a real app, you would send a request to your backend to register the user
    // For now, we'll just call login to simulate the registration process
    await login(email, password);
  };

  const logout = async () => {
    await nextAuthSignOut({ redirect: false });
  };

  const value = {
    user: session?.user,
    isAdmin: session?.user?.isAdmin || false,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}