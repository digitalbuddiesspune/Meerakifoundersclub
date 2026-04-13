import express from "express";
import config from "./dbConfig.js/config.js";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Backend server is running" });
});

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
