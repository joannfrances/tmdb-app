import { useState, useEffect, useCallback, useRef } from "react";
import { Movie } from "@/types/movie";
import { useAuth } from "@/lib/hooks/context/auth-context";
import { useWatchlist } from "@/lib/hooks/context/watchlist-context";
import MovieCard from "./MovieCard";
import Modal from "./Modal";
import Spinner from "./Spinner";

interface WatchListProps {
  className?: string;
  onMovieSelect: (movie: Movie) => void;
}

export default function WatchList({
  className = "",
  onMovieSelect,
}: WatchListProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const { accountId } = useAuth();
  const { removeFromWatchlist } = useWatchlist();
  const watchlistRef = useRef<HTMLDivElement>(null);

  const fetchWatchlist = useCallback(
    async (page: number) => {
      if (!accountId) return;

      setLoading(true);
      try {
        const response = await fetch(
          `/api/account/${accountId}/watchlist?page=${page}`
        );
        if (!response.ok) throw new Error("Failed to fetch watchlist");

        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setCurrentPage(page);
        setError("");
      } catch (err) {
        setError("Failed to load watchlist");
      }
      setLoading(false);
    },
    [accountId]
  );

  const refresh = useCallback(() => {
    fetchWatchlist(currentPage);
  }, [fetchWatchlist, currentPage]);

  useEffect(() => {
    if (accountId) {
      fetchWatchlist(1);
    }
  }, [accountId, fetchWatchlist]);

  const handleRemoveFromWatchlist = async (movieId: number) => {
    setSelectedMovieId(movieId);
    setShowModal(true);
  };

  const confirmRemove = async () => {
    if (!selectedMovieId) return;

    try {
      await removeFromWatchlist(selectedMovieId);
      refresh();
    } catch (err) {
      setError("Failed to remove movie from watchlist");
    } finally {
      setShowModal(false);
      setSelectedMovieId(null);
    }
  };

  useEffect(() => {
    if (window) {
      window.refreshWatchlist = async () => {
        await fetchWatchlist(1);
        watchlistRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      };
    }
  }, [fetchWatchlist]);

  return (
    <>
      <div ref={watchlistRef} className={`py-8 ${className}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Watchlist</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {loading ? (
            <Spinner />
          ) : (
            <>
              {movies.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  Your watchlist is empty. Add some movies to watch later!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={onMovieSelect}
                      onRemove={() => handleRemoveFromWatchlist(movie.id)}
                    />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center space-x-2">
                  <button
                    onClick={() => fetchWatchlist(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-md disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => fetchWatchlist(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Remove from Watchlist"
        icon={{
          color: "text-red-600",
          bgColor: "bg-red-100",
          svg: (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          ),
        }}
        actions={
          <div className="sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={confirmRemove}
            >
              Remove
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        }
      >
        <p className="text-sm text-gray-500">
          Are you sure you want to remove this movie from your watchlist? This
          action cannot be undone.
        </p>
      </Modal>
    </>
  );
}
