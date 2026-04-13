import dotenv from "dotenv";

dotenv.config();

const config = {
  port: Number(process.env.PORT) ,
  mongoUri:
    process.env.Mongo_URI || process.env.MONGO_URI || process.env.MONGODB_URL,
};

export default config;
