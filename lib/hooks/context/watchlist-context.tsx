"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Movie } from "@/types/movie";
import { useAuth } from "./auth-context";

interface WatchlistContextType {
  addToWatchlist: (movie: Movie) => Promise<void>;
  removeFromWatchlist: (movieId: number) => Promise<void>;
  refreshWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const { accountId } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshWatchlist = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const addToWatchlist = useCallback(
    async (movie: Movie) => {
      if (!accountId) return;

      try {
        const response = await fetch(`/api/account/${accountId}/watchlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId: movie.id,
          }),
        });

        if (!response.ok) throw new Error("Failed to add to watchlist");

        refreshWatchlist();
      } catch (error) {
        throw new Error("Failed to add to watchlist");
      }
    },
    [accountId, refreshWatchlist]
  );

  const removeFromWatchlist = useCallback(
    async (movieId: number) => {
      if (!accountId) return;

      try {
        const response = await fetch(`/api/account/${accountId}/watchlist`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to remove from watchlist");
        }

        return await response.json();
      } catch (error) {
        console.error("Error removing from watchlist:", error);
        throw error;
      }
    },
    [accountId, refreshWatchlist]
  );

  return (
    <WatchlistContext.Provider
      value={{
        addToWatchlist,
        removeFromWatchlist,
        refreshWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
