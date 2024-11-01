import { useState, useEffect } from "react";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import Spinner from "./Spinner";

interface PopularMoviesProps {
  className?: string;
  initialPage?: number;
  onMovieSelect?: (movie: Movie) => void;
}

export default function PopularMovies({
  className = "",
  initialPage = 1,
  onMovieSelect,
}: PopularMoviesProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const fetchMovies = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/movies/popular?page=${page}`);
      const data: MovieResponse = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(initialPage);
  }, [initialPage]);

  const handleMovieClick = (movie: Movie) => {
    if (onMovieSelect) {
      onMovieSelect(movie);
    } else {
      setSelectedMovie(movie);
    }
  };

  return (
    <div className={`bg-gray-100 dark:bg-gray-900 py-8 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-center space-x-2">
              <button
                onClick={() => fetchMovies(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              >
                Previous
              </button>
              <span className="px-4 py-2 dark:text-gray-200">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => fetchMovies(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              >
                Next
              </button>
            </div>
          </>
        )}

        {!onMovieSelect && selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </div>
  );
}
