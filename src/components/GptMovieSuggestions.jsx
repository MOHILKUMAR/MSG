import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieName } = gpt;
  if (!movieName) return null;
    
  //  console.log(movieResults[0].results);
  //  console.log(movieName[0]);
  
  return (
    <div className="p-4 m-4 bg-black opacity-75 text-white">
      <div>
        { movieName.map((movie, index) => (
           <MovieList
            key={movie}
            title={movie}
            movies={movieResults[index]?.results}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
