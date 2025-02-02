import {useEffect, useState,useCallback} from 'react'
import Box from '../components/Box'
import Loader from '../components/Loader.jsx'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function SearchPage() {
const {query} = useParams()
const [response,setResponse] = useState([])


useEffect(()=>{
  (async ()=>{
    const res = await axios.get(`/videos/searchVideos/?searchQuery=${query}`)
    console.log(response)
    setResponse(res.data.data)
  })()
  
},[query])

if ( response.length<=0) return (<Loader/>)             

  return (
    <>

    <div className=' w-screen 
    flex flex-wrap p-6 gap-6
    '>

  {response?.map((data)=>(
   <Box key={data._id}
   coverImg={data?.templateImg}
   title = {data?.title}
   type={data?.type}
   quality={data?.quality}
   timeframe={data?.timeframe}
   />
    )
  )}
   
  </div>
    </>
  )
}

export default SearchPage