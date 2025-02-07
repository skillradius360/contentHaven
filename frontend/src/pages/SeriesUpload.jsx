import React, { useState } from "react";
import axios from "axios"
import {useForm} from "react-hook-form"

function SeriesUpload(){
    const {register,handleSubmit} = useForm()
    // EPISODE PART
    const [episodeInjector,setEpisodeInjector] = useState([])
    const [epTitle,setEpTitle] = useState("")
    const [epFile,setEpFile] = useState(null)
    const [seriesEpResponse,setSeriesEpResponse] = useState({})

    
    // WEB SERIES PART
    const [title,setTitle]= useState("")
    const [episodesCount,setEpisodesCount]= useState("")
    const [country,setCountry]= useState("")
    const [quality,setQuality]= useState("")
    const [video,setVideo]= useState(null)
    const [seriesResponse,setSeriesResponse] = useState({})


function formInjector(e){
    setEpisodeInjector((prev=>[...prev,{id:Date.now()}]))
}

async function episodePoster(seriesId){
    const res= await axios.post(`/addAEpisode/${seriesId}`)
}

async function seriesPoster(){
    const res= await axios.post("/addAShow")
}

    return (
        <>
        <div>

            <div> 
                {/* {title,episodesCount,country,quality,video} */}
                <form onSubmit={
                        handleSubmit((data)=>console.log(data))
                }>
                    <input type="text" {...register("title")} onChange={e=>setTitle(e.target.value)} className="h-10 border-2 border-red-500 border-solid"/>
                    <input type="text" {...register("episodesCount")} onChange={e=>setEpisodesCount(e.target.value)} className="h-10 border-2 border-red-500 border-solid"/>
                    <input type="text" {...register("country")} onChange={e=>setCountry(e.target.value)} className="h-10 border-2 border-red-500 border-solid"/>
                    <input type="text" {...register("quality")} onChange={e=>setQuality(e.target.value)} className="h-10 border-2 border-red-500 border-solid"/>
                    <input type="file" {...register("video")} onChange={e=>setVideo(e.target.value)} className="h-10 border-2 border-red-500 border-solid"/>
                    <button type="submit" className="h-10 w-10 border-2 border-pink-500 border-solid"></button>
                </form>

            </div>

            <button onClick={e=>formInjector(e)} className="">asdASD</button>
            <div >
            {episodeInjector?.map((data)=>(
                <form key={data.id}>
                    <input type="text" onChange={e=>setEpTitle(e.target.value)}/>
                    <input type="file" onChange={e=>setEpTitle(e.target.files)} />
                    <button >POST</button>
                    </form>
            )
            )}
            </div>

        </div>
        </>
    )
}

export {SeriesUpload}