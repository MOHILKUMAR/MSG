
import MovieList from './MovieList'
import {useSelector} from "react-redux"

const SecondaryContainer = () => {

 const movies = useSelector((store)=> store.movies);

  return (
    <div className="bg-black w-full">
        <div className='mt-0  md:-mt-52 pl-4 md:pl-12 relative z-20'>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Best Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Horror"} movies={movies.horrorMovies} />
        <MovieList title={"Indian"} movies={movies.indianMovies} />
        <MovieList title={"Hollywood"} movies={movies.hollywoodMovies} />
        </div>
    </div>
  )
}

export default SecondaryContainer
