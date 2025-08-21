import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useSelector } from "react-redux";

const useMovieTrailer = (movieId) => {
  //fetch trailer video && UpDating the Store with trailer video data

  //   const [trailerId, setTrailerId] = useState(null);
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const dispatch = useDispatch();
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/"+movieId +"/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    const fillterData = json.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = fillterData.length ? fillterData[0] : json.results[0];

    // console.log(trailer);
    // setTrailerId(trailer.key)

    // here we use redux to store the trailervideo.
       dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
   !trailerVideo && getMovieVideos();
  }, []);
};

export default useMovieTrailer;
