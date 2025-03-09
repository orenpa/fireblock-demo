import { Request, Response } from "express";
import { transactionService } from "../service/transactionService";
import { createLogger } from "../utils/logger.utils";

const logger = createLogger("<Transaction Controller>");

export class TransactionController {
  async transferFunds(req: Request, res: Response): Promise<void> {
    try {
      const { toWalletAddress, currency, amount } = req.body;
      const fromUserId = (req as any).user.userId;

      if (!toWalletAddress || !currency || !amount) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      logger.info(
        `Initiating transfer of ${amount} ${currency} from user ID ${fromUserId} to wallet ${toWalletAddress}`
      );

      const transaction = await transactionService.transferFunds(
        fromUserId,
        toWalletAddress,
        currency,
        amount
      );

      res.status(200).json(transaction);
    } catch (error) {
      logger.error(`Error transferring funds: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  async getTransactions(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;

      const transactions = await transactionService.getTransactionsByUser(
        userId
      );

      res.status(200).json(transactions);
    } catch (error) {
      logger.error(`Error fetching transactions: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }
}

export const transactionController = new TransactionController();
