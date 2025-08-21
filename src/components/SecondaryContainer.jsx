
import MovieList from './MovieList'
import {useSelector} from "react-redux"

const SecondaryContainer = () => {
 
 const movies = useSelector((store)=> store.movies);
 
//  console.log(movies.nowPlayingMovies);
  return (
    <div className="bg-black w-screen">
        <div className='mt-0  md:-mt-52 pl-4 md:pl-12 relative z-20'>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popurlar"} movies={movies.addPopularMovies} />
        <MovieList title={"Best Movies"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Horror"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Indian"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Hollybood"} movies={movies.nowPlayingMovies} />
        </div>
    </div>
  )
}

export default SecondaryContainer