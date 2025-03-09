"use client";

import { User } from "@/interfaces/user.interface";

interface ProfileLobbyProps {
  user: User;
}

const ProfileLobby = ({ user }: ProfileLobbyProps) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-gray-900 w-full max-w-3xl">
      <h2 className="text-3xl font-bold mb-4">User Profile</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">User Details</h3>
        <p className="text-lg">Username: {user.username}</p>
        <p className="text-lg">
          Wallet Address:{" "}
          <span className="font-mono bg-gray-200 p-1 rounded">
            {user.wallet?.address || "N/A"}
          </span>
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Wallet Balance</h3>
        <div className="p-4 bg-gray-100 rounded-md">
          {user.wallet && user.wallet.balances?.length > 0 ? (
            <table className="min-w-full bg-white text-gray-900">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Currency</th>
                  <th className="py-2 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {user.wallet.balances.map((balance) => (
                  <tr key={balance.id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4 text-center">
                      {balance.currency}
                    </td>
                    <td className="py-2 px-4 text-center">{balance.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No wallet balances available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileLobby;
