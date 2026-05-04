import mongoose from "mongoose";

const formFieldSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    fieldType: {
      type: String,
      enum: ["text", "email", "number", "tel", "textarea"],
      default: "text",
      trim: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: true }
);

const linkedDocumentSchema = new mongoose.Schema(
  {
    documentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocumentType",
      required: true,
    },
    documentItem: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    documentTypeName: {
      type: String,
      trim: true,
      default: "",
    },
    documentItemName: {
      type: String,
      trim: true,
      default: "",
    },
    documentItemImage: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: true }
);

const intakeFieldValueSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    fieldType: { type: String, default: "text", trim: true },
    order: { type: Number, default: 0 },
    value: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const userIntakeSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fieldValues: {
      type: [intakeFieldValueSchema],
      default: [],
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    progressStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Applied", "Issued", "Closed"],
      default: "Pending",
      trim: true,
    },
  },
  { _id: true }
);

const serviceDetailsSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      unique: true,
      index: true,
    },
    formFields: {
      type: [formFieldSchema],
      default: [],
    },
    linkedDocuments: {
      type: [linkedDocumentSchema],
      default: [],
    },
    intakeSubmissions: {
      type: [userIntakeSubmissionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

serviceDetailsSchema.path("linkedDocuments").validate(function validateUniqueLinkedDocuments(value) {
  if (!Array.isArray(value)) return true;
  const seen = new Set();
  for (const row of value) {
    const key = `${String(row?.documentType || "")}:${String(row?.documentItem || "")}`;
    if (!row?.documentType || !row?.documentItem) return false;
    if (seen.has(key)) return false;
    seen.add(key);
  }
  return true;
}, "Each linked document pair must be unique and valid.");

const ServiceDetails = mongoose.model("ServiceDetails", serviceDetailsSchema);

export default ServiceDetails;
