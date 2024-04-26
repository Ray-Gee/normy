import axios from "axios"
import { API_ENDPOINTS } from "@/_api/endPoints"
import type { NewUser, User, ExistingUser } from "@/definitions"
import { notFound } from "next/navigation"

interface withId {
  id: string
}

async function apiRequest<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any
): Promise<T> {
  console.log('data:', data);
  try {
    const response = await axios({ method, url, data })
    return response.data
  } catch (error) {
    console.error("Error api request:", error)
    throw error
  }
}

export const listUsers = async (): Promise<ExistingUser[]> => {
  return await apiRequest<ExistingUser[]>("get", API_ENDPOINTS.USERS)
}

export const getUser = async (id: string): Promise<ExistingUser> => {
  return await apiRequest<ExistingUser>("get", `${API_ENDPOINTS.USERS}/${id}`)
}

export async function fetchData<T>({
  id,
  getData,
}: {
  id: string
  getData: (id: string) => Promise<T>
}) {
  try {
    const data = await getData(id)
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export const createUser = async (user: NewUser): Promise<ExistingUser> => {
  return await apiRequest<ExistingUser>("post", API_ENDPOINTS.USERS, user)
}

export const createWrapper = async <T, U>({
  values,
  items,
  setItems,
  createData,
}: {
  values: U
  items: T[]
  setItems: (items: T[]) => void
  createData: (item: U) => Promise<T>
}): Promise<void> => {
  console.log("values:", values)
  try {
    const createdItem = await createData(values)
    setItems([...items, createdItem])
  } catch (error) {
    console.error("Error creating item:", error)
    throw new Error("error createWrapper");
  }
}

export const updateData = async <T,>({
  endpoint,
  data,
}: {
  endpoint: string
  data: T
}): Promise<T> => {
  return await apiRequest<T>("put", endpoint, data)
}

export const updateUser = async (id: string, userData: User): Promise<User> => {
  return updateData<User>({
    endpoint: API_ENDPOINTS.USER(id),
    data: userData,
  })
}

export const deleteUser = async (userId: string): Promise<void> => {
  await apiRequest("delete", `${API_ENDPOINTS.USERS}/${userId}`)
}

export const deleteWrapper = async <T extends withId>({
  item,
  items,
  setItems,
  deleteData,
}: {
  item: T
  items: T[]
  setItems: React.Dispatch<React.SetStateAction<T[]>>
  deleteData: (itemId: string) => Promise<void>
}): Promise<void> => {
  try {
    await deleteData(item.id)
    setItems(items.filter((i) => i.id !== item.id))
  } catch (error) {
    console.error("Error deleting user:", error)
  }
}
