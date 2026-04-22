import { v2 as cloudinary } from "cloudinary";

const requiredCloudinaryVars = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const hasCloudinaryEnv = () =>
  requiredCloudinaryVars.every((key) => Boolean(process.env[key]));

export const uploadImage = async (req, res) => {
  try {
    if (!hasCloudinaryEnv()) {
      return res.status(500).json({
        message:
          "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend .env",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const { folder = "meraaki" } = req.body;
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder,
      resource_type: "image",
    });

    return res.status(201).json({
      message: "Image uploaded successfully.",
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Failed to upload image.",
    });
  }
};
