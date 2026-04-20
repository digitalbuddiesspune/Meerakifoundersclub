import Start from "../models/start.js";

export const getStarts = async (req, res) => {
  try {
    const starts = await Start.find().sort({ category: 1, order: 1, createdAt: -1 });
    return res.status(200).json(starts);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch start items" });
  }
};

export const addStart = async (req, res) => {
  try {
    const { category, name, description, order } = req.body;

    if (!category || !name || !description || order === undefined) {
      return res.status(400).json({
        message: "category, name, description and order are required",
      });
    }

    const start = await Start.create({
      category,
      name,
      description,
      order,
    });

    return res.status(201).json({
      message: "Start item added successfully",
      start,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add start item" });
  }
};

export const updateStartById = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, name, description, order } = req.body;

    const updatedStart = await Start.findByIdAndUpdate(
      id,
      { category, name, description, order },
      { new: true, runValidators: true }
    );

    if (!updatedStart) {
      return res.status(404).json({ message: "Start item not found" });
    }

    return res.status(200).json({
      message: "Start item updated successfully",
      start: updatedStart,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid start item id" });
    }

    return res.status(500).json({ message: "Failed to update start item" });
  }
};

export const deleteStartById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStart = await Start.findByIdAndDelete(id);

    if (!deletedStart) {
      return res.status(404).json({ message: "Start item not found" });
    }

    return res.status(200).json({ message: "Start item deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid start item id" });
    }

    return res.status(500).json({ message: "Failed to delete start item" });
  }
};
