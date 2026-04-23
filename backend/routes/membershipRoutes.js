import express from "express";
import {
  addMembership,
  deleteMembershipById,
  getMemberships,
  updateMembershipById,
} from "../controllers/membershipController.js";

const membershipRouter = express.Router();

membershipRouter.get("/memberships", getMemberships);
membershipRouter.post("/add-membership", addMembership);
membershipRouter.put("/update-membership/:id", updateMembershipById);
membershipRouter.delete("/delete-membership/:id", deleteMembershipById);

export default membershipRouter;
