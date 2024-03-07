import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // mongodb url + db name
        console.log(`\n MongoDB connected ! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
      console.log("mongoDB Connection error ", error)  
      process.exit(1) // to be read
    }
}

export default connectDB