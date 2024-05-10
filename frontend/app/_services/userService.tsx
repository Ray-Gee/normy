import { AxiosResponse, Method } from "axios";
import api, { API_ENDPOINTS } from "@/_routes/api";
import type { NewUser, User, ExistingUser } from "@/definitions";

interface withId {
  id: string;
}

async function apiRequest(
  method: Method,
  url: string,
  data?: any
): Promise<AxiosResponse<any, any>> {
  try {
    const config = {
      method: method,
      url: url,
      ...(method === "GET" || method === "DELETE"
        ? { params: data }
        : { data }),
    };
    const response = await api(config);
    console.log("response:", response);
    return response;
  } catch (error) {
    console.error("Error api request:", error);
    throw error;
  }
}

export const listUsers = async (): Promise<AxiosResponse<any, any>> => {
  return await apiRequest("get", API_ENDPOINTS.USERS);
};

export const getUser = async (id: string): Promise<AxiosResponse<any, any>> => {
  return await apiRequest("get", `${API_ENDPOINTS.USERS}/${id}`);
};

export async function fetchData<T>({
  id,
  getData,
}: {
  id: string;
  getData: (id: string) => Promise<T>;
}) {
  try {
    const data = await getData(id);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export const createUser = async (user: NewUser): Promise<ExistingUser> => {
  const response = await apiRequest("post", API_ENDPOINTS.USERS, user);
  return response.data;
};

export const createWrapper = async <T, U>({
  items,
  setItems,
  values,
  createData,
}: {
  items: T[];
  setItems: (items: T[]) => void;
  values: U;
  createData: (item: U) => Promise<T>;
}): Promise<void> => {
  console.log("values:", values);
  try {
    const createdItem = await createData(values);
    setItems([...items, createdItem]);
  } catch (error) {
    console.error("Error creating item:", error);
    throw new Error("error createWrapper");
  }
};

export const createDataItem = async <T, U>({
  values,
  createData,
}: {
  values: U;
  createData: (item: U) => Promise<T>;
}): Promise<T> => {
  console.log("values:", values);
  try {
    const createdItem = await createData(values);
    return createdItem;
  } catch (error) {
    console.error("Error creating item:", error);
    throw new Error("Error in createDataItem");
  }
};

export const updateData = async <T,>({
  endpoint,
  data,
}: {
  endpoint: string;
  data: T;
}): Promise<AxiosResponse<any, any>> => {
  return await apiRequest("put", endpoint, data);
};

export const updateUser = async (
  id: string,
  userData: User
): Promise<AxiosResponse<any, any>> => {
  return updateData<User>({
    endpoint: API_ENDPOINTS.USER(id),
    data: userData,
  });
};

export const deleteUser = async (userId: string): Promise<void> => {
  await apiRequest("delete", `${API_ENDPOINTS.USERS}/${userId}`);
};

export const deleteWrapper = async <T extends withId>({
  item,
  items,
  setItems,
  deleteData,
}: {
  item: T;
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  deleteData: (itemId: string) => Promise<void>;
}): Promise<void> => {
  try {
    await deleteData(item.id);
    setItems(items.filter((i) => i.id !== item.id));
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
