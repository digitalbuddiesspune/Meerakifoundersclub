import { v2 as cloudinary } from "cloudinary";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const requiredCloudinaryVars = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const hasCloudinaryEnv = () =>
  requiredCloudinaryVars.every((key) => Boolean(process.env[key]));

let s3Client = null;

const requiredAwsVars = [
  "AWS_ACCESS_KEY_ID",
  "AWS_REGION",
  "AWS_S3_BUCKET_NAME",
];

const getAwsSecretKey = () =>
  process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS;

const hasAwsEnv = () =>
  requiredAwsVars.every((key) => Boolean(process.env[key])) && Boolean(getAwsSecretKey());

const getS3Client = () => {
  if (s3Client) return s3Client;
  s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: getAwsSecretKey(),
    },
  });
  return s3Client;
};

const getPublicFileUrl = (objectKey) => {
  const encodedKey = objectKey
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  const cloudfrontBase = String(process.env.CLOUDFRONT_URL || "").trim().replace(/\/+$/, "");
  if (cloudfrontBase) {
    return `${cloudfrontBase}/${encodedKey}`;
  }

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodedKey}`;
};

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

export const uploadUserDocument = async (req, res) => {
  try {
    if (!hasAwsEnv()) {
      return res.status(500).json({
        message:
          "AWS S3 is not configured. Add AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY (or AWS_SECRET_ACCESS), AWS_REGION and AWS_S3_BUCKET_NAME in backend .env",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Document file is required." });
    }

    const { folder = "meraaki/user-documents" } = req.body;
    const safeFileName = String(req.file.originalname || "document")
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .toLowerCase();
    const objectKey = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safeFileName}`;

    await getS3Client().send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: objectKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    const url = getPublicFileUrl(objectKey);

    return res.status(201).json({
      message: "Document uploaded successfully.",
      url,
      key: objectKey,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Failed to upload document.",
    });
  }
};
