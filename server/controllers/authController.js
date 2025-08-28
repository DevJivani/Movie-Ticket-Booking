const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
exports.registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, phone });

    res.status(201).json({ msg: "User register successfully", user: { id: user._id, name: user.name, email: user.email, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    // ✅ Set cookie 
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Only HTTPS in prod
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({ user: user, msg: "User login successful" });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error. Please try again later. " });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Unauthorized. Token is missing or invalid." });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    res.json(user);
  } catch (err) {
    console.error("getMe error:", err);
    res.status(500).json({ msg: "Server error while fetching user." });
  }
};

// Logout
exports.logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path:"/"
    });
    // res.clearCookie("token");

    res.status(200).json({ msg: "Logged out successfully." });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ msg: "Logout failed. Please try again." });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, phone, password: hashedPassword },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });


    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
};