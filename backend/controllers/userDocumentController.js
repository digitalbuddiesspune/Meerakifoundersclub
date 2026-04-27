import mongoose from "mongoose";
import UserDocument from "../models/UserDocument.js";

const normalizeToCloudfrontUrl = (url) => {
  const raw = String(url || "").trim();
  if (!raw) return raw;

  const cloudfrontBase = String(process.env.CLOUDFRONT_URL || "").trim().replace(/\/+$/, "");
  if (!cloudfrontBase) return raw;

  if (raw.startsWith(cloudfrontBase)) return raw;

  const s3Prefix = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`;
  if (raw.startsWith(s3Prefix)) {
    const objectKey = raw.slice(s3Prefix.length);
    return `${cloudfrontBase}/${objectKey}`;
  }

  return raw;
};

const mapDocumentsToCloudfront = (entries = []) =>
  entries.map((entry) => {
    const item = entry.toObject ? entry.toObject() : entry;
    return {
      ...item,
      documents: Array.isArray(item.documents)
        ? item.documents.map((doc) => ({
            ...doc,
            url: normalizeToCloudfrontUrl(doc.url),
          }))
        : [],
    };
  });

export const getUserDocuments = async (req, res) => {
  try {
    const userDocuments = await UserDocument.find().sort({ createdAt: -1 });
    return res.status(200).json(mapDocumentsToCloudfront(userDocuments));
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user documents" });
  }
};

export const getUserDocumentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const userDocuments = await UserDocument.find({ userId }).sort({
      parentCategory: 1,
      documentType: 1,
      createdAt: -1,
    });
    return res.status(200).json(mapDocumentsToCloudfront(userDocuments));
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user documents by user id" });
  }
};

export const addUserDocument = async (req, res) => {
  try {
    const { userId, parentCategory, documentType, documents } = req.body;

    if (!userId || !parentCategory || !documentType || !Array.isArray(documents) || !documents.length) {
      return res
        .status(400)
        .json({
          message: "userId, parentCategory, documentType and non-empty documents array are required",
        });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const normalizedParentCategory = String(parentCategory).trim().toLowerCase();
    const normalizedDocumentType = String(documentType).trim().toLowerCase();

    const existingEntry = await UserDocument.findOne({
      userId,
      parentCategory: normalizedParentCategory,
      documentType: normalizedDocumentType,
    });

    if (existingEntry) {
      return res.status(409).json({
        message: "Document type already exists for this user. Use append endpoint to add more files.",
      });
    }

    const createdUserDocument = await UserDocument.create({
      userId,
      parentCategory: normalizedParentCategory,
      documentType: normalizedDocumentType,
      documents,
    });

    return res.status(201).json({
      message: "User document created successfully",
      userDocument: createdUserDocument,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create user document" });
  }
};

export const appendUserDocuments = async (req, res) => {
  try {
    const { userId, documentType } = req.params;
    const { parentCategory, documents } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    if (!Array.isArray(documents) || !documents.length) {
      return res.status(400).json({ message: "Non-empty documents array is required" });
    }

    const normalizedDocumentType = String(documentType || "").trim().toLowerCase();
    const normalizedParentCategory = String(parentCategory || "").trim().toLowerCase();
    if (!normalizedDocumentType) {
      return res.status(400).json({ message: "documentType is required" });
    }
    if (!normalizedParentCategory) {
      return res.status(400).json({ message: "parentCategory is required" });
    }

    const updatedUserDocument = await UserDocument.findOneAndUpdate(
      {
        userId,
        parentCategory: normalizedParentCategory,
        documentType: normalizedDocumentType,
      },
      { $push: { documents: { $each: documents } } },
      { new: true, runValidators: true }
    );

    if (!updatedUserDocument) {
      return res.status(404).json({ message: "User document record not found" });
    }

    return res.status(200).json({
      message: "Documents appended successfully",
      userDocument: updatedUserDocument,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to append documents" });
  }
};

export const deleteUserDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUserDocument = await UserDocument.findByIdAndDelete(id);
    if (!deletedUserDocument) {
      return res.status(404).json({ message: "User document not found" });
    }

    return res.status(200).json({ message: "User document deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user document id" });
    }

    return res.status(500).json({ message: "Failed to delete user document" });
  }
};
