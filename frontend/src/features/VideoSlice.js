import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    searchResults:[
        
    ]
}

const videoSlice = createSlice({
    name:"videoSlice",
    initialState:initialState,
    reducers:{
        addSearchResults:function(state,action){
            state.searchResults=action.payload
        }   
    },
    flushSearchReducers:function(state){
        state.searchResults=[]
    }
})

export const {addSearchResults,flushSearchReducers} = videoSlice.actions
export  default videoSlice.reducer