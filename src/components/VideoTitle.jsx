import React from 'react'
import { useDispatch } from 'react-redux'
import { showMovieModal } from '../utils/moviesSlice'

const VideoTitle = ({title, overview, movieId}) => {
  const dispatch = useDispatch();

  return (
    <div className='w-full aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black '>
        <h1 className='text-xl md:text-4xl font-bold' >{title}</h1>
        <p className='hidden md:inline-block  py-6 text-lg w-1/4'>{overview}</p>
        <div className='my-4 md:m-0'>
            <button
              onClick={() => dispatch(showMovieModal({ movieId, mode: "trailer" }))}
              className='bg-gray-500/50 py-1 px-4  md:py-4 md:px-12 md:text-xl text-white font-bold rounded-lg cursor-pointer hover:bg-gray-500/80'
            >▶ Play</button>
            <button
              onClick={() => dispatch(showMovieModal({ movieId, mode: "info" }))}
              className=' hidden md:inline-block ml-2 bg-white/50 border border-black outline-2 py-4 px-10 text-xl font-bold  text-black rounded-lg cursor-pointer hover:bg-white/80'
            > More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle
