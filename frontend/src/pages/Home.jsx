import React,{useEffect, useState} from 'react'
import Box from '../components/Box.jsx'
import axios from "axios"


function Home() {

  const [Response,setResponse] = useState([])

  useEffect(()=>{
   ( async()=>{
      const response = await axios.get("/videos/allVideos/?pageNo=0",)
      setResponse(response.data?.data)
      console.log(response.data.data)
    })()
  },[])

  if(!Response) return (<><p>Loading</p></>)

  return (
    <>

    <div className=' w-screen 
     flex flex-wrap p-6 gap-6
      
     '>

   {Response?.map((data)=>(
     <Box key={data._id}
     coverImg={data?.templateImg}
     title = {data?.title}
     description={data?.description}
     />
    )
  )}
   
  </div>
    </>
  )
}

export default Home