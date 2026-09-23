import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstant";
import { useRef, useState } from "react";
import { GPT_API_URL } from "../utils/constant";
import { auth } from "../utils/fireBase";
import { fetchTmdb } from "../utils/tmdb";
import { addGptMoiveResult } from "../utils/gptSlice";

// Asks our server (api/gpt.js) for movie names; the Gemini key stays there.
const getGptMovies = async (query) => {
  const idToken = await auth.currentUser.getIdToken();
  const res = await fetch(GPT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + idToken,
    },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error("GPT search failed (" + res.status + ")");
  const { movies } = await res.json();
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

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-full md:w-1/2 shadow-black grid grid-cols-12 rounded-lg"
      >
        <input
          type="text"
          ref={searchText}
          className="p-4 m-2 rounded-lg col-span-9 bg-white"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          disabled={isLoading}
          className="col-span-3 py-2 m-2 px-4 bg-red-700 text-white rounded-lg disabled:opacity-50"
        >
          {isLoading ? lang[langKey].searching : lang[langKey].search}
        </button>
        {errorMessage && (
          <p className="col-span-12 mx-2 font-bold text-red-500">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;
