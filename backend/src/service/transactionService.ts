import { AppDataSource } from "../data-source";
import { Transaction } from "../model/Transaction";
import { User } from "../model/User";
import { createSign } from "crypto";
import { createLogger } from "../utils/logger.utils";
import { CurrencyBalance } from "../model/CurrencyBalance";

const logger = createLogger("<Transaction Service>");
const transactionRepository = AppDataSource.getRepository(Transaction);
const userRepository = AppDataSource.getRepository(User);
const balanceRepository = AppDataSource.getRepository(CurrencyBalance);

export class TransactionService {
  async transferFunds(
    fromUserId: number,
    toWalletAddress: string,
    currency: string,
    amount: number
  ): Promise<Transaction> {
    if (amount <= 0) throw new Error("Invalid transfer amount");

    const fromUser = await userRepository.findOne({
      where: { id: fromUserId },
      relations: ["wallet", "wallet.balances"],
    });
    if (!fromUser || !fromUser.wallet)
      throw new Error("Sender wallet not found");

    const toUser = await userRepository.findOne({
      where: { wallet: { address: toWalletAddress } },
      relations: ["wallet", "wallet.balances"],
    });
    if (!toUser || !toUser.wallet) throw new Error("Receiver wallet not found");

    const fromBalance = fromUser.wallet.balances.find(
      (bal) => bal.currency === currency
    );
    const toBalance = toUser.wallet.balances.find(
      (bal) => bal.currency === currency
    );

    if (!fromBalance) throw new Error(`Sender has no balance in ${currency}`);
    if (!toBalance) throw new Error(`Receiver has no balance in ${currency}`);
    if (fromBalance.amount < amount) throw new Error("Insufficient funds");

    logger.info(
      `Transferring ${amount} ${currency} from wallet ${fromUser.wallet.id} to wallet ${toUser.wallet.id}`
    );

    fromBalance.amount -= amount;
    toBalance.amount += amount;

    await balanceRepository.save([fromBalance, toBalance]);

    const transactionData = `${fromUser.wallet.address}->${toUser.wallet.address}:${amount} ${currency}`;
    const signature = this.signTransaction(
      transactionData,
      fromUser.wallet.privateKey
    );

    logger.info(`Generated transaction signature: ${signature}`);

    const transaction = transactionRepository.create({
      amount,
      currency,
      fromUser,
      toUser,
      signature,
    });

    return await transactionRepository.save(transaction);
  }

  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["wallet"],
    });

    if (!user || !user.wallet) throw new Error("User or wallet not found");

    logger.info(`Fetching transactions for wallet ID: ${user.wallet.id}`);

    return await transactionRepository.find({
      where: [{ fromUser: { id: user.id } }, { toUser: { id: user.id } }],
      relations: ["fromUser", "toUser"],
    });
  }

  private signTransaction(data: string, privateKey: string): string {
    const sign = createSign("SHA256");
    sign.update(data).end();

    try {
      const formattedKey = privateKey.startsWith("-----BEGIN PRIVATE KEY-----")
        ? privateKey
        : `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;

      const signature = sign.sign(
        {
          key: formattedKey,
          format: "pem",
          type: "pkcs8",
        },
        "hex"
      );
      return signature;
    } catch (error) {
      logger.error(`Error generating signature: ${error.message}`);
      throw new Error("Failed to sign the transaction");
    }
  }
}

export const transactionService = new TransactionService();
