import { useState} from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from "react-redux"
import {addSearchResults,flushSearchReducers} from "../features/VideoSlice.js"
import {useNavigate} from "react-router-dom"

function Landing() {
const [searchData,setSearchData] = useState("")
const [searchRes,setSearchRes] = useState([])
const dispatcher =useDispatch()
const navigate = useNavigate()

async function searchParams(){
  const res = await axios.get(`/videos/searchVideos/?searchQuery=${searchData}`)
  console.log(res.data.data)
  dispatcher(addSearchResults(res.data.data))
  setSearchRes(res?.data?.data)
  navigate("/searchResults")
}
if(!searchRes) return (<div> Loading ....</div>)

  return (

    <div className='w-screen h-[94.5vh] 
    bg-[url(/landing.jpg)] bg-cover bg-center
    bg-black opacity-55 flex items-center justify-center'>
    
    <form onSubmit={(e)=>{
      e.preventDefault()
      searchParams()
    }}
    className='w-[70%] h-1/13 flex gap-3
    items-center justify-center text-white 
    text-3xl rounded-xl opacity-75'>

    <input type="text" name="" id="" onChange={e=>setSearchData(e.target.value )}
    value={searchData}
    className='w-[95%] h-[80%] 
    border-white border-4 rounded-xl outline-none px-1 bg-black'
    placeholder=' Search Here. . . . !'/>

    <button type="submit"
    className='h-17 w-17 bg-black rounded-md
    border-white border-4'>&#128269;</button>

    </form>

    
    </div>
  )
}

export default Landing