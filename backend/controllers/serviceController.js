import Service from "../models/Service.js";

const toSlug = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeToolsWeUsed = (input) => {
  if (Array.isArray(input)) {
    return input.map((tool) => String(tool).trim()).filter(Boolean);
  }

  if (typeof input === "string") {
    return input
      .split(",")
      .map((tool) => tool.trim())
      .filter(Boolean);
  }

  return [];
};

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch services" });
  }
};

export const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const services = await Service.find();
    const matchedService = services.find((service) => toSlug(service.name) === slug);

    if (!matchedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json(matchedService);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch service" });
  }
};

export const addService = async (req, res) => {
  try {
    const {
      name,
      information,
      image,
      discountedPrice,
      price,
      projects = [],
      projectsCount = 0,
      satisfaction = "",
      support = "",
      avgDelivery = "",
      toolsWeUsed = [],
    } = req.body;

    if (
      !name ||
      !information ||
      !image ||
      discountedPrice === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        message:
          "name, information, image, discountedPrice and price are required",
      });
    }

    const newService = await Service.create({
      name,
      information,
      image,
      discountedPrice,
      price,
      projectsCount,
      satisfaction,
      support,
      avgDelivery,
      toolsWeUsed: normalizeToolsWeUsed(toolsWeUsed),
      projects,
    });

    return res.status(201).json({
      message: "Service added successfully",
      service: newService,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add service" });
  }
};

export const updateServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      information,
      image,
      discountedPrice,
      price,
      projects,
      projectsCount,
      satisfaction,
      support,
      avgDelivery,
      toolsWeUsed,
    } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        information,
        image,
        discountedPrice,
        price,
        projects,
        projectsCount,
        satisfaction,
        support,
        avgDelivery,
        ...(toolsWeUsed !== undefined
          ? { toolsWeUsed: normalizeToolsWeUsed(toolsWeUsed) }
          : {}),
      },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid service id" });
    }

    return res.status(500).json({ message: "Failed to update service" });
  }
};

export const deleteServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid service id" });
    }

    return res.status(500).json({ message: "Failed to delete service" });
  }
};
