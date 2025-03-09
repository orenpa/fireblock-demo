import { AppDataSource } from "../data-source";
import { User } from "../model/User";
import { Wallet } from "../model/Wallet";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createLogger } from "../utils/logger.utils";
import { CurrencyBalance } from "../model/CurrencyBalance";
import { generateKeyPairSync } from "crypto";

const logger = createLogger("<Auth Service>");
const userRepository = AppDataSource.getRepository(User);
const walletRepository = AppDataSource.getRepository(Wallet);
const balanceRepository = AppDataSource.getRepository(CurrencyBalance);
const RSA_MODULUS_LENGTH = 2048;

export class AuthService {
  async register(username: string, password: string): Promise<User> {
    const existingUser = await userRepository.findOneBy({ username });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
      username,
      password: hashedPassword,
    });
    await userRepository.save(newUser);

    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
      modulusLength: RSA_MODULUS_LENGTH,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });

    const wallet = walletRepository.create({
      address: `wallet-${newUser.id}`,
      publicKey,
      privateKey,
      user: newUser,
    });
    await walletRepository.save(wallet);

    newUser.wallet = wallet;
    await userRepository.save(newUser);

    const initialBalances = ["BTC", "ETH", "ADA"].map((currency) =>
      balanceRepository.create({
        currency,
        amount: Math.random() * 100,
        wallet,
      })
    );
    await balanceRepository.save(initialBalances);

    logger.info(
      `User registered: ${newUser.username} with wallet ID: ${wallet.id}`
    );
    return newUser;
  }

  async login(
    username: string,
    password: string
  ): Promise<{ token: string; userId: number; username: string }> {
    const user = await userRepository.findOne({
      where: { username },
      relations: ["wallet"],
    });
    if (!user || !user.wallet) {
      throw new Error("Invalid credentials or wallet not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    logger.info(`User logged in: ${user.username}`);
    return { token, userId: user.id, username: user.username };
  }
}

export const authService = new AuthService();
