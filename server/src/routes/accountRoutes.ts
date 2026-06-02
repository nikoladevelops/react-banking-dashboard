import express from "express";
import * as accountController from "../controllers/accountController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", accountController.getMyAccounts);

router.get("/:id", accountController.getAccountById);

router.post("/", accountController.createAccount);

router.patch("/:id", accountController.updateAccount);

router.delete("/:id", accountController.deleteAccount);

export default router;
