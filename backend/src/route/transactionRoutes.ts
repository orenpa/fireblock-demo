import express from "express";
import { transactionController } from "../controllers/transactionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/transactions", authMiddleware, (req, res) =>
  transactionController.transferFunds(req, res)
);

router.get("/transactions", authMiddleware, (req, res) =>
  transactionController.getTransactions(req, res)
);

export default router;
