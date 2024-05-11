import jwt, { JwtPayload } from "jsonwebtoken";
import axios, { Method } from "axios";
import api from "@/_routes/api";
import { ApiError, JwtProps } from "@/definitions";

export const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  } else if (obj !== null && typeof obj === "object") {
    const camelCaseObj: Record<string, any> = {};
    Object.keys(obj).forEach((key) => {
      const camelKey = key.replace(/(_[a-z])/g, (_, y) => y[1].toUpperCase());
      camelCaseObj[camelKey] = toCamelCase(obj[key]);
    });
    return camelCaseObj;
  } else {
    return obj;
  }
};

export const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => toSnakeCase(item));
  } else if (obj !== null && typeof obj === "object") {
    const snakeCaseObj: Record<string, any> = {};
    Object.keys(obj).forEach((key) => {
      const snakeKey = key
        .replace(/\.?([A-Z]+)/g, (_, y) => `_${y.toLowerCase()}`)
        .replace(/^_/, "");
      snakeCaseObj[snakeKey] = toSnakeCase(obj[key]);
    });
    return snakeCaseObj;
  } else {
    return obj;
  }
};

export function decodeToken(token: string): JwtProps | null {
  try {
    const decoded = jwt.decode(token) as JwtPayload | null;
    console.log("decoded:", decoded);
    if (
      decoded &&
      typeof decoded === "object" &&
      "name" in decoded &&
      "email" in decoded
    ) {
      return {
        name: decoded.name as string,
        email: decoded.email as string,
        exp: decoded.exp as number,
        sub: decoded.sub as string,
      };
    }
    return null;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

export async function apiRequest<T>(
  method: Method,
  url: string,
  data?: any
): Promise<T> {
  try {
    const config = {
      method: method,
      url: url,
      ...(method === "GET" || method === "DELETE"
        ? { params: data }
        : { data }),
    };
    const response: any = await api(config);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new ApiError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new ApiError(
        error.response.status,
        error.response.statusText,
        error.response.data
      );
    }
    console.error("Error in api request:", error);
    throw error;
  }
}
