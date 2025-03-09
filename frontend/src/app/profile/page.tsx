import { userService } from "@/services/userService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProtectedPage from "@/components/ProtectedPage/ProtectedPage";
import { User } from "@/interfaces/user.interface";
import { Login, ErrorRoute } from "@/enums";
import ProfileLobby from "../../components/profile/profileLobby";
import { tokenKey } from "@/constants";

const ProfilePage = async () => {
  const token = (await cookies()).get(tokenKey)?.value;

  if (!token) {
    redirect(Login);
  }

  try {
    const user: User = await userService.getUserProfile(token);

    return (
      <ProtectedPage>
        <div className="flex items-center justify-center w-full h-full">
          <ProfileLobby user={user} />
        </div>
      </ProtectedPage>
    );
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    redirect(ErrorRoute);
  }
};

export default ProfilePage;
