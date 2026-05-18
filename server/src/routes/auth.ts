import express from "express";
import { createUser, getUserByUsername } from "../services/userService.js";
import { protect, type AuthRequest } from "../middleware/auth.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { generateToken, getJwtCookieOptions } from "../utils/jwtHelper.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.auth.usernameMissing));
    }

    if (!password) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.auth.passwordRequired));
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.auth.usernameAlreadyTaken));
    }

    const newUser = await createUser(username, password);
    const token = generateToken({
      id: newUser._id.toString(),
      username: newUser.username,
    });

    res.cookie("token", token, getJwtCookieOptions());

    res
      .status(201)
      .json(successResponse({ id: newUser._id, username: newUser.username }));
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.auth.usernameAlreadyTaken));
    }
    console.error("Registration error:", error);
    res.status(500).json(errorResponse(ErrorKeys.server.internalServerError));
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.auth.usernameMissing));
    }

    if (!password) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.auth.passwordRequired));
    }

    const user = await getUserByUsername(username);
    if (!user) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.auth.invalidCredentials));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.auth.invalidCredentials));
    }

    const token = generateToken({
      id: user._id.toString(),
      username: user.username,
    });

    res.cookie("token", token, getJwtCookieOptions());

    res.status(200).json(
      successResponse({
        id: user._id,
        username: user.username,
      }),
    );
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json(errorResponse(ErrorKeys.server.internalServerError));
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", getJwtCookieOptions());
  res.status(200).json(successResponse({ message: "Logged out successfully" }));
});

router.get("/me", protect, async (req: AuthRequest, res) => {
  res.status(200).json(successResponse(req.user));
});

export default router;
