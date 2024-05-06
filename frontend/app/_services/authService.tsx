import axios from "axios";
import api, { API_ENDPOINTS } from "@/_routes/api";
import type { NewUser, User, QueryProps } from "@/definitions";

async function apiRequest<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data: any
): Promise<T> {
  try {
    const config = {
      method: method,
      url: url,
      ...(data && { data }),
    };
    console.log("config:", config);
    const response = await api(config);
    return response.data;
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
  return await apiRequest<any>("post", API_ENDPOINTS.CONFIRM, {
    token,
    userId,
  });
};

// async function verifyToken(token, userId) {
// データベースやキャッシュからトークンを検索し、ユーザーIDと一致するか確認
// ここに検証ロジックを実装
//   return true; // 仮の実装
// }
