import express from "express";
import {
  addService,
  deleteServiceById,
  getServiceBySlug,
  getServices,
  updateServiceById,
} from "../controllers/serviceController.js";

const serviceRouter = express.Router();

serviceRouter.get("/services", getServices);
serviceRouter.get("/services/:slug", getServiceBySlug);
serviceRouter.post("/add-service", addService);
serviceRouter.put("/update-service/:id", updateServiceById);
serviceRouter.delete("/delete-service/:id", deleteServiceById);

export default serviceRouter;
