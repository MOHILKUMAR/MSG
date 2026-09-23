import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useMovieList from "../hooks/useMovieList";
import GptSearch from "./GptSearch";
import MovieModal from "./MovieModal";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useMovieList("nowPlayingMovies");
  useMovieList("popularMovies");
  useMovieList("topRatedMovies");
  useMovieList("horrorMovies");
  useMovieList("indianMovies");
  useMovieList("hollywoodMovies");
  return (
    <div>
      <Header />
      {showGptSearch ? (
       <GptSearch />
      ) : (
        <>
          {" "}
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
      <MovieModal />
    </div>
  );
};

export default Browse;
