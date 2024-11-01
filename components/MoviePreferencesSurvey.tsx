import React, { useState, useEffect } from "react";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "survey-core/defaultV2.css";
import "./surveyStyles.css";
import { themeJson } from "@/custom-survey/theme";
import MovieCard from "./MovieCard";
import surveyJson from "../data/moviePreferencesSurvey.json";
import Spinner from "./Spinner";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface MoviePreferencesSurveyProps {
  onMovieSelect?: (movie: Movie) => void;
  restartSurvey?: boolean;
}

const MoviePreferencesSurvey: React.FC<MoviePreferencesSurveyProps> = ({
  onMovieSelect,
}) => {
  const [model, setModel] = useState<Model>(new Model(surveyJson));
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isSurveyVisible, setIsSurveyVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    model.applyTheme(themeJson);
    model.css = { ...model.css, "randomize-selection": model.css.tagbox };
  }, [model]);

  useEffect(() => {
    const savedData = localStorage.getItem("surveyData");
    if (savedData) {
      setIsSurveyVisible(false);
      const parsedData = JSON.parse(savedData);
      fetchRecommendations(parsedData);
    }
  }, []);

  const fetchRecommendations = async (data: unknown) => {
    setIsLoading(true);
    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const recommendationsData = await response.json();

    setIsLoading(false);
    if (response.ok) {
      setRecommendations(recommendationsData);
    } else {
      console.error(
        "Failed to fetch recommendations:",
        recommendationsData.error
      );
    }
  };

  const onComplete = async () => {
    const surveyData = model.data;
    localStorage.setItem("surveyData", JSON.stringify(surveyData));
    fetchRecommendations(surveyData);
    setIsSurveyVisible(false);
  };

  const onRetry = (data?: unknown) => {
    const newModel = new Model(surveyJson);
    if (data) {
      newModel.data = data;
    }
    setModel(newModel);
  };

  const onDismiss = () => {
    setIsSurveyVisible(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div
        className="relative"
        style={{ display: `${isSurveyVisible && model ? "block" : "none"}` }}
      >
        <button
          className="absolute top-0 right-0 m-4 text-black font-bold py-2 px-4 rounded z-10"
          onClick={onDismiss}
        >
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
        </button>
        <Survey model={model} onComplete={onComplete} />
      </div>
      {!isSurveyVisible && (
        <div className="mt-2">
          <button
            onClick={() => {
              setIsSurveyVisible(true);
              const savedData = localStorage.getItem("surveyData");
              let surveyData = undefined;
              if (savedData) {
                surveyData = JSON.parse(savedData);
              }
              onRetry(surveyData);
            }}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md bg-white shadow-md "
          >
            Update Preferences
          </button>
        </div>
      )}
      {isLoading ? <Spinner /> : null}
      {recommendations?.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recommendations.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={onMovieSelect} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePreferencesSurvey;
