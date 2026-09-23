import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovieList } from "../utils/moviesSlice";
import { MOVIE_LISTS } from "../utils/constant";
import { fetchTmdb } from "../utils/tmdb";

// Fetches one TMDB movie row (see MOVIE_LISTS) once and caches it in the store.
const useMovieList = (listName) => {
  const movies = useSelector((store) => store.movies[listName]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movies) return;
    fetchTmdb(MOVIE_LISTS[listName])
      .then((json) =>
        dispatch(addMovieList({ listName, movies: json.results ?? [] }))
      )
      .catch((error) => console.error(error));
  }, [movies, listName, dispatch]);
};

export default useMovieList;
