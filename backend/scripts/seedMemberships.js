import dotenv from "dotenv";
import mongoose from "mongoose";
import Membership from "../models/Membership.js";

dotenv.config();

const membershipsPayload = [
  {
    planName: "Starter",
    price: 99,
    disccountedPrice: 99,
    renewal: "Renews Yearly",
    features: [
      "Free Company Name Suggestions",
      "10% Discount on Registration Services",
      "Simple Diary, Pen, Books + Membership Card",
      "Marketing Booklet / Flyer",
    ],
  },
  {
    planName: "Elite",
    price: 199,
    disccountedPrice: 199,
    renewal: "Renews Every 2 Years",
    features: [
      "All Starter benefits",
      "Customised Diary, Pen & Mug",
      "Compliance Calendar",
      "2 Expert Webinars/year FREE",
      "1 Free Community Meetup/year",
    ],
  },
  {
    planName: "Growth",
    price: 299,
    disccountedPrice: 299,
    renewal: "Renews Every 3 Years",
    features: [
      "All Elite benefits",
      "4 Expert Webinars/year FREE",
      "2 Free Community Meetups/year",
      "30-Min Professional Consulting",
      "Tally Educational Material",
    ],
  },
  {
    planName: "Premium",
    price: 499,
    disccountedPrice: 499,
    renewal: "Renews Every 4 Years",
    features: [
      "All Growth benefits",
      "5 Expert Webinars/year FREE",
      "3 Free Community Meetups/year",
      "60-Min Professional Consulting",
      "Networking Events Access (VIP)",
    ],
  },
];

const normalizeMembership = (membership) => ({
  planName: String(membership?.planName || "").trim(),
  price: Number(membership?.price),
  disccountedPrice: Number(membership?.disccountedPrice),
  renewal: String(membership?.renewal || "").trim(),
  features: Array.isArray(membership?.features)
    ? membership.features.map((feature) => String(feature).trim()).filter(Boolean)
    : [],
});

const isValidMembership = (membership) =>
  Boolean(
    membership.planName &&
      Number.isFinite(membership.price) &&
      Number.isFinite(membership.disccountedPrice) &&
      membership.renewal
  );

const run = async () => {
  const mongoUri = process.env.Mongo_URI;
  if (!mongoUri) {
    throw new Error("Mongo_URI is missing in backend/.env");
  }

  const memberships = membershipsPayload
    .map(normalizeMembership)
    .filter(isValidMembership);

  if (memberships.length === 0) {
    throw new Error("No valid memberships found in payload");
  }

  await mongoose.connect(mongoUri);

  const operations = memberships.map((membership) => ({
    updateOne: {
      filter: { planName: membership.planName },
      update: { $set: membership },
      upsert: true,
    },
  }));

  const result = await Membership.bulkWrite(operations, { ordered: false });

  console.log(
    `Membership seed complete. matched=${result.matchedCount} modified=${result.modifiedCount} upserted=${result.upsertedCount}`
  );

  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error("Membership seed failed:", error.message);
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  process.exit(1);
});
