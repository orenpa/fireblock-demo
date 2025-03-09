import { Request, Response } from "express";
import { walletService } from "../service/walletService";
import { createLogger } from "../utils/logger.utils";

const logger = createLogger("<Wallet Controller>");

export class WalletController {
  async getUserWallet(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId; // Extract user ID from auth middleware
      logger.info(`Fetching wallet for user ID: ${userId}`);

      const wallet = await walletService.getUserWallet(userId);

      if (!wallet) {
        res.status(404).json({ message: "Wallet not found" });
        return;
      }

      res.status(200).json(wallet);
    } catch (error) {
      logger.error(`Error fetching wallet: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }
}

export const walletController = new WalletController();
