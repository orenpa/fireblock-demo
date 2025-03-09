export interface WalletBalance {
  id: number;
  currency: string;
  amount: number;
}

export interface Wallet {
  id: number;
  balances: WalletBalance[];
  address: string;
}

export interface User {
  id: number;
  username: string;
  wallet: Wallet;
}
