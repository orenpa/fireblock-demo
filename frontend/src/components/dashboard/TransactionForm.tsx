"use client";

import { useState } from "react";
import { transactionService } from "@/services/transactionService";
import { Transaction } from "@/interfaces/transaction.interface";

interface TransactionFormProps {
  onTransactionComplete: (transaction: Transaction) => void;
}

const SUPPORTED_CURRENCIES = ["BTC", "ETH", "ADA"];

const TransactionForm = ({ onTransactionComplete }: TransactionFormProps) => {
  const [toWalletAddress, setToWalletAddress] = useState("");
  const [currency, setCurrency] = useState(SUPPORTED_CURRENCIES[0]);
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const transaction = await transactionService.transferFunds(
        toWalletAddress,
        currency,
        Number(amount)
      );
      onTransactionComplete(transaction);
      setToWalletAddress("");
      setCurrency(SUPPORTED_CURRENCIES[0]);
      setAmount("");
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-white">New Transaction</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="To Wallet Address"
          value={toWalletAddress}
          onChange={(e) => setToWalletAddress(e.target.value)}
          className="p-2 border rounded w-full bg-white text-purple-700 placeholder-purple-400 focus:border-purple-500"
          required
        />
      </div>

      <div className="mb-4">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="p-2 border rounded w-full bg-white text-purple-700 focus:border-purple-500"
          required
        >
          {SUPPORTED_CURRENCIES.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded w-full bg-white text-purple-700 placeholder-purple-400 focus:border-purple-500"
          required
          min="0.00000001"
          step="0.00000001"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
      >
        Send
      </button>
    </form>
  );
};

export default TransactionForm;
