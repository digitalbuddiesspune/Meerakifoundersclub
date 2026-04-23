import Membership from "../models/Membership.js";

const normalizeFeatures = (input) => {
  if (Array.isArray(input)) {
    return input.map((feature) => String(feature).trim()).filter(Boolean);
  }

  if (typeof input === "string") {
    return input
      .split(",")
      .map((feature) => feature.trim())
      .filter(Boolean);
  }

  return [];
};

export const getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    return res.status(200).json(memberships);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch memberships" });
  }
};

export const addMembership = async (req, res) => {
  try {
    const { planName, price, disccountedPrice, renewal, features = [] } = req.body;

    if (
      !planName ||
      price === undefined ||
      disccountedPrice === undefined ||
      !renewal
    ) {
      return res.status(400).json({
        message:
          "planName, price, disccountedPrice and renewal are required",
      });
    }

    const newMembership = await Membership.create({
      planName,
      price,
      disccountedPrice,
      renewal,
      features: normalizeFeatures(features),
    });

    return res.status(201).json({
      message: "Membership added successfully",
      membership: newMembership,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add membership" });
  }
};

export const updateMembershipById = async (req, res) => {
  try {
    const { id } = req.params;
    const { planName, price, disccountedPrice, renewal, features } = req.body;

    const updatedMembership = await Membership.findByIdAndUpdate(
      id,
      {
        planName,
        price,
        disccountedPrice,
        renewal,
        ...(features !== undefined
          ? { features: normalizeFeatures(features) }
          : {}),
      },
      { new: true, runValidators: true }
    );

    if (!updatedMembership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    return res.status(200).json({
      message: "Membership updated successfully",
      membership: updatedMembership,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid membership id" });
    }

    return res.status(500).json({ message: "Failed to update membership" });
  }
};

export const deleteMembershipById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMembership = await Membership.findByIdAndDelete(id);

    if (!deletedMembership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    return res.status(200).json({ message: "Membership deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid membership id" });
    }

    return res.status(500).json({ message: "Failed to delete membership" });
  }
};
