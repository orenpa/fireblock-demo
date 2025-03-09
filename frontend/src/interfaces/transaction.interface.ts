export interface Transaction {
  id: number;
  amount: number;
  fromUser?: { username: string };
  toUser?: { username: string };
  createdAt: string;
  currency: string;
}
