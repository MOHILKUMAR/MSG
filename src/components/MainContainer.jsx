import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  // Placeholder with the hero's shape while the first row loads (or if it failed).
  if (!movies?.length) {
    return <div className="skeleton aspect-video w-full opacity-40" />;
  }

  const { title, overview, id } = movies[0];

  return (
    <section className="relative pt-16 md:pt-0">
      <VideoBackground movieId={id} />
      <VideoTitle title={title} overview={overview} movieId={id} />
    </section>
  );
};

export default MainContainer;
