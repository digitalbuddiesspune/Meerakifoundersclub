import dotenv from "dotenv";
import mongoose from "mongoose";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Service from "../models/Service.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const normalizeServicesPayload = (payload) => {
  if (!Array.isArray(payload)) return [];

  return payload.map((service) => ({
    name: String(service?.name || "").trim(),
    category: String(service?.category || "Start").trim() || "Start",
    information: String(service?.information || "").trim(),
    image: String(service?.image || "").trim(),
    discountedPrice: Number(service?.discountedPrice),
    price: Number(service?.price),
    projectsCount: Number(service?.projectsCount || 0),
    satisfaction: String(service?.satisfaction || "").trim(),
    support: String(service?.support || "").trim(),
    avgDelivery: String(service?.avgDelivery || "").trim(),
    toolsWeUsed: Array.isArray(service?.toolsWeUsed)
      ? service.toolsWeUsed.map((tool) => String(tool).trim()).filter(Boolean)
      : [],
    features: Array.isArray(service?.features)
      ? service.features
          .map((feature) => ({
            featureName: String(feature?.featureName || "").trim(),
            featureDiscription: String(feature?.featureDiscription || "").trim(),
          }))
          .filter((feature) => feature.featureName && feature.featureDiscription)
      : [],
    projects: Array.isArray(service?.projects)
      ? service.projects.map((project) => ({
          image: String(project?.image || "").trim(),
          name: String(project?.name || "").trim(),
          description: String(project?.description || "").trim(),
          price: Number(project?.price),
          discountedPrice: Number(project?.discountedPrice),
          technologiesUsed: Array.isArray(project?.technologiesUsed)
            ? project.technologiesUsed
                .map((technology) => String(technology).trim())
                .filter(Boolean)
            : [],
          demoLink: String(project?.demoLink || "").trim(),
          quoteLink: String(project?.quoteLink || "").trim(),
        }))
      : [],
  }));
};

const isValidService = (service) =>
  Boolean(
    service.name &&
      service.information &&
      service.image &&
      Number.isFinite(service.price) &&
      Number.isFinite(service.discountedPrice)
  );

const run = async () => {
  const mongoUri = process.env.Mongo_URI;
  if (!mongoUri) {
    throw new Error("Mongo_URI is missing in backend/.env");
  }

  const sourcePath = path.resolve(__dirname, "../models/services.json");
  const raw = await readFile(sourcePath, "utf8");
  const parsed = JSON.parse(raw);
  const services = normalizeServicesPayload(parsed).filter(isValidService);

  if (services.length === 0) {
    throw new Error("No valid services found in services.json");
  }

  await mongoose.connect(mongoUri);

  const operations = services.map((service) => ({
    updateOne: {
      filter: { name: service.name },
      update: { $set: service },
      upsert: true,
    },
  }));

  const result = await Service.bulkWrite(operations, { ordered: false });

  console.log(
    `Service seed complete. matched=${result.matchedCount} modified=${result.modifiedCount} upserted=${result.upsertedCount}`
  );

  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error("Service seed failed:", error.message);
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  process.exit(1);
});
