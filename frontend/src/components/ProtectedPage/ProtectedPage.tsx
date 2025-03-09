"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { Login } from "@/enums";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push(Login);
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
