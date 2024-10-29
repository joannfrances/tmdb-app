import Image from "next/image";
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  onRemove?: (movieId: number) => void;
}

export default function MovieCard({
  movie,
  onClick,
  onRemove,
}: MovieCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(movie);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(movie.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 overflow-hidden transition-transform hover:scale-105"
    >
      {onRemove && (
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 z-10 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
          title="Remove from watchlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <div className="relative h-[300px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate text-gray-900 dark:text-white">
          {movie.title}
        </h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(movie.release_date).getFullYear()}
          </span>
          <span className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <svg
              className="w-4 h-4 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
