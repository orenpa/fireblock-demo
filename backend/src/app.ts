import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { initializeDataSource } from "./data-source";
import transactionRoutes from "./route/transactionRoutes";
import walletRoutes from "./route/walletRoutes";
import authRoutes from "./route/authRoutes";
import userRoutes from "./route/userRoutes";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

//protected routes
app.use("/api", transactionRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/user", userRoutes);

initializeDataSource().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
