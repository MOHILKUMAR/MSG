import React from "react";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import { LOGIN_BG_URL } from "../utils/constant";

const GptSearch = () => {
  return (
    <>
      {" "}
      <div className="fixed -z-10 opacity-80">
        <img className="h-screen md:w-screen " alt="backgroundImage" src={LOGIN_BG_URL} />
      </div>
      <div className="">
        {/**1.Gpt seacrh bar
         *  2.Gpt Movie suggestions
         */}

        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearch;
