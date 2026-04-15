import express from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  loginUser,
  updateUserById,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/get-users", getUsers);
userRouter.post("/create-user", createUser);
userRouter.post("/login-user", loginUser);
userRouter.get("/get-user/:id", getUserById);
userRouter.put("/update-user/:id", updateUserById);
userRouter.delete("/delete-user/:id", deleteUserById);

export default userRouter;