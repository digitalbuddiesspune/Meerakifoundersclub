import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";

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

export default uploadRouter;
