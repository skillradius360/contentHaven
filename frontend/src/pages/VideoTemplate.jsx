import React from 'react'
import Button from '../components/Button'

function VideoTemplate() {
  return (
    <>
    <div className='flex flex-col items-center m-3 gap-3 wrap'>
        <div  className='w-full h-[70vh] rounded-md bg-black  relative inset-0 flex justify-center items-center'>
       
          <img
          className='rounded-xl h-full w-full z-0 absolute '
           src="https://images.pexels.com/photos/13471556/pexels-photo-13471556.jpeg" alt="" />
        </div>

    <div className="bg-[#D63484] rounded-lg shadow-md p-4 flex  mx-auto w-[100%]  wrap">
      {/* Left: Movie Poster */}
    

      {/* Right: Movie Details */}
      <div className="w-3/4 pl-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-white">Kraven the Hunter</h2>
         <Button/>
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <button className="bg-white px-3 py-1 rounded">Trailer</button>
          <button className="bg-white px-3 py-1 rounded">HD</button>
          <span className="text-yellow-500 font-semibold">IMDB: 5.4</span>
        </div>

        <p className="text-white mt-2">
          Kraven Kravinoff’s complex relationship with his ruthless gangster
          father, Nikolai, starts him down a path of vengeance with brutal
          consequences, motivating him to become not only the greatest hunter in
          the world, but also one of its most feared.
        </p>

        <div className="text-white mt-2">
          <p>
            <strong>Released:</strong> 2024-12-11
          </p>
          <p>
            <strong>Genre:</strong> Action, Adventure, Thriller
          </p>
          <p>
            <strong>Duration:</strong> 127 min
          </p>
          <p>
            <strong>Country:</strong> United States of America
          </p>
          <p>
            <strong>Production:</strong> Columbia Pictures, Matt Tolmach
            Productions, Arad Productions
          </p>
        </div>

        <div className="mt-2 flex items-center">
          <span className="text-blue-600 font-semibold mr-2">10</span>
          <span>/ 1 voted</span>
        </div>

        <div className="mt-2 flex space-x-2">
          <button className="bg-blue-600 text-white px-3 py-1 rounded">Like</button>
          <button className="bg-gray-400 text-white px-3 py-1 rounded">Dislike</button>
        </div>
      </div>
    </div>


    </div>
    </>
  )
}

export default VideoTemplate