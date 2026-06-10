import express from "express";
import { protect, type AuthRequest } from "../middleware/auth.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", protect, authController.logout);

router.get("/me", protect, authController.me);

export default router;
