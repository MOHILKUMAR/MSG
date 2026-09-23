import Header from "./Header";
import Footer from "./Footer";
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
    <div className="min-h-screen bg-canvas text-fg">
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <main>
          <MainContainer />
          <SecondaryContainer />
        </main>
      )}
      <Footer showExplore={!showGptSearch} />
      <MovieModal />
    </div>
  );
};

export default Browse;
