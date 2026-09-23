import React from 'react'
import { useDispatch } from 'react-redux'
import { showMovieModal } from '../utils/moviesSlice'
import { InfoIcon, PlayIcon } from './Icons'

const VideoTitle = ({title, overview, movieId}) => {
  const dispatch = useDispatch();

  return (
    // Mobile: sits under the video. Desktop: overlays the left side of the video.
    <div className='relative z-10 -mt-6 px-4 md:absolute md:inset-y-0 md:left-0 md:mt-0 md:flex md:max-w-2xl md:flex-col md:justify-center md:px-12 md:pb-24 lg:max-w-3xl lg:px-16'>
        <span className='animate-fade-up inline-flex w-fit items-center gap-2 rounded-full bg-surface/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent ring-1 ring-line backdrop-blur'>
          <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-accent' />
          Now Playing
        </span>
        <h1 className='animate-fade-up mt-3 font-display text-4xl leading-[0.95] tracking-wide text-fg drop-shadow-lg md:text-6xl lg:text-7xl'>{title}</h1>
        <p className='animate-fade-up mt-4 hidden text-base leading-relaxed text-fg/80 md:line-clamp-3 lg:text-lg'>{overview}</p>
        <div className='animate-fade-up mt-5 flex gap-3'>
            <button
              onClick={() => dispatch(showMovieModal({ movieId, mode: "trailer" }))}
              className='flex cursor-pointer items-center gap-2 rounded-full bg-fg px-6 py-2.5 font-semibold text-canvas shadow-lg transition hover:scale-[1.03] hover:bg-fg/90 md:px-8 md:py-3 md:text-lg'
            >
              <PlayIcon className='h-5 w-5' /> Play
            </button>
            <button
              onClick={() => dispatch(showMovieModal({ movieId, mode: "info" }))}
              className='flex cursor-pointer items-center gap-2 rounded-full bg-surface/60 px-6 py-2.5 font-semibold text-fg ring-1 ring-line backdrop-blur transition hover:ring-accent/70 md:px-8 md:py-3 md:text-lg'
            >
              <InfoIcon className='h-5 w-5' /> More Info
            </button>
        </div>
    </div>
  )
}

export default VideoTitle
