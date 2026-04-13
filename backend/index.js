import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./dbConfig.js/config.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend server is running" });
});

const startServer = async () => {
  try {
    if (!config.mongoUri) {
      throw new Error("MongoDB connection URL missing in .env");
    }

    await mongoose.connect(config.mongoUri);
    console.log("MongoDB connected");

    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
