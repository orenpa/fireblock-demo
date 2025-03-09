import DashboardLobby from "@/components/dashboard/DashboardLobby";
import ProtectedPage from "@/components/ProtectedPage/ProtectedPage";
import { Transaction } from "../../interfaces/transaction.interface";
import { userService } from "../../services/userService";
import { cookies } from "next/headers";
import { transactionService } from "../../services/transactionService";
import { tokenKey } from "@/constants";
import { ErrorRoute, Login } from "@/enums";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const token = (await cookies()).get(tokenKey)?.value;
  if (!token) {
    redirect(Login);
  }
  try {
    const user = await userService.getUserProfile(token);
    const transactions: Transaction[] =
      await transactionService.getTransactions(token);

    return (
      <ProtectedPage>
        <div className="flex items-center justify-center w-full h-full">
          <DashboardLobby
            transactions={transactions}
            currentUsername={user.username}
          />
        </div>
      </ProtectedPage>
    );
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    redirect(ErrorRoute);
  }
};

export default DashboardPage;
