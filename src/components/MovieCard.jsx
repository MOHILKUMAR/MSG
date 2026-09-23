import React from "react";
import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../utils/constant";
import { showMovieModal } from "../utils/moviesSlice";

const MovieCard = ({ movieId, posterPath, title }) => {
  const dispatch = useDispatch();

  if(!posterPath) return null;

  return (
    <button
      className="w-36 md:w-48 pr-4 cursor-pointer hover:scale-105 transition-transform"
      onClick={() => dispatch(showMovieModal({ movieId, mode: "info" }))}
    >

        <img src={IMG_CDN_URL + posterPath} alt={title} />

    </button>
  );
};

export default MovieCard;
