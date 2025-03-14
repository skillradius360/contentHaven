import {useEffect, useState} from 'react'
import Button from '../components/Button'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'

// THIS IS A PAGE FOR VIDEO TEMPLATE
function VideoTemplate() {

    const {videoId}= useParams()
const [res,setRes] = useState({})
  useEffect(()=>{
    (async()=>{
      const response = await axios.get(`/videos/getSingleVideo/${videoId}`)
      setRes(response.data.data)
      console.log(res)
    })()
  },[])
  
  if(Object.keys(res).length==0) return <Loader/>
  return (
    <>
    <div className='flex flex-col items-center m-3 gap-3 wrap'>
        <div  className='w-full h-[70vh] rounded-md bg-black  relative inset-0 flex justify-center items-center'>

          <img
          className='rounded-xl h-full w-full z-0 absolute '
          src={res.templateImg} alt="" />
        </div>

    <div className="bg-[#f5c20a] rounded-lg shadow-md p-4 flex  mx-auto w-[100%]  wrap">
      {/* Left: Movie Poster */}
    

      {/* Right: Movie Details */}
      <div className="w-3/4 pl-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-black">{res.title}</h2>
        <Button videoId={res._id} />
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <Link  to={res.trailerLink} className="bg-white px-3 py-1 
          rounded-md border-3
          border-black">Trailer</Link>

          <button className="bg-white px-3 py-1 rounded-md border-3
          border-black">HD</button>
          <span className="text-black font-semibold">IMDB: 5.4</span>
        </div>

        <p className="text-black mt-2">
          {res.description}
        </p>

        <div className="text-black mt-2">
          <p>
            <strong>{res.releaseDate}</strong> 2024-12-11
          </p>
          <p>
            <strong>Genre:</strong> Action, Adventure, Thriller
          </p>
          <p>
            <strong>{res.duration}</strong> 127 min
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