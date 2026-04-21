import express from "express";
import {
  addOurClient,
  deleteOurClientById,
  getOurClients,
  updateOurClientById,
} from "../controllers/ourClientController.js";

const ourClientRouter = express.Router();

ourClientRouter.get("/our-clients", getOurClients);
ourClientRouter.post("/add-our-client", addOurClient);
ourClientRouter.put("/update-our-client/:id", updateOurClientById);
ourClientRouter.delete("/delete-our-client/:id", deleteOurClientById);

export default ourClientRouter;
