
import MovieList from './MovieList'
import {useSelector} from "react-redux"
import { MOVIE_ROWS } from '../utils/constant'

const SecondaryContainer = () => {

 const movies = useSelector((store)=> store.movies);

  return (
    // Pulls the first rows up over the hero's faded bottom edge on larger screens.
    <div className='relative z-20 pb-6 pt-6 md:-mt-28 md:pt-0 lg:-mt-40'>
      {MOVIE_ROWS.map(({ id, title }) => (
        <MovieList key={id} id={id} title={title} movies={movies[id]} />
      ))}
    </div>
  )
}

export default SecondaryContainer
