import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstant";
import { useRef, useState } from "react";
import { callApi } from "../utils/api";
import { fetchTmdb } from "../utils/tmdb";
import { addGptMoiveResult } from "../utils/gptSlice";
import { SparkleIcon } from "./Icons";

// Asks our server (api/gpt.js) for movie names; the Gemini key stays there.
const getGptMovies = async (query) => {
  const { movies } = await callApi("/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return movies;
};

const searchMovieTMDB = (movie) =>
  fetchTmdb(
    "/search/movie?query=" +
      encodeURIComponent(movie) +
      "&include_adult=false&language=en-US&page=1"
  );

const GptSearchBar = () => {
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleGptSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const gptMovies = await getGptMovies(query);
      if (!gptMovies?.length) throw new Error("No movie suggestions returned");

      const tmdbResults = await Promise.all(gptMovies.map(searchMovieTMDB));
      dispatch(addGptMoiveResult({ movieName: gptMovies, movieResults: tmdbResults }));
    } catch (error) {
      console.error(error);
      setErrorMessage(lang[langKey].gptSearchError);
    } finally {
      setIsLoading(false);
    }
  };

  const text = lang[langKey];

  const tryExample = (example) => {
    searchText.current.value = example;
    handleGptSearchClick();
  };

  return (
    <section className="animate-fade-up mx-auto max-w-3xl px-4 text-center">
      <p className="inline-flex items-center gap-2 rounded-full bg-surface/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent ring-1 ring-line">
        <SparkleIcon className="h-3.5 w-3.5" /> Gemini
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-wide text-fg md:text-7xl">
        {text.gptHeading}
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-muted md:text-lg">{text.gptSubheading}</p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="group mt-8 flex items-center gap-2 rounded-2xl bg-surface/80 p-2 shadow-[0_20px_60px_-25px_var(--accent)] ring-1 ring-line backdrop-blur-xl transition focus-within:ring-2 focus-within:ring-accent"
      >
        <SparkleIcon className="ml-3 hidden h-5 w-5 shrink-0 text-accent sm:block" />
        <input
          type="text"
          ref={searchText}
          maxLength={200}
          className="min-w-0 flex-1 bg-transparent px-2 py-3 text-fg outline-none placeholder:text-muted md:text-lg"
          placeholder={text.gptSearchPlaceholder}
          aria-label={text.gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          disabled={isLoading}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-accent to-accent-2 px-5 py-3 font-bold text-accent-fg transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60 md:px-7"
        >
          {isLoading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-fg/30 border-t-accent-fg" />
          )}
          {isLoading ? text.searching : text.search}
        </button>
      </form>

      {errorMessage && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger ring-1 ring-danger/30"
        >
          {errorMessage}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-muted">{text.gptTry}:</span>
        {text.gptExamples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => tryExample(example)}
            disabled={isLoading}
            className="cursor-pointer rounded-full bg-surface/70 px-3 py-1.5 text-sm text-fg/90 ring-1 ring-line transition hover:text-accent hover:ring-accent/60 disabled:opacity-50"
          >
            {example}
          </button>
        ))}
      </div>
    </section>
  );
};

export default GptSearchBar;
