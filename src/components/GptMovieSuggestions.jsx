import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import lang from "../utils/languageConstant";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const langKey = useSelector((store) => store.config.lang);
  const { movieResults, movieName } = gpt;
  if (!movieName) return null;

  return (
    <section className="animate-fade-up mx-auto mt-14 max-w-[96rem]">
      <div className="mb-2 flex items-center gap-4 px-4 md:px-12">
        <h2 className="font-display text-3xl tracking-wide text-fg md:text-4xl">
          {lang[langKey].gptResultsTitle}
        </h2>
        <span className="h-px flex-1 bg-linear-to-r from-line to-transparent" />
      </div>
      {movieName.map((movie, index) => (
        <MovieList
          key={movie}
          title={movie}
          movies={movieResults[index]?.results}
        />
      ))}
    </section>
  );
};

export default GptMovieSuggestions;
