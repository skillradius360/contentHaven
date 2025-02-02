import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,createRoutesFromChildren,Route,RouterProvider } from "react-router-dom"
import {Home,Landing,SearchPage} from "./pages/index.js"
import Root from "./pages/root.jsx"

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Root/>}>
      <Route path="" element={<Landing/>}/>
      <Route path="/searchResults/:query" element={<SearchPage/>}/>
      <Route path="/Home" element={<Home/>}/>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}/>

)
