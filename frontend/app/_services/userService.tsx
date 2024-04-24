import axios from "axios"
import { API_ENDPOINTS } from "@/_api/endPoints"
import type { User, ExistingUser } from "@/definitions"
import { notFound } from "next/navigation"

export const listUsers = async (): Promise<ExistingUser[]> => {
  const response = await axios.get<ExistingUser[]>(API_ENDPOINTS.USERS)
  return response.data
}

export const getUser = async (id: string): Promise<ExistingUser> => {
  const response = await axios.get<ExistingUser>(`${API_ENDPOINTS.USERS}/${id}`)
  return response.data
}

export async function fetchUser(id: string) {
  try {
    const user = await getUser(id)
    return user
  } catch (error) {
    console.error("Error fetching user data:", error)
    throw error
  }
}

export const createUser = async (userData: User): Promise<User> => {
  const response = await axios.post<User>(API_ENDPOINTS.USERS, userData)
  return response.data
}

export const updateUser = async (
  userId: string,
  userData: User
): Promise<User> => {
  const response = await axios.put<User>(API_ENDPOINTS.USER(userId), userData)
  return response.data
}

export const deleteUser = async (userId: string): Promise<void> => {
  const url = `${API_ENDPOINTS.USERS}/${userId}`
  await axios.delete(url)
}
