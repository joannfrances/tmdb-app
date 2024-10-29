"use client";

import { useAuth } from "@/lib/hooks/context/auth-context";
import LogoutButton from "./LogoutButton";
import MovieTimeLogo from "./MovieTimeLogo";

export default function Header() {
  const { sessionId } = useAuth();

  if (!sessionId) return null;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <MovieTimeLogo />
          </div>
          <div className="flex-1 flex justify-end">
            <LogoutButton className="ml-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
