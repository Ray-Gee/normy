import axios, { AxiosResponse } from "axios";
import api, { API_ENDPOINTS } from "@/_routes/api";
import type { LoginProps, User, QueryProps } from "@/definitions";

async function apiRequest(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data: any
): Promise<AxiosResponse<any, any>> {
  try {
    const config = {
      method: method,
      url: url,
      ...(data && { data }),
    };
    console.log("config:", config);
    const response = await api(config);
    return response;
  } catch (error) {
    console.error("Error api request:", error);
    throw error;
  }
}

export const authConfirm = async ({
  token,
  userId,
}: QueryProps): Promise<any> => {
  console.log("API_ENDPOINTS.CONFIRM:", API_ENDPOINTS.CONFIRM);
  return await apiRequest("post", API_ENDPOINTS.CONFIRM, {
    token,
    userId,
  });
};

export const verifyToken = async ({
  email,
  password,
}: LoginProps): Promise<any> => {
  console.log("API_ENDPOINTS.LOGIN:", API_ENDPOINTS.LOGIN);
  return await apiRequest("post", API_ENDPOINTS.LOGIN, {
    email,
    password,
  });
};
