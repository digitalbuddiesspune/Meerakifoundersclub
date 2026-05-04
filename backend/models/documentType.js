import mongoose from "mongoose";

export const DEFAULT_DOCUMENT_TYPE_GROUPS = [
  {
    parentCategory: "Partnership & Business Formation",
    items: [
      "Partnership Deed",
      "Memorandum of Association (MOA)",
      "Articles of Association (AOA)",
      "Shareholders' Agreements",
      "Operating Agreements",
    ],
  },
  {
    parentCategory: "Client & Vendor Contracts",
    items: [
      "Service Agreements",
      "Sales Agreements",
      "Vendor Agreements",
      "Consulting Agreements",
      "Purchase Orders",
    ],
  },
  {
    parentCategory: "Employment & HR",
    items: [
      "Employment Contracts",
      "Offer Letters",
      "Non-Compete Agreements",
      "Employee Handbook",
      "Termination Letters",
    ],
  },
  {
    parentCategory: "Intellectual Property",
    items: [
      "Non-Disclosure Agreements (NDAs)",
      "Trademark Licensing Agreements",
      "Copyright Assignment",
      "IP Assignment Agreements",
      "Confidentiality Agreements",
    ],
  },
  {
    parentCategory: "Financial & Investment",
    items: [
      "Loan Agreements",
      "Share Subscription Agreements",
      "Convertible Note Agreements",
      "Investment Agreements",
      "Financial Guarantees",
    ],
  },
  {
    parentCategory: "Compliance & Regulatory",
    items: [
      "GST Registration Documents",
      "ROC Filings",
      "Income Tax Returns",
      "Audit Reports",
      "Compliance Certificates",
    ],
  },
];

const documentItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const documentTypeSchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    categoryOrder: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
      index: true,
    },
    documents: {
      type: [documentItemSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

documentTypeSchema.index({ categoryOrder: 1, createdAt: -1 });

const DocumentType = mongoose.model("DocumentType", documentTypeSchema);

export default DocumentType;
