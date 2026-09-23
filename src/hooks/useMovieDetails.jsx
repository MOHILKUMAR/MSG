import { useEffect, useState } from "react";
import { fetchTmdb } from "../utils/tmdb";

// Details, cast, videos and where-to-watch for one movie in a single TMDB call.
const useMovieDetails = (movieId) => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    let ignore = false; // drop the response if another movie was opened meanwhile
    setDetails(null);
    setError(null);
    fetchTmdb(
      "/movie/" +
        movieId +
        "?language=en-US&append_to_response=credits,videos,watch/providers"
    )
      .then((json) => {
        if (!ignore) setDetails(json);
      })
      .catch((err) => {
        console.error(err);
        if (!ignore) setError(err);
      });
    return () => {
      ignore = true;
    };
  }, [movieId]);

  return { details, error };
};

export default useMovieDetails;
