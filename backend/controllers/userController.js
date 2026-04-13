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
