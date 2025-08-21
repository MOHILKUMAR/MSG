import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black '>
        <h1 className='text-xl md:text-4xl font-bold' >{title}</h1>
        <p className='hidden md:inline-block  py-6 text-lg w-1/4'>{overview}</p>
        <div className='my-4 md:m-0'>
            <button className='bg-gray-500 py-1 px-4  md:py-4 md:px-12 md:text-xl text-white font-bold bg-opacity-50 rounded-lg '>Play</button>
            <button className=' hidden md:inline-block ml-2 bg-white border border-black-900 outline-2 py-4 px-10 text-xl font-bold  text-black bg-opacity-50 rounded-lg '> More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle