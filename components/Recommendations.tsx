import { useState, useEffect } from "react";
import MoviePreferencesSurvey from "./MoviePreferencesSurvey";
import PopularMovies from "./PopularMovies";
import { Movie } from "../types/movie";
import Modal from "./Modal";
import { useWatchlist } from "@/lib/hooks/context/watchlist-context";

type ModalType = "confirm" | "success" | "error" | null;

const Recommendations = () => {
  const [showFineTune, setShowFineTune] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { addToWatchlist } = useWatchlist();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("surveyData");
    if (savedData) {
      setShowFineTune(true);
    }
  }, []);


  const handleFineTuneClick = () => {
    setShowFineTune(true);
  };

  const handleShowPopularClick = () => {
    setShowFineTune(false);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalType("confirm");
  };

  const handleConfirmAdd = async () => {
    if (!selectedMovie) return;

    setIsAdding(true);
    try {
      await addToWatchlist(selectedMovie);
      if (typeof window !== "undefined" && window.refreshWatchlist) {
        window.refreshWatchlist();
      }
      setModalType("success");
    } catch {
      setModalType("error");
    } finally {
      setIsAdding(false);
    }
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedMovie(null);
  };

  const renderModal = () => {
    if (!modalType || !selectedMovie) return null;

    const modalProps = {
      isOpen: true,
      onClose: handleCloseModal,
    };

    switch (modalType) {
      case "confirm":
        return (
          <Modal
            {...modalProps}
            title="Add to Watchlist"
            disableClose={isAdding}
            icon={{
              color: "text-blue-600",
              bgColor: "bg-blue-100",
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              ),
            }}
            actions={
              <div className="sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  onClick={handleConfirmAdd}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Adding...
                    </span>
                  ) : (
                    "Add to Watchlist"
                  )}
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50"
                  onClick={handleCloseModal}
                  disabled={isAdding}
                >
                  Cancel
                </button>
              </div>
            }
          >
            <p className="text-sm">
              Would you like to add &quot;{selectedMovie.title}&quot; to your watchlist?
            </p>
          </Modal>
        );

      case "success":
        return (
          <Modal
            {...modalProps}
            title="Added to Watchlist"
            icon={{
              color: "text-green-600",
              bgColor: "bg-green-100",
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ),
            }}
            actions={
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                onClick={handleCloseModal}
              >
                Close
              </button>
            }
          >
            <p className="text-sm">
              &quot;{selectedMovie.title}&quot; has been added to your watchlist.
            </p>
          </Modal>
        );

      case "error":
        return (
          <Modal
            {...modalProps}
            title="Error"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ),
            }}
            actions={
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                onClick={handleCloseModal}
              >
                Close
              </button>
            }
          >
            <p className="text-sm">
              Failed to add movie to watchlist. Please try again.
            </p>
          </Modal>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Recommendations
      </h2>
      <div className="mb-4">
        <button
          onClick={handleFineTuneClick}
          className={`px-4 py-2 rounded-md mr-2 transition-colors ${
            showFineTune
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          For You
        </button>
        <button
          onClick={handleShowPopularClick}
          className={`px-4 py-2 rounded-md transition-colors ${
            !showFineTune
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          Show Popular Movies
        </button>
      </div>

      {showFineTune ? (
        <MoviePreferencesSurvey
          onMovieSelect={handleMovieSelect}
        />
      ) : (
        <PopularMovies
          initialPage={1}
          onMovieSelect={handleMovieSelect}
          className="my-8"
        />
      )}
      {renderModal()}
    </div>
  );
};

export default Recommendations;
