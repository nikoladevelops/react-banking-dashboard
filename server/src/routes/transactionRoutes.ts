import express from "express";
import * as transactionController from "../controllers/transactionController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.get("/", transactionController.getTransactionHistory);
router.get("/:id", transactionController.getTransactionById);
router.post("/", transactionController.createTransaction);

export default router;
