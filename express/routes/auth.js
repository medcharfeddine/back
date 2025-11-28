import express from "express";
import User from "../models/Technician.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check existing user
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Save new user (NO bcrypt as you requested)
    const user = new User({ username, password });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ message: "Incorrect password" });

    // Fake token
    res.json({
      token: "dummy-token",
      username: user.username,
    });

  } catch (err) {
    res.status(500).json({ message: "Login error", error: err });
  }
});

export default router;
