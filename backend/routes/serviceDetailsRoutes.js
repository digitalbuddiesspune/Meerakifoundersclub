import express from "express";
import {
  createServiceDetails,
  deleteServiceDetailsByServiceId,
  getAllServiceInquiries,
  getServiceInquiryById,
  getServiceDetailsByServiceId,
  getUserIntakeSubmission,
  submitUserServiceIntake,
  updateServiceInquiryProgressStatus,
  upsertServiceDetailsByServiceId,
} from "../controllers/serviceDetailsController.js";

const serviceDetailsRouter = express.Router();

serviceDetailsRouter.get("/service-details/inquiries", getAllServiceInquiries);
serviceDetailsRouter.get("/service-details/inquiries/:id", getServiceInquiryById);
serviceDetailsRouter.put("/service-details/inquiries/:id/progress", updateServiceInquiryProgressStatus);
serviceDetailsRouter.get("/service-details/service/:serviceId/user-intake/:userId", getUserIntakeSubmission);
serviceDetailsRouter.post("/service-details/service/:serviceId/user-intake", submitUserServiceIntake);
serviceDetailsRouter.get("/service-details/service/:serviceId", getServiceDetailsByServiceId);
serviceDetailsRouter.post("/service-details", createServiceDetails);
serviceDetailsRouter.put("/service-details/service/:serviceId", upsertServiceDetailsByServiceId);
serviceDetailsRouter.delete("/service-details/service/:serviceId", deleteServiceDetailsByServiceId);

export default serviceDetailsRouter;
