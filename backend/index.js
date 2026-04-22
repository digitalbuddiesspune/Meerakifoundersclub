import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import ourClientRoutes from "./routes/ourClientRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/v1", userRoutes);
app.use("/api/v1", serviceRoutes);
app.use("/api/v1", blogRoutes);
app.use("/api/v1", ourClientRoutes);
app.use("/api/v1", uploadRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

