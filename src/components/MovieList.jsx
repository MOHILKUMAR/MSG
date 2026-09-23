import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const arrowClass =
  "absolute inset-y-2 z-10 hidden w-14 cursor-pointer items-center justify-center text-fg opacity-0 transition group-hover/row:opacity-100 hover:text-accent md:flex";

// movies: null = still loading (shows placeholders), [] or undefined = nothing to show.
const MovieList = ({ id, title, movies }) => {
  const scroller = useRef(null);

  if (movies !== null && !movies?.length) return null;

  const scroll = (direction) =>
    scroller.current?.scrollBy({
      left: direction * scroller.current.clientWidth * 0.8,
      behavior: "smooth",
    });

  return (
    <section id={id} className="group/row relative scroll-mt-24 py-3 md:py-4">
      <h2 className="mb-2 flex items-center gap-3 px-4 font-display text-2xl tracking-wide text-fg md:px-12 md:text-3xl">
        <span className="h-6 w-1.5 rounded-full bg-linear-to-b from-accent to-accent-2" />
        {title}
      </h2>
      <div className="relative">
        <button
          className={arrowClass + " left-0 bg-linear-to-r from-canvas to-transparent"}
          onClick={() => scroll(-1)}
          aria-label={"Scroll " + title + " left"}
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>
        <div
          ref={scroller}
          className="no-scrollbar flex snap-x gap-3 overflow-x-auto scroll-px-4 px-4 py-2 md:scroll-px-12 md:gap-4 md:px-12"
        >
          {movies === null
            ? Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="skeleton aspect-[2/3] w-32 shrink-0 rounded-xl md:w-44"
                />
              ))
            : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
        <button
          className={arrowClass + " right-0 bg-linear-to-l from-canvas to-transparent"}
          onClick={() => scroll(1)}
          aria-label={"Scroll " + title + " right"}
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};

export default MovieList;
