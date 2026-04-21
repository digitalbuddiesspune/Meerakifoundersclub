import mongoose from "mongoose";

const ourClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const OurClient = mongoose.model("OurClient", ourClientSchema);

export default OurClient;
