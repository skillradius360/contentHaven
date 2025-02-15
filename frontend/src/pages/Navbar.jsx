import {useState} from 'react'
import {useNavigate,Link} from "react-router-dom"
import search from "../assets/search.svg"

function Navbar() {
  const [searchData,setSearchData] = useState("")
  const navigate = useNavigate()

  async function searchParams(){
    navigate(`/searchResults/${searchData}`)
  }

  return (
    <div className ="px-10 max-w-screen 
    text-xl font-semibold bg-[#151515] text-[#f5c20a] backdrop-blur-xl
    
    h-16 items-center  flex justify-between">
        <Link to="/">CONTENT HAVEN</Link>

<div className='flex '>
        <ul className='flex w-48 justify-evenly '>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/Movies">Movies</Link>
          </li>
            
            {/* <li>&#128269;</li> */}
        </ul>
        <form onSubmit={(e)=>{
      e.preventDefault()
      searchParams()
    }}>
            <input type="text" name="" required

            onChange={e=>setSearchData(e.target.value)}
            value={searchData}
            id="" className='bg-[#31304D] rounded-md
            w-60 outline-0 px-1 border-2 border-[#f5c20a] border-solid'/>
            <button><img src={search} alt="" className='h-6 w-6 mx-2'/></button>
            <p></p>
        </form>
</div>

    </div>
  )
}

export default Navbar