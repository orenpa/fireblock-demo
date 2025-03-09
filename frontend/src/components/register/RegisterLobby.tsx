"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { Dashboard } from "@/enums";

const RegisterLobby = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.push(Dashboard);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register(username, password);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || "Registration failed. Please try again.";

      if (errorMessage === "Username already exists") {
        setError("Username already exists. Please choose another.");
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center  text-white">
      <h1 className="text-4xl mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="w-80 flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="p-2 rounded bg-gray-800 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-gray-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="p-2 bg-purple-500 rounded hover:bg-purple-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterLobby;
