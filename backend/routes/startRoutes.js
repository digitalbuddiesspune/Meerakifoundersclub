import express from "express";
import {
  addStart,
  deleteStartById,
  getStarts,
  updateStartById,
} from "../controllers/startController.js";

const startRouter = express.Router();

startRouter.get("/starts", getStarts);
startRouter.post("/add-start", addStart);
startRouter.put("/update-start/:id", updateStartById);
startRouter.delete("/delete-start/:id", deleteStartById);

export default startRouter;
