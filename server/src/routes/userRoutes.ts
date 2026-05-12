import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await getAllUsers();
  return res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await getUserById(req.params.id);
  return res.json(user);
});

router.post("/", async (req, res) => {
  const user = await createUser(req.body.username, req.body.password);
  return res.json(user);
});

router.patch("/:id", async (req, res) => {
  const user = await updateUser(
    req.params.id,
    req.body.username,
    req.body.password,
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json("Success, updated user");
});

router.delete("/:id", async (req, res) => {
  const user = await deleteUser(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json("Success, deleted user");
});

export default router;
