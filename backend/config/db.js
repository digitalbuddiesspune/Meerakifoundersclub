import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const dbURI = process.env.Mongo_URI;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}


export default connectDB;
