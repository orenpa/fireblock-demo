"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Dashboard, Home, Login, Profile, Register } from "@/enums";
import { authService } from "@/services/authService";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleLogout = () => {
    authService.logout();
    router.push(Login);
  };

  return (
    <nav className="p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">CryptoVerse</h1>
      <div className="flex space-x-4">
        <Link href={Home} className="hover:text-purple-300">
          Home
        </Link>

        {isAuthenticated ? (
          <>
            <Link href={Dashboard} className="hover:text-purple-300">
              Dashboard
            </Link>
            <Link href={Profile} className="hover:text-purple-300">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href={Login} className="hover:text-purple-300">
              Login
            </Link>
            <Link href={Register} className="hover:text-purple-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
