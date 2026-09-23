import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";


const VideoBackground = ({ movieId }) => {

const trailerVideo = useSelector(store => store.movies?.trailerVideo);
 useMovieTrailer(movieId);
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-canvas">
      {/* Only embed once the trailer key is known (avoids loading embed/undefined).
          Scaled up so YouTube's title bar and edges are cropped away. */}
      {trailerVideo?.key && (
        <iframe
          className="pointer-events-none absolute inset-0 h-full w-full scale-[1.35]"
          src={
            "https://www.youtube.com/embed/" + trailerVideo.key +
            "?autoplay=1&mute=1&controls=0&loop=1&playlist=" + trailerVideo.key +
            "&rel=0&playsinline=1&modestbranding=1"
          }
          title="Trailer playing in the background"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
        ></iframe>
      )}
      {/* Fade the video into the page on every side the content touches */}
      <div className="absolute inset-0 bg-linear-to-t from-canvas via-canvas/10 to-canvas/40" />
      <div className="absolute inset-0 hidden bg-linear-to-r from-canvas via-canvas/50 to-transparent md:block" />
    </div>
  );
};

export default VideoBackground;
