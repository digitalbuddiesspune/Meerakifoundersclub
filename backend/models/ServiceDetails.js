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

const ServiceDetails = mongoose.model("ServiceDetails", serviceDetailsSchema);

export default ServiceDetails;
