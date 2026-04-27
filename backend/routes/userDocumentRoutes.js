import express from "express";
import {
  addUserDocument,
  appendUserDocuments,
  deleteUserDocumentById,
  getUserDocuments,
  getUserDocumentsByUserId,
} from "../controllers/userDocumentController.js";

const userDocumentRouter = express.Router();

userDocumentRouter.get("/user-documents", getUserDocuments);
userDocumentRouter.get("/user-documents/:userId", getUserDocumentsByUserId);
userDocumentRouter.post("/add-user-document", addUserDocument);
userDocumentRouter.put("/append-user-documents/:userId/:documentType", appendUserDocuments);
userDocumentRouter.delete("/delete-user-document/:id", deleteUserDocumentById);

export default userDocumentRouter;
