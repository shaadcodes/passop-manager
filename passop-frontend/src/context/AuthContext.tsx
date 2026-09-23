import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthContextType } from "../types/interfaces";
import { passopAPI } from "../services/api";
import { deriveKey } from "../utils/crypto";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("passop_token"),
  );
  const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);

  const registerUser = async (email: string, masterPassword: string) => {
    await passopAPI.register(email, masterPassword);
  };

  const login = async (email: string, masterPassword: string) => {
    await passopAPI.login(email, masterPassword);
    const key = await deriveKey(masterPassword, email);

    setCryptoKey(key);
    setIsAuthenticated(true);
  };

  const logout = () => {
    passopAPI.logout();
    setCryptoKey(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, cryptoKey, registerUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
