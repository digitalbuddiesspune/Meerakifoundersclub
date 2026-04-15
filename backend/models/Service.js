import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    information: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    projectsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    satisfaction: {
      type: String,
      trim: true,
      default: "",
    },
    support: {
      type: String,
      trim: true,
      default: "",
    },
    avgDelivery: {
      type: String,
      trim: true,
      default: "",
    },
    toolsWeUsed: [
      {
        type: String,
        trim: true,
      },
    ],
    projects: [
      {
        image: {
          type: String,
          required: true,
          trim: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        discountedPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        technologiesUsed: [
          {
            type: String,
            trim: true,
          },
        ],
        demoLink: {
          type: String,
          required: true,
          trim: true,
        },
        quoteLink: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
