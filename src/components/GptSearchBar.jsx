import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstant";
import { useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { API_OPTIONS, GEMINI_KEY } from "../utils/constant";
import { addGptMoiveResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = data.json();

    return json;
  };

  const handleGptSearchClick = async () => {
    // console.log(searchText.current.value);

    //make and api call to gpt api and get movies results
    const Query =
      "Act as a Movie Recommendations system and suggest some movies for the query" +
      searchText.current.value +
      "only give me the names of 5 movies, comma seperated like the example results given ahead. Example Result:Gadar, Sholay, Don, ghost 3Idoit";

    // gemini API Calls
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: Query,
    });

    // Store data into the array.
    const geminiMovie = response.text.split(", ");

    const promiseArray = geminiMovie.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    
    // console.log(tmdbResults);
    dispatch(addGptMoiveResult({movieName: geminiMovie, movieResults:tmdbResults}));
    // console.log(promiseArray);
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
          className="col-span-3 py-2 m-2 px-4 bg-red-700 text-white rounded-lg"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
