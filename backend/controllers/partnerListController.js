import PartnerList from "../models/partnerList.js";

export const getPartnerList = async (req, res) => {
  try {
    const partnerList = await PartnerList.find().sort({ order: 1, createdAt: -1 });
    return res.status(200).json(partnerList);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch partner list" });
  }
};

export const addPartnerList = async (req, res) => {
  try {
    const { technology, order } = req.body;

    if (!technology || order === undefined || order === null) {
      return res.status(400).json({
        message: "technology and order are required",
      });
    }

    const partnerListItem = await PartnerList.create({
      technology,
      order,
    });

    return res.status(201).json({
      message: "Partner list item added successfully",
      partnerListItem,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add partner list item" });
  }
};

export const updatePartnerListById = async (req, res) => {
  try {
    const { id } = req.params;
    const { technology, order } = req.body;

    const payload = {};
    if (technology !== undefined) payload.technology = technology;
    if (order !== undefined) payload.order = order;

    if (!Object.keys(payload).length) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const updatedPartnerListItem = await PartnerList.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedPartnerListItem) {
      return res.status(404).json({ message: "Partner list item not found" });
    }

    return res.status(200).json({
      message: "Partner list item updated successfully",
      partnerListItem: updatedPartnerListItem,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid partner list id" });
    }

    return res.status(500).json({ message: "Failed to update partner list item" });
  }
};

export const deletePartnerListById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPartnerListItem = await PartnerList.findByIdAndDelete(id);

    if (!deletedPartnerListItem) {
      return res.status(404).json({ message: "Partner list item not found" });
    }

    return res.status(200).json({ message: "Partner list item deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid partner list id" });
    }

    return res.status(500).json({ message: "Failed to delete partner list item" });
  }
};
