import mongoose  from "mongoose"
import { DB_NAME } from "../constants.js"
import {app} from  "../app.js"
async function dbConnect(){

  const connection= await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
  if(!connection){
      throw new Error("problem connecting to mongo DB")
  }
  console.log("connection established successfully with mongo at ",connection.connection.host)
}

export {dbConnect}