import { Router } from "express";
import mongoose from "mongoose";
import { ErrorKeys } from "../constants/errorKeys.js";
import { errorResponse, successResponse } from "../utils/response.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(successResponse(users));
  } catch (error: any) {
    console.error("Get all users error:", error);
    res.status(500).json(errorResponse(ErrorKeys.server.internalServerError));
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json(errorResponse(ErrorKeys.users.invalidUserId));
    }

    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json(errorResponse(ErrorKeys.users.userNotFound));
    }

    res.status(200).json(successResponse(user));
  } catch (error: any) {
    console.error("Get user by id error:", error);
    res.status(500).json(errorResponse(ErrorKeys.server.internalServerError));
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.users.usernameRequired));
    }

    if (!password) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.users.passwordRequired));
    }

    const user = await createUser(username, password);
    res.status(201).json(successResponse(user));
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.auth.usernameAlreadyTaken));
    }
    console.error("Create user error:", error);
    res.status(500).json(errorResponse(ErrorKeys.server.internalServerError));
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json(errorResponse(ErrorKeys.users.invalidUserId));
    }

    if (!username) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.users.usernameRequired));
    }

    if (!password) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.users.passwordRequired));
    }

    const user = await updateUser(id, username, password);

    if (!user) {
      return res.status(404).json(errorResponse(ErrorKeys.users.userNotFound));
    }

    res.status(200).json(successResponse(user));
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json(errorResponse(ErrorKeys.auth.usernameAlreadyTaken));
    }
    console.error("Update user error:", error);
    res.status(500).json(errorResponse(ErrorKeys.server.internalServerError));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json(errorResponse(ErrorKeys.users.invalidUserId));
    }

    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json(errorResponse(ErrorKeys.users.userNotFound));
    }

    res.status(200).json(successResponse(user));
  } catch (error: any) {
    console.error("Delete user error:", error);
    res.status(500).json(errorResponse(ErrorKeys.server.internalServerError));
  }
});

export default router;
