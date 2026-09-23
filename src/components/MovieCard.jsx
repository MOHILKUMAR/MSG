import React from "react";
import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../utils/constant";
import { showMovieModal } from "../utils/moviesSlice";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  if (!movie.poster_path) return null;

  const facts = [
    movie.release_date?.slice(0, 4),
    movie.vote_average ? "★ " + movie.vote_average.toFixed(1) : null,
  ].filter(Boolean);

  return (
    <button
      className="group/card relative w-32 shrink-0 cursor-pointer snap-start overflow-hidden rounded-xl bg-surface-2 text-left ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_-14px_var(--accent)] hover:ring-accent/70 md:w-44"
      onClick={() => dispatch(showMovieModal({ movieId: movie.id, mode: "info" }))}
    >
      <img
        className="aspect-[2/3] w-full object-cover transition duration-500 group-hover/card:scale-105"
        src={IMG_CDN_URL + movie.poster_path}
        alt={movie.title}
        loading="lazy"
      />
      {/* Title + year + rating slide in on hover or keyboard focus */}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-3 pt-10 opacity-0 transition duration-300 group-hover/card:opacity-100 group-focus-visible/card:opacity-100">
        <p className="line-clamp-2 text-sm font-semibold text-white">{movie.title}</p>
        {facts.length > 0 && (
          <p className="mt-0.5 text-xs text-white/70">{facts.join(" · ")}</p>
        )}
      </div>
    </button>
  );
};

export default MovieCard;
