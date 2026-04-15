import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, phone } = req.body;

    if (!username || !email || !phone) {
      return res
        .status(400)
        .json({ message: "username, email and phone are required" });
    }

    const newUser = await User.create({ username, email, phone });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Email or phone already exists" });
    }

    res.status(500).json({ message: "Failed to create user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({ message: "Email or phone is required" });
    }

    const normalizedIdentifier = String(identifier).trim().toLowerCase();
    const user = await User.findOne({
      $or: [{ email: normalizedIdentifier }, { phone: normalizedIdentifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to login user" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user id" });
    }

    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user id" });
    }

    if (error.code === 11000) {
      return res.status(409).json({ message: "Email or phone already exists" });
    }

    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user id" });
    }

    res.status(500).json({ message: "Failed to delete user" });
  }
};
