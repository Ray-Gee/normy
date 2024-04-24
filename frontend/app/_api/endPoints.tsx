const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
const API_URL = `${BASE_URL}/api/rust`

export const API_ENDPOINTS = {
  USERS: `${API_URL}/users`,
  USER: (id: string) => `${API_URL}/users/${id}`,
  PRODUCTS: `${API_URL}/products`,
}
