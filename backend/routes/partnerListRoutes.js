import express from "express";
import {
  addPartnerList,
  deletePartnerListById,
  getPartnerList,
  updatePartnerListById,
} from "../controllers/partnerListController.js";

const partnerListRouter = express.Router();

partnerListRouter.get("/partner-list", getPartnerList);
partnerListRouter.post("/add-partner-list", addPartnerList);
partnerListRouter.put("/update-partner-list/:id", updatePartnerListById);
partnerListRouter.delete("/delete-partner-list/:id", deletePartnerListById);

export default partnerListRouter;
