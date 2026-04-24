import crypto from "crypto";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import User from "../models/User.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const sanitizeUser = (user) => ({
  _id: user._id,
  username: user.username,
  email: user.email,
  phone: user.phone,
  plan: user.plan || "",
  status: user.status || "inactive",
});

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
      user: sanitizeUser(newUser),
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
      user: sanitizeUser(user),
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

export const createMembershipOrder = async (req, res) => {
  try {
    const { userId, planName, amount } = req.body;

    if (!userId || !planName || !amount) {
      return res
        .status(400)
        .json({ message: "userId, planName and amount are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const amountInPaise = Number(amount) * 100;
    if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const receipt = `mfc_${Date.now()}_${String(userId).slice(-6)}`;

    const order = await razorpay.orders.create({
      amount: Math.round(amountInPaise),
      currency: "INR",
      receipt,
      notes: {
        userId: String(userId),
        planName: String(planName),
      },
    });

    return res.status(201).json({
      message: "Order created successfully",
      order,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.error?.description || error?.message || "Failed to create payment order",
    });
  }
};

export const verifyMembershipPayment = async (req, res) => {
  try {
    const {
      userId,
      planName,
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    } = req.body;

    if (
      !userId ||
      !planName ||
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { plan: planName, status: "active" },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Payment verified successfully",
      user: sanitizeUser(updatedUser),
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Failed to verify payment",
    });
  }
};
