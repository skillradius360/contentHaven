import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,createRoutesFromChildren,Route,
  RouterProvider } from "react-router-dom"
 import Home from './pages/Home.jsx'
 import Root from './pages/root.jsx'
 import Landing from './pages/Landing.jsx'

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Root/>}>
      <Route path="" element={<Landing/>}/>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(

    <RouterProvider router={router}/>

)
