import { AppDataSource } from "../data-source";
import { Wallet } from "../model/Wallet";
import { User } from "../model/User";
import { createLogger } from "../utils/logger.utils";
import { CurrencyBalance } from "../model/CurrencyBalance";

const logger = createLogger("<Wallet Service>");

const walletRepository = AppDataSource.getRepository(Wallet);
const userRepository = AppDataSource.getRepository(User);
const currencyBalanceRepository = AppDataSource.getRepository(CurrencyBalance);

export class WalletService {
  async getUserWallet(userId: number): Promise<Wallet | null> {
    logger.info(`Fetching wallet for user ID: ${userId}`);
    return await walletRepository.findOne({
      where: { user: { id: userId } },
      relations: ["user", "balances"],
    });
  }

  async updateWalletBalance(
    wallet: Wallet,
    currency: string,
    amount: number
  ): Promise<Wallet> {
    const existingBalance = wallet.balances.find(
      (balance) => balance.currency === currency
    );

    if (existingBalance) {
      existingBalance.amount += amount;
      await currencyBalanceRepository.save(existingBalance);
    } else {
      const newBalance = currencyBalanceRepository.create({
        wallet,
        currency,
        amount,
      });
      await currencyBalanceRepository.save(newBalance);
      wallet.balances.push(newBalance);
    }

    const updatedWallet = await walletRepository.save(wallet);

    logger.info(
      `Updated wallet ID: ${wallet.id}, new balance for ${currency}: ${amount}`
    );
    return updatedWallet;
  }

  async calculateTotalBalanceInUSD(wallet: Wallet): Promise<number> {
    const conversionRates: Record<string, number> = {
      BTC: 50000,
      ETH: 3000,
      ADA: 1.2,
      USDT: 1,
    };

    const totalUSD = wallet.balances.reduce((total, balance) => {
      const rate = conversionRates[balance.currency] || 0;
      return total + balance.amount * rate;
    }, 0);

    logger.info(`Calculated total USD balance for wallet ID: ${wallet.id}`);
    return totalUSD;
  }
}

export const walletService = new WalletService();
