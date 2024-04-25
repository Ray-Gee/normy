import React, { useState } from "react"
import { createUser } from "@/_services/userService"
import type { NewUser, User } from "@/definitions"
import {
  Container,
  Alert,
  Button,
  Center,
  Flex,
  Divider,
  Paper,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core"

interface UserFormProps {
  // onUserAdded?: (user: User) => void
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

// interface User {
//   name: string
//   email: string
// }

const UserForm: React.FC<UserFormProps> = ({
  users,
  setUsers,
  // onUserAdded,
}) => {
  console.log("users:", users)
  console.log("setUsers:", setUsers)
  const [newUser, setNewUser] = useState<NewUser>({ name: "", email: "" })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const createdUser = await createUser(newUser)
      setUsers([createdUser as NewUser, ...users])
      setNewUser({ name: "", email: "" })
    } catch (error) {
      console.error("Error creating user:", error)
    }
    // if (onUserAdded) {
    //   onUserAdded(data)
    // }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        // type="text"
        label="Username"
        withAsterisk
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <TextInput
        // type="email"
        label="Email"
        withAsterisk
        placeholder="sample@sample.com"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <Button type="submit">新規作成する</Button>
    </form>
  )
}

export default UserForm
