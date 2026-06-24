import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

dotenv.config();

const ADMIN_EMAIL = "admin@meraakifoundersclub.com";
const ADMIN_PHONE = "9970255658";
const ADMIN_USERNAME = "Admin";
const ADMIN_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD || "Admin@12345";

const run = async () => {
  const mongoUri = process.env.Mongo_URI;
  if (!mongoUri) {
    throw new Error("Mongo_URI is missing in backend/.env");
  }

  await mongoose.connect(mongoUri);

  const result = await User.findOneAndUpdate(
    { email: ADMIN_EMAIL.toLowerCase() },
    {
      $set: {
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL.toLowerCase(),
        phone: ADMIN_PHONE,
        role: "admin",
        status: "active",
        plan: "",
        password: hashPassword(ADMIN_PASSWORD),
      },
    },
    {
      upsert: true,
      returnDocument: "after",
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

  console.log("Admin user seed complete:", {
    id: String(result._id),
    email: result.email,
    phone: result.phone,
    role: result.role,
    status: result.status,
    passwordSet: true,
  });
  console.log(`Admin login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);

  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error("Admin user seed failed:", error.message);
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  process.exit(1);
});
