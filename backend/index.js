import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const PORT = process.env.PORT 

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/v1", userRoutes);
app.use("/api/v1", serviceRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

