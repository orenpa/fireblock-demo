"use client";

import { Transaction } from "@/interfaces/transaction.interface";
import { useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";

interface DashboardLobbyProps {
  transactions: Transaction[];
  currentUsername: string;
}

const DashboardLobby = ({
  transactions,
  currentUsername,
}: DashboardLobbyProps) => {
  const [transactionList, setTransactionList] = useState(transactions);

  const addTransaction = (transaction: Transaction) => {
    setTransactionList((prev) => [transaction, ...prev]);
  };

  return (
    <div className="p-6 w-full max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Transaction Dashboard</h1>
      <TransactionForm onTransactionComplete={addTransaction} />
      <TransactionTable
        transactions={transactionList}
        currentUsername={currentUsername}
      />
    </div>
  );
};

export default DashboardLobby;
