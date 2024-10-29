"use client";

import { useState, useEffect } from "react";
import { COOKIE_NAMES } from "../constants/auth";

export interface TMDBAuth {
  accountId: string | null;
  sessionId: string | null;
  isAuthenticated: boolean;
  setTMDBAuth: (accountId: string, sessionId: string) => void;
  clearTMDBAuth: () => void;
}

export function getCookie(name: string): string | null {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; Path=/`;
}

export const useTMDBAuth = (): TMDBAuth => {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const storedAccountId = getCookie(COOKIE_NAMES.ACCOUNT_ID);
    const storedSessionId = getCookie(COOKIE_NAMES.SESSION_ID);

    if (storedAccountId) setAccountId(storedAccountId);
    if (storedSessionId) setSessionId(storedSessionId);
  }, []);

  const setTMDBAuth = (newAccountId: string, newSessionId: string) => {
    setAccountId(newAccountId);
    setSessionId(newSessionId);
  };

  const clearTMDBAuth = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      // Clear local state
      setAccountId(null);
      setSessionId(null);
      deleteCookie(COOKIE_NAMES.ACCOUNT_ID);
      deleteCookie(COOKIE_NAMES.SESSION_ID);
    } catch (error) {
      console.error("Error clearing TMDB auth:", error);
      // Still clear local state even if API request fails
      setAccountId(null);
      setSessionId(null);
      deleteCookie(COOKIE_NAMES.ACCOUNT_ID);
      deleteCookie(COOKIE_NAMES.SESSION_ID);
      throw error;
    }
  };

  return {
    accountId,
    sessionId,
    isAuthenticated: Boolean(accountId && sessionId),
    setTMDBAuth,
    clearTMDBAuth,
  };
};
