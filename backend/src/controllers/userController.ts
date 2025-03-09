import { Request, Response } from "express";
import { userService } from "../service/userService";
import { createLogger } from "../utils/logger.utils";

const logger = createLogger("<User Controller>");

export class UserController {
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      logger.info(`Fetching profile for user ID: ${userId}`);

      const userProfile = await userService.getUserById(userId);

      if (!userProfile) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(userProfile);
    } catch (error) {
      logger.error(`Error fetching user profile: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }
}

export const userController = new UserController();
