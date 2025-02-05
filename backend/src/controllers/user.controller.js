import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create New User
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax", // Use "Lax" or "Strict" depending on the need
      domain: ".localhost", 
      maxAge: 24 * 60 * 60 * 1000,
    });
    

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// ✅ User Login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax", // Use "Lax" or "Strict" depending on the need
      domain: ".localhost", 
      maxAge: 24 * 60 * 60 * 1000,
    });
    

    // Send response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const userLogOut = async (req, res) => {
  try {
      res.clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Set to true in production
          sameSite: "lax",
      });

      res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
      console.error("Logout error:", error.message);
      res.status(500).json({ message: "Something went wrong" });
  }
};

export const userProfile = async (req, res) => {
  try {
    const userId = req.user?.id; // Get user ID from request

    if (!userId) {
      return res.status(400).json({ message: "User ID not found" });
    }

    // Find user by ID (excluding password for security)
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



// Update User Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id; // Get user ID from request (Assuming authentication middleware)

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Extract updated fields from request body
    const { name, bio, profilePic } = req.body;

    // Find and update the user
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, bio, profilePic }, // Fields to update
      { new: true, runValidators: true } // Return updated user & validate fields
    ).select("-password"); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
