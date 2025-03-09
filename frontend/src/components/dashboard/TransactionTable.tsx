import { Transaction } from "@/interfaces/transaction.interface";

interface TransactionTableProps {
  transactions: Transaction[];
  currentUsername: string;
}

const TransactionTable = ({
  transactions,
  currentUsername,
}: TransactionTableProps) => (
  <table className="min-w-full bg-white text-gray-900">
    <thead>
      <tr className="bg-gray-200">
        <th className="py-2 px-4">ID</th>
        <th className="py-2 px-4">Amount (Currency)</th>
        <th className="py-2 px-4">From User</th>
        <th className="py-2 px-4">To User</th>
        <th className="py-2 px-4">Date</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((tx) => (
        <tr key={tx.id} className="border-b hover:bg-gray-100">
          <td className="py-2 px-4 text-center">{tx.id}</td>
          <td className="py-2 px-4 text-center">
            {tx.amount} {tx.currency}
          </td>

          <td className="py-2 px-4 text-center">
            {tx.fromUser?.username === currentUsername ? (
              <span className="text-purple-600 font-bold">ME</span>
            ) : (
              tx.fromUser?.username
            )}
          </td>

          <td className="py-2 px-4 text-center">
            {tx.toUser?.username === currentUsername ? (
              <span className="text-purple-600 font-bold">ME</span>
            ) : (
              tx.toUser?.username
            )}
          </td>

          <td className="py-2 px-4 text-center">
            {new Date(tx.createdAt).toLocaleDateString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TransactionTable;
