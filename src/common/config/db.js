import mongoose from "mongoose";

const dbConnect = async () =>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Successfully connected to DB ${conn}`)
}

export default dbConnect