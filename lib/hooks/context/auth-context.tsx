"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { TMDBAuth, useTMDBAuth } from "../auth";
import { useRouter } from "next/navigation";

type AuthContextType = TMDBAuth;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useTMDBAuth();
  const router = useRouter();
  const { sessionId } = auth;

  useEffect(() => {
    if (sessionId) {
      router.push("/dashboard");
    }
  }, [router, sessionId]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
