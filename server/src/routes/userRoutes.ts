import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { adminProtect, protect } from "../middleware/auth.js";
const router = Router();

router.get("/", adminProtect, userController.getAllUsers);

router.get("/:id", protect, userController.getUserById);

router.get(
  "/username/:username",
  adminProtect,
  userController.getUserByUsername,
);

router.patch(
  "/block/:username",
  adminProtect,
  userController.blockUserByUsername,
);

router.patch(
  "/unblock/:username",
  adminProtect,
  userController.unblockUserByUsername,
);

router.post("/", adminProtect, userController.createUser);

router.patch("/:id", adminProtect, userController.updateUser);

router.delete("/:id", adminProtect, userController.deleteUser);

export default router;
