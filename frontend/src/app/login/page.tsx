"use client";

import { redirect } from "next/navigation";
import LoginLobby from "@/components/login/LoginLobby";
import { authService } from "@/services/authService";
import { Dashboard } from "@/enums";

const LoginPage = () => {
  const token = authService.getToken();

  if (token) {
    redirect(Dashboard);
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <LoginLobby />
    </div>
  );
};

export default LoginPage;
