import OurClient from "../models/ourClient.js";

export const getOurClients = async (req, res) => {
  try {
    const clients = await OurClient.find().sort({ createdAt: -1 });
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch clients" });
  }
};

export const addOurClient = async (req, res) => {
  try {
    const { name, logo } = req.body;

    if (!name || !logo) {
      return res.status(400).json({ message: "name and logo are required" });
    }

    const client = await OurClient.create({ name, logo });

    return res.status(201).json({
      message: "Client added successfully",
      client,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add client" });
  }
};

export const updateOurClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logo } = req.body;

    const updatedClient = await OurClient.findByIdAndUpdate(
      id,
      { name, logo },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res.status(200).json({
      message: "Client updated successfully",
      client: updatedClient,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid client id" });
    }

    return res.status(500).json({ message: "Failed to update client" });
  }
};

export const deleteOurClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClient = await OurClient.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid client id" });
    }

    return res.status(500).json({ message: "Failed to delete client" });
  }
};
