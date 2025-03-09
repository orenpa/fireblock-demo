import { Dashboard, Login } from "@/enums";
import axios from "axios";
import config from "../config/config";

class AuthService {
  async login(username: string, password: string) {
    try {
      const response = await axios.post(`${config.serverBaseUrl}/auth/login`, {
        username,
        password,
      });
      const { token } = response.data;
      document.cookie = `token=${token}; path=/; secure; samesite=strict`;
      window.location.href = Dashboard;
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.error || error.message
      );
      throw new Error("Invalid username or password");
    }
  }

  async register(username: string, password: string) {
    try {
      await axios.post(`${config.serverBaseUrl}/auth/register`, {
        username,
        password,
      });
      await this.login(username, password);
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error.response?.data?.error || error.message
      );
      if (error.response?.data?.error === "Username already exists") {
        throw new Error(
          "Username already exists. Please choose a different one."
        );
      }
      throw new Error("Registration failed. Please try again.");
    }
  }

  logout() {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = Login;
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getToken() {
    if (typeof window === "undefined") {
      return null;
    }
    const tokenMatch = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
    return tokenMatch ? tokenMatch[2] : null;
  }
}

export const authService = new AuthService();
