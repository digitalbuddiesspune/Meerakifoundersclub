import express from "express";
import { createUser, getUsers } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/get-users", getUsers);
userRouter.post("/create-user", createUser);

export default userRouter;