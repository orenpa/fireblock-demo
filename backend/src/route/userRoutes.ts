import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { userController } from "../controllers/userController";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) =>
  userController.getProfile(req, res)
);

export default router;
