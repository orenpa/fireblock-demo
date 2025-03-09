import { AppDataSource } from "../data-source";
import { User } from "../model/User";
import { Wallet } from "../model/Wallet";
import { createLogger } from "../utils/logger.utils";

const logger = createLogger("<User Service>");

const userRepository = AppDataSource.getRepository(User);
const walletRepository = AppDataSource.getRepository(Wallet);

export class UserService {
  async getUserById(userId: number): Promise<User | null> {
    logger.info(`Fetching user by ID: ${userId}`);
    return await userRepository.findOne({
      where: { id: userId },
      relations: ["wallet", "wallet.balances"],
    });
  }

  async createUserWallet(userId: number): Promise<Wallet> {
    const user = await this.getUserById(userId);
    if (!user) {
      logger.error(`User not found with ID: ${userId}`);
      throw new Error("User not found");
    }

    if (user.wallet) {
      logger.warn(`User ID ${userId} already has a wallet.`);
      return user.wallet;
    }

    const wallet = walletRepository.create({ user });
    const savedWallet = await walletRepository.save(wallet);

    logger.info(`Created wallet for user ID ${userId}: ${savedWallet.id}`);
    return savedWallet;
  }
}

export const userService = new UserService();
