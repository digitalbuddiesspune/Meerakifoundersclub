import express from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/get-users", getUsers);
userRouter.post("/create-user", createUser);
userRouter.get("/get-user/:id", getUserById);
userRouter.put("/update-user/:id", updateUserById);
userRouter.delete("/delete-user/:id", deleteUserById);

export default userRouter;