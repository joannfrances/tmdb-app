"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/context/auth-context";
import WatchList from "@/components/WatchList";
import Spinner from "@/components/Spinner";
import Recommendations from "@/components/Recommendations";


export default function Dashboard() {
  const { isAuthenticated } = useAuth();
 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) return <Spinner />;

  

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Welcome to your TMDB dashboard!
          </p>
        </div>
        <WatchList
          onMovieSelect={(movie) => console.log("Selected movie:", movie)}
          className="bg-gray-100 dark:bg-gray-900"
        />
        <Recommendations />
      </div>
    </>
  );
}
