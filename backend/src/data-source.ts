import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./model/User";
import { Wallet } from "./model/Wallet";
import { Transaction } from "./model/Transaction";
import { createLogger } from "./utils/logger.utils";
import mysql, { Connection } from "mysql2/promise";
import { CurrencyBalance } from "./model/CurrencyBalance";

const logger = createLogger("<DataSource>");

const {
  DB_HOST = "localhost",
  DB_PORT = "3306",
  DB_USER = "root",
  DB_PASSWORD = "newpassword",
  DB_NAME = "fireblocks",
} = process.env;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Wallet, Transaction, CurrencyBalance],
  migrations: [],
  subscribers: [],
});

async function ensureDatabaseExists(): Promise<void> {
  let connection: Connection | null = null;
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: parseInt(DB_PORT, 10),
      user: DB_USER,
      password: DB_PASSWORD,
    });

    logger.info(`Connected to MySQL server at ${DB_HOST}:${DB_PORT}`);

    const [rows] = await connection.query(`SHOW DATABASES LIKE '${DB_NAME}'`);

    if ((rows as any[]).length === 0) {
      await connection.query(`CREATE DATABASE ${DB_NAME}`);
      logger.info(`Database '${DB_NAME}' created successfully.`);
    } else {
      logger.info(`Database '${DB_NAME}' already exists.`);
    }
  } catch (err) {
    logger.error("Error checking or creating the database:", err);
    throw new Error("Failed to ensure database exists.");
  } finally {
    if (connection) await connection.end();
  }
}

export async function initializeDataSource(
  maxRetries = 10,
  retryInterval = 2000
): Promise<DataSource> {
  await ensureDatabaseExists();

  let retries = maxRetries;
  while (retries > 0) {
    try {
      await AppDataSource.initialize();
      logger.info("Data Source has been initialized successfully!");
      return AppDataSource;
    } catch (err) {
      logger.error("Error during Data Source initialization:", err.message);
      retries -= 1;
      logger.info(
        `Retrying in ${
          retryInterval / 1000
        } seconds... (${retries} attempts left)`
      );
      await new Promise((res) => setTimeout(res, retryInterval));
    }
  }
  throw new Error("Failed to initialize Data Source after multiple retries.");
}
