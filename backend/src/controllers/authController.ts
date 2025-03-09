import { Request, Response } from "express";
import { authService } from "../service/authService";
import { createLogger } from "../utils/logger.utils";

const logger = createLogger("<Auth Controller>");

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const newUser = await authService.register(username, password);

      logger.info(`User registered successfully: ${newUser.username}`);
      res.status(201).json(newUser);
    } catch (error) {
      logger.error(`Registration failed: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);

      logger.info(`User logged in: ${token.username}`);
      res.status(200).json(token);
    } catch (error) {
      logger.error(`Login failed: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
