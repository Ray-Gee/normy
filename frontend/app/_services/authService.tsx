import { API_ENDPOINTS } from "@/_routes/api";
import type { LoginProps, QueryProps } from "@/definitions";
import { apiRequest } from "@/_utils/utils";

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
