import mongoose from "mongoose";

const partnerServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
    startingPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    deliveryTimeline: {
      type: String,
      trim: true,
      default: "",
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { _id: false }
);

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    businessName: {
      type: String,
      trim: true,
      default: "",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
      default: "",
    },
    website: {
      type: String,
      trim: true,
      default: "",
    },
    logo: {
      type: String,
      trim: true,
      default: "",
    },
    coverImage: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    specializations: [
      {
        type: String,
        trim: true,
      },
    ],
    services: [partnerServiceSchema],
    portfolioLinks: [
      {
        type: String,
        trim: true,
      },
    ],
    city: {
      type: String,
      trim: true,
      default: "",
    },
    state: {
      type: String,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      trim: true,
      default: "India",
    },
    experienceYears: {
      type: Number,
      min: 0,
      default: 0,
    },
    completedProjects: {
      type: Number,
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    responseTime: {
      type: String,
      trim: true,
      default: "24h",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

partnerSchema.index({ slug: 1 });
partnerSchema.index({ email: 1 });
partnerSchema.index({ specializations: 1 });

const Partner = mongoose.model("Partner", partnerSchema);

export default Partner;
