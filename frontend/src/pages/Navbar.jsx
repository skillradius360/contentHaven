import React from 'react'

function Navbar() {
  return (
    <div className ="px-10 max-w-screen 
    text-xl font-semibold bg-[#151515] bg-opacity-100	 text-[#D63484] backdrop-blur-md
    h-16 items-center  flex justify-between">
        <p>CONTENT HAVEN</p>

<div className='flex'>
        <ul className='flex w-48 justify-evenly'>
            <li>HOME</li>
            <li>MOVIES</li>
            {/* <li>&#128269;</li> */}
        </ul>
        <form action="">
            <input type="text" name="" 
            id="" className='bg-[#31304D] rounded-md w-60 outline-0 px-1'/>
            <button>&#128269;</button>
            <p></p>
        </form>
</div>

    </div>
  )
}

export default Navbar