import { User } from "@/interfaces/user.interface";
import { BaseService } from "./baseService";

class UserService extends BaseService {
  constructor() {
    super();
  }

  getUserProfile = async (token: string): Promise<User> => {
    const response = await this.api.get("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
}

export const userService = new UserService();
