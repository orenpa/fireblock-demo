import { BaseService } from "./baseService";

class WalletService extends BaseService {
  constructor() {
    super();
  }

  getWallets = async () => {
    const response = await this.api.get("/wallets");
    return response.data;
  };

  getWalletById = async (walletId: number) => {
    const response = await this.api.get(`/wallets/${walletId}`);
    return response.data;
  };

  getWalletBalance = async (walletId: number) => {
    const response = await this.api.get(`/wallets/${walletId}/balance`);
    return response.data;
  };

  createWallet = async (userId: number) => {
    const response = await this.api.post("/wallets", { userId });
    return response.data;
  };
}

export const walletService = new WalletService();
