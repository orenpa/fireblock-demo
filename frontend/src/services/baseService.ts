import axios, { AxiosInstance } from "axios";
import { authService } from "./authService";
import config from "../config/config";

export class BaseService {
  protected api: AxiosInstance;

  constructor(baseURL: string = config.serverBaseUrl) {
    this.api = axios.create({
      baseURL,
    });

    this.api.interceptors.request.use((config) => {
      const token = authService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }
}
