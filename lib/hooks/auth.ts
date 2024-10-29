"use client";

import { useState, useEffect } from "react";
import { COOKIE_NAMES, COOKIE_OPTIONS } from "../constants/auth";

interface TMDBAuth {
  accountId: string | null;
  sessionId: string | null;
  isAuthenticated: boolean;
  setTMDBAuth: (accountId: string, sessionId: string) => void;
  clearTMDBAuth: () => void;
}

function getCookie(name: string): string | null {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

function setCookie(name: string, value: string, options = COOKIE_OPTIONS) {
  const cookieValue = encodeURIComponent(value);
  let cookieString = `${name}=${cookieValue}`;

  if (options.maxAge) cookieString += `; Max-Age=${options.maxAge}`;
  if (options.secure) cookieString += "; Secure";
  if (options.sameSite) cookieString += `; SameSite=${options.sameSite}`;
  if (options.path) cookieString += `; Path=${options.path}`;

  document.cookie = cookieString;
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
    setCookie(COOKIE_NAMES.ACCOUNT_ID, newAccountId);
    setCookie(COOKIE_NAMES.SESSION_ID, newSessionId);
    setAccountId(newAccountId);
    setSessionId(newSessionId);
  };

  const clearTMDBAuth = () => {
    deleteCookie(COOKIE_NAMES.ACCOUNT_ID);
    deleteCookie(COOKIE_NAMES.SESSION_ID);
    setAccountId(null);
    setSessionId(null);
  };

  return {
    accountId,
    sessionId,
    isAuthenticated: Boolean(accountId && sessionId),
    setTMDBAuth,
    clearTMDBAuth,
  };
};
