import axios from "axios"
import { API_ENDPOINTS } from "../api/endPoints"
import { User } from "../types"

export const listUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_ENDPOINTS.USERS)
  return response.data
}

export const createUser = async (userData: User): Promise<User> => {
  const response = await axios.post<User>(API_ENDPOINTS.USERS, userData)
  return response.data
}

export const updateUser = async (
  userId: string,
  userData: User
): Promise<User> => {
  const response = await axios.post<User>(
    `${API_ENDPOINTS.USERS}/${userId}`,
    userData
  )
  return response.data
}

export const deleteUser = async (userId: number): Promise<void> => {
  const url = `${API_ENDPOINTS.USERS}/${userId}`
  await axios.delete(url)
}
