import {useState} from 'react'
import {useNavigate} from "react-router-dom"


function Navbar() {
  const [searchData,setSearchData] = useState("")
  const navigate = useNavigate()

  async function searchParams(){
    navigate(`/searchResults/${searchData}`)
  }

  return (
    <div className ="px-10 max-w-screen 
    text-xl font-semibold bg-[#151515] text-[#D63484] backdrop-blur-md
    h-16 items-center  flex justify-between">
        <p>CONTENT HAVEN</p>

<div className='flex'>
        <ul className='flex w-48 justify-evenly'>
            <li>HOME</li>
            <li>MOVIES</li>
            {/* <li>&#128269;</li> */}
        </ul>
        <form onSubmit={(e)=>{
      e.preventDefault()
      searchParams()
    }}>
            <input type="text" name="" onChange={e=>setSearchData(e.target.value)}
            value={searchData}
            id="" className='bg-[#31304D] rounded-md w-60 outline-0 px-1'/>
            <button>&#128269;</button>
            <p></p>
        </form>
</div>

    </div>
  )
}

export default Navbar