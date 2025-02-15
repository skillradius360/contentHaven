import React,{useEffect, useState} from 'react'
import Box from '../components/Box.jsx'
import axios from "axios"
import Loader from '../components/Loader.jsx'


function Home() {

  const [Response,setResponse] = useState([])

  useEffect(()=>{
   ( async()=>{
      const response = await axios.get("/videos/allVideos/?pageNo=0",)
      setResponse(response.data?.data)
      console.log(response.data.data)
    })()
  },[])

  if(!Response || Object.keys(Response).length==0) return <Loader/>

  return (
    <>

    <div className=' w-screen 
     flex flex-wrap p-6 gap-6
      
     '>

   {Response?.map((data)=>(
     <Box key={data._id}
     id={data._id}
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

export default Home