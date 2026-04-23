import Partner from "../models/Partner.js";

const toSlug = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeStringArray = (input) => {
  if (Array.isArray(input)) {
    return input.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof input === "string") {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeServices = (input) => {
  if (!Array.isArray(input)) return [];

  return input
    .map((service) => ({
      name: String(service?.name || "").trim(),
      category: String(service?.category || "").trim(),
      startingPrice: Number(service?.startingPrice) || 0,
      deliveryTimeline: String(service?.deliveryTimeline || "").trim(),
      technologies: normalizeStringArray(service?.technologies),
    }))
    .filter((service) => service.name);
};

const buildPartnerPayload = (payload = {}) => {
  const {
    name,
    businessName,
    slug,
    email,
    phone,
    whatsapp,
    website,
    logo,
    coverImage,
    description,
    specializations,
    services,
    portfolioLinks,
    city,
    state,
    country,
    experienceYears,
    completedProjects,
    rating,
    responseTime,
    isVerified,
    status,
    notes,
  } = payload;

  return {
    ...(name !== undefined ? { name } : {}),
    ...(businessName !== undefined ? { businessName } : {}),
    ...(slug !== undefined ? { slug: toSlug(slug) } : {}),
    ...(email !== undefined ? { email } : {}),
    ...(phone !== undefined ? { phone } : {}),
    ...(whatsapp !== undefined ? { whatsapp } : {}),
    ...(website !== undefined ? { website } : {}),
    ...(logo !== undefined ? { logo } : {}),
    ...(coverImage !== undefined ? { coverImage } : {}),
    ...(description !== undefined ? { description } : {}),
    ...(specializations !== undefined
      ? { specializations: normalizeStringArray(specializations) }
      : {}),
    ...(services !== undefined ? { services: normalizeServices(services) } : {}),
    ...(portfolioLinks !== undefined
      ? { portfolioLinks: normalizeStringArray(portfolioLinks) }
      : {}),
    ...(city !== undefined ? { city } : {}),
    ...(state !== undefined ? { state } : {}),
    ...(country !== undefined ? { country } : {}),
    ...(experienceYears !== undefined ? { experienceYears } : {}),
    ...(completedProjects !== undefined ? { completedProjects } : {}),
    ...(rating !== undefined ? { rating } : {}),
    ...(responseTime !== undefined ? { responseTime } : {}),
    ...(isVerified !== undefined ? { isVerified } : {}),
    ...(status !== undefined ? { status } : {}),
    ...(notes !== undefined ? { notes } : {}),
  };
};

export const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    return res.status(200).json(partners);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch partners" });
  }
};

export const getPartnerBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const partner = await Partner.findOne({ slug: toSlug(slug) });

    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    return res.status(200).json(partner);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch partner" });
  }
};

export const addPartner = async (req, res) => {
  try {
    const { name, email, phone, description, slug } = req.body;

    if (!name || !email || !phone || !description) {
      return res.status(400).json({
        message: "name, email, phone and description are required",
      });
    }

    const normalizedSlug = toSlug(slug || name);
    if (!normalizedSlug) {
      return res.status(400).json({ message: "Valid slug or name is required" });
    }

    const existingPartner = await Partner.findOne({
      $or: [{ email: String(email).toLowerCase().trim() }, { slug: normalizedSlug }],
    });

    if (existingPartner) {
      return res
        .status(409)
        .json({ message: "Partner with this email or slug already exists" });
    }

    const newPartner = await Partner.create({
      ...buildPartnerPayload(req.body),
      slug: normalizedSlug,
    });

    return res.status(201).json({
      message: "Partner added successfully",
      partner: newPartner,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add partner" });
  }
};

export const updatePartnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = buildPartnerPayload(req.body);

    if (!Object.keys(payload).length) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    if (payload.slug) {
      const duplicateSlug = await Partner.findOne({
        _id: { $ne: id },
        slug: payload.slug,
      });
      if (duplicateSlug) {
        return res.status(409).json({ message: "Slug already in use" });
      }
    }

    if (payload.email) {
      const duplicateEmail = await Partner.findOne({
        _id: { $ne: id },
        email: String(payload.email).toLowerCase().trim(),
      });
      if (duplicateEmail) {
        return res.status(409).json({ message: "Email already in use" });
      }
    }

    const updatedPartner = await Partner.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    return res.status(200).json({
      message: "Partner updated successfully",
      partner: updatedPartner,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid partner id" });
    }
    return res.status(500).json({ message: "Failed to update partner" });
  }
};

export const deletePartnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPartner = await Partner.findByIdAndDelete(id);

    if (!deletedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    return res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid partner id" });
    }
    return res.status(500).json({ message: "Failed to delete partner" });
  }
};
