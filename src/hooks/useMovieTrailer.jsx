import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { fetchTmdb } from "../utils/tmdb";

const useMovieTrailer = (movieId) => {
  //fetch trailer video && UpDating the Store with trailer video data
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId || trailerVideo) return;
    fetchTmdb("/movie/" + movieId + "/videos?language=en-US")
      .then((json) => {
        const videos = json.results ?? [];
        const trailer =
          videos.find((video) => video.type === "Trailer") ?? videos[0];
        // here we use redux to store the trailervideo.
        if (trailer) dispatch(addTrailerVideo(trailer));
      })
      .catch((error) => console.error(error));
  }, [movieId, trailerVideo, dispatch]);
};

export default useMovieTrailer;
