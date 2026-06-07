import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { adminProtect } from "../middleware/auth.js";
const router = Router();

router.use(adminProtect);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.get("/username/:username", userController.getUserByUsername);

router.patch("/block/:username", userController.blockUserByUsername);

router.patch("/unblock/:username", userController.unblockUserByUsername);

router.post("/", userController.createUser);

router.patch("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;
