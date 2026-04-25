import mongoose from "mongoose";

const partnerListSchema = new mongoose.Schema(
  {
    technology: {
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

const PartnerList = mongoose.model("PartnerList", partnerListSchema);

export default PartnerList;
