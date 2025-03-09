import { BaseService } from "./baseService";

class TransactionService extends BaseService {
  constructor() {
    super();
  }

  getTransactions = async (token: string) => {
    const response = await this.api.get("/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  transferFunds = async (
    toWalletAddress: string,
    currency: string,
    amount: number
  ) => {
    const response = await this.api.post("/transactions", {
      toWalletAddress,
      currency,
      amount,
    });
    return response.data;
  };
}

export const transactionService = new TransactionService();
