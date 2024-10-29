"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useTMDBAuth } from '../auth';

interface AuthContextType {
  accountId: string | null;
  sessionId: string | null;
  isAuthenticated: boolean;
  setTMDBAuth: (accountId: string, sessionId: string) => void;
  clearTMDBAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useTMDBAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}