import express from "express";
import multer from "multer";
import { uploadImage, uploadUserDocument } from "../controllers/uploadController.js";

const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype?.startsWith("image/")) {
      cb(null, true);
      return;
    }
    cb(new Error("Only image files are allowed."));
  },
});

const uploadDocument = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error("Only JPG, PNG, WEBP, PDF, DOC and DOCX files are allowed."));
  },
});

uploadRouter.post("/uploads/image", (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({ message: "Image too large. Max size is 20MB." });
      return;
    }

    res.status(400).json({ message: error.message || "Invalid upload request." });
  });
}, uploadImage);

uploadRouter.post("/uploads/user-document", (req, res, next) => {
  uploadDocument.single("document")(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({ message: "Document too large. Max size is 2MB." });
      return;
    }

    res.status(400).json({ message: error.message || "Invalid document upload request." });
  });
}, uploadUserDocument);

export default uploadRouter;
