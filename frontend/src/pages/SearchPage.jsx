import {useState} from 'react'
import {useSelector} from "react-redux"
import Box from '../components/Box'
import Loader from '../components/Loader.jsx'

function SearchPage() {
    const selector = useSelector(state =>state.searchResults)
    console.log(selector)

    if(!selector || selector.length==0) return (<Loader/>)
  return (
    <>

    <div className=' w-screen 
    flex flex-wrap p-6 gap-6
    '>

  {selector?.map((data)=>(
    <Box key={data._id || Date.now()}
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

export default SearchPage