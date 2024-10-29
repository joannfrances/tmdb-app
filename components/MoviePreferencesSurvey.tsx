interface Genre {
  id: string;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

type Actor = Genre;

import React, { useEffect, useState } from "react";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.css";
import MovieCard from "./MovieCard";
import surveyJson from "../data/moviePreferencesSurvey.json";

const MoviePreferencesSurvey = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await fetch("/api/movieData");
      const data = await response.json();
      if (response.ok) {
        setGenres(data.genres);
      } else {
        console.error("Failed to fetch movie data:", data.error);
      }
    };

    fetchMovieData();
  }, []);

  const updatedSurveyJson = {
    ...surveyJson,
    pages: [
      {
        ...surveyJson.pages[0],
        elements: surveyJson.pages[0].elements.map((element) => {
          if (element.name === "genres") {
            return {
              ...element,
              choices: genres.map((genre) => ({
                value: genre.id,
                text: genre.name,
              })),
            };
          }
          return element;
        }),
      },
    ],
  };

  const onComplete = async (survey: { data: any }) => {
    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(survey.data),
    });

    const data = await response.json();
    if (response.ok) {
      setRecommendations(data);
    } else {
      console.error("Failed to fetch recommendations:", data.error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Survey json={updatedSurveyJson} onComplete={onComplete} />
      {recommendations?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Recommended Movies:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recommendations.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePreferencesSurvey;
