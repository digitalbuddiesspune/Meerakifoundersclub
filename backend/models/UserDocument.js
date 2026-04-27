import mongoose from "mongoose";

const uploadedDocumentSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    fileName: {
      type: String,
      default: "",
      trim: true,
    },
    fileSizeBytes: {
      type: Number,
      required: true,
      max: 2 * 1024 * 1024,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const userDocumentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    documentType: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    parentCategory: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    documents: {
      type: [uploadedDocumentSchema],
      default: [],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one document is required.",
      },
    },
  },
  { timestamps: true }
);

userDocumentSchema.index({ userId: 1, parentCategory: 1, documentType: 1 }, { unique: true });

const UserDocument = mongoose.model("UserDocument", userDocumentSchema);

export default UserDocument;
