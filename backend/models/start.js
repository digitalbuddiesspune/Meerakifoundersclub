import mongoose from "mongoose";

const startSchema = new mongoose.Schema(
  {
    category: {
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
    order: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Start = mongoose.model("Start", startSchema);

export default Start;
