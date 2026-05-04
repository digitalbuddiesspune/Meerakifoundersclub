import express from "express";
import {
  createServiceDetails,
  deleteServiceDetailsByServiceId,
  getServiceDetailsByServiceId,
  getUserIntakeSubmission,
  submitUserServiceIntake,
  upsertServiceDetailsByServiceId,
} from "../controllers/serviceDetailsController.js";

const serviceDetailsRouter = express.Router();

serviceDetailsRouter.get("/service-details/service/:serviceId/user-intake/:userId", getUserIntakeSubmission);
serviceDetailsRouter.post("/service-details/service/:serviceId/user-intake", submitUserServiceIntake);
serviceDetailsRouter.get("/service-details/service/:serviceId", getServiceDetailsByServiceId);
serviceDetailsRouter.post("/service-details", createServiceDetails);
serviceDetailsRouter.put("/service-details/service/:serviceId", upsertServiceDetailsByServiceId);
serviceDetailsRouter.delete("/service-details/service/:serviceId", deleteServiceDetailsByServiceId);

export default serviceDetailsRouter;
