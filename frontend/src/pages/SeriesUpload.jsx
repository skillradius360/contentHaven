import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function SeriesUpload() {
    const { register, handleSubmit,reset } = useForm();

    const [isAvailable,setIsAvailable] = useState(true)
    const [episodeInjector, setEpisodeInjector] = useState([]);

    const [seriesData, setSeriesData] = useState({}); // for episode posting
    const [seriesId,setSeriesId] = useState(null)

    const [WebSeriesData, setWebSeriesData] = useState({});// for main series posting

    function formInjector() {
        setEpisodeInjector(prev => [...prev, { id: Date.now() }]);
    }

    async function seriesPoster() {
        const res = await axios.post("/videos/addAShow", WebSeriesData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        });
        setSeriesId(res?.data.data._id)
        res.data.data?setIsAvailable(false):setIsAvailable(true)
        console.log(res);
    }


    async function episodePoster(seriesID){
        console.log(seriesID)
        const res= await axios.post(`/videos/addAEpisode/${seriesID}`,{...seriesData},{
            withCredentials:true,
            headers:{"Content-Type":'multipart/form-data'}
        }) 
        console.log(res)
    }

    return (
        <>
        <h1 className="text-center my-4 text-3xl text-white">Upload TV Content</h1>
        <div className=" w-[99.9%] flex justify-center items-center ">
            <div className="min-w-[60vw] p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-white text-xl font-semibold mb-4">Upload a Web Series</h2>
                <form className="flex flex-col gap-4"
                    onSubmit={handleSubmit((data) => {
                        setWebSeriesData(data);
                        seriesPoster();
                        reset()
                    })}
                >
                    <input type="text" {...register("title")} placeholder="Title"  required className="p-2 border border-gray-600 rounded bg-gray-700 text-white" />
                    <input type="text" {...register("episodesCount")} placeholder="Episodes Count" required  className="p-2 border border-gray-600 rounded bg-gray-700 text-white" />
                    <input type="text" {...register("country")} placeholder="Country"  required className="p-2 border border-gray-600 rounded bg-gray-700 text-white" />
                    <input type="text" {...register("quality")} placeholder="Quality"  required className="p-2 border border-gray-600 rounded bg-gray-700 text-white" />
                    <button type="submit" required  className="p-2 bg-[#FFCC00] hover:bg-green-600 ease-in-out text-white rounded">Upload</button>
                </form>

                <button onClick={formInjector} 
                disabled={isAvailable}
                className="mt-4 p-2 bg-green-500 hover:bg-green-600 text-white rounded">Add Episode</button>
                
                <div className="mt-4">
                    {episodeInjector.map((data,index) => (
                        <form key={data.id} 
                        onSubmit={handleSubmit((data)=>{
                            console.log(data)
                            setSeriesData(data)
                            episodePoster(seriesId)
                        })
                        }
                        className="mt-2 flex flex-col gap-2 bg-gray-700 p-4 rounded text-white">{index+1}.
                            <input type="text" {...register("title")} placeholder="Episode Title" className="p-2 border border-gray-600 rounded bg-gray-800 text-white" />
                            <input type="text" {...register("seasonNo")} placeholder="Season No" className="p-2 border border-gray-600 rounded bg-gray-800 text-white" />
                            <input type="file" {...register("videoFile")} className="p-2 border border-gray-600 rounded bg-gray-800 text-white" />
                            <button className="p-2 bg-[#D63484] hover:bg-purple-600 text-white rounded">Post</button>
                        </form>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export { SeriesUpload };
