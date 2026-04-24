import express from "express";
import {
  createUser,
  createMembershipOrder,
  deleteUserById,
  getUserById,
  getUsers,
  loginUser,
  updateUserById,
  verifyMembershipPayment,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/get-users", getUsers);
userRouter.post("/create-user", createUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/create-membership-order", createMembershipOrder);
userRouter.post("/verify-membership-payment", verifyMembershipPayment);
userRouter.get("/get-user/:id", getUserById);
userRouter.put("/update-user/:id", updateUserById);
userRouter.delete("/delete-user/:id", deleteUserById);

export default userRouter;