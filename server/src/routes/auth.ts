import express, { type CookieOptions } from "express";
import { createUser, getUserByUsername } from "../services/userService.js";
import { protect, type AuthRequest } from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60 * 60 * 1000, // 1 hour
};

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = await createUser(username, password);
    const token = generateToken(newUser._id.toString(), newUser.username);

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message: "User registered successfully",
      id: newUser._id,
      username: newUser.username,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user._id.toString(), user.username);

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      id: user._id,
      username: user.username,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logout successful" });
});

router.get("/me", protect, async (req: AuthRequest, res) => {
  res.status(200).json(req.user);
});

const generateToken = (id: string, username: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ id: id, username }, secret, {
    expiresIn: "1h",
  });
};

export default router;
