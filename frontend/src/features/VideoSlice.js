import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    searchResults:[
        {
cast: "steve jobs",
description: "image of a ladakh river\n",
releaseDate: "10",
templateImg: "http://res.cloudinary.com/dxlh2omhr/image/upload/v1738251960/u3g4zrt4bhw0thtbugrq.jpg",
title: "ladakh",
trailerLink: "asdadsad",
videoURI: "https://drive.google.com/file/d/1JDcYQe2NttmrqyC2NF7qBG_VrZH9iiMG/preview",
id: "679b9ec3b034ce0f91f6a87f"
        }
    ]
}

const videoSlice = createSlice({
    name:"videoSlice",
    initialState:initialState,
    reducers:{
        addSearchResults:function(state,action){
            state.searchResults.push(action.payload.searchResponse)
        }   
    },
    // removeSearchReducers:function(state,action){
    //     state.searchResults.re
    // }
})

export const {addSearchResults} = videoSlice.actions
export  default videoSlice.reducer