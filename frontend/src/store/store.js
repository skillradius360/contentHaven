import {configureStore} from "@reduxjs/toolkit"
import videoSlice from "../features/VideoSlice.js"

const movieStore = configureStore({
    reducer:videoSlice
})


export {movieStore}