import express from "express";
import {
  addPartner,
  deletePartnerById,
  getPartnerBySlug,
  getPartners,
  updatePartnerById,
} from "../controllers/partnerController.js";

const partnerRouter = express.Router();

partnerRouter.get("/partners", getPartners);
partnerRouter.get("/partners/:slug", getPartnerBySlug);
partnerRouter.post("/add-partner", addPartner);
partnerRouter.put("/update-partner/:id", updatePartnerById);
partnerRouter.delete("/delete-partner/:id", deletePartnerById);

export default partnerRouter;
