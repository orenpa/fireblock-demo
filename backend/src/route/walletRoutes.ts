import express from "express";
import { walletController } from "../controllers/walletController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/wallet", authMiddleware, (req, res) =>
  walletController.getUserWallet(req, res)
);

export default router;
