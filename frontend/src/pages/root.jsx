import { Outlet } from "react-router-dom";
import React from 'react'
import Navbar from "./Navbar.jsx";

function Root() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default Root