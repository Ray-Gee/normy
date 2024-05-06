import axios from "axios";
import { toSnakeCase, toCamelCase } from "@/_utils/utils"; // 適切なパスに調整してください

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/api/rust`;

export const API_ENDPOINTS = {
  USERS: `${API_URL}/users`,
  USER: (id: string) => `${API_URL}/users/${id}`,
  PRODUCTS: `${API_URL}/products`,
  CONFIRM: `${API_URL}/confirm`,
};

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    if (config.data) {
      config.data = toSnakeCase(config.data);
    }
    if (config.params) {
      config.params = toSnakeCase(config.params);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
