import  {app}  from "./app.js";
import dotenv from "dotenv"
import { dbConnect } from "./db/db.js";


dotenv.config({
    path:"./.env"
})

dbConnect().then(()=>{
    app.listen(8000 ,()=>{
        console.log("===========>Listening on post 8000")
    })
}).catch((error)=>{
    console.log(error)
})
