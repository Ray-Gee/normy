"use client"
import React, { useState, useEffect } from "react"
import CardComponent from "@/_components/CardComponent"
import UserForm from "@/_components/user/UserForm"
import {
  NewUser,
  User,
  UserInterfaceProps,
  isExistingUser,
  ExistingUser,
} from "@/definitions"
import {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/_services/userService"
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

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ name: "", email: "" })
  const [updatedUser, setUpdatedUser] = useState({
    id: "",
    name: "",
    email: "",
  })

  const backgroundColors: { [key: string]: string } = {
    rust: "bg-orange-500",
  }

  const buttonColors: { [key: string]: string } = {
    rust: "bg-orange-700 hover:bg-orange-600",
  }

  const bgColor =
    backgroundColors[backendName as keyof typeof backgroundColors] ||
    "bg-gray-200"
  const btnColor =
    buttonColors[backendName as keyof typeof buttonColors] ||
    "bg-gray-500 hover:bg-gray-600"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ExistingUser[] = await listUsers()
        setUsers(data.reverse())
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [backendName])

  // const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   try {
  //     await updateUser(updatedUser.id, {
  //       name: updatedUser.name,
  //       email: updatedUser.email,
  //     })
  //     setUpdatedUser({ id: "", name: "", email: "" })
  // setUsers(
  //   users.map((user) => {
  //     if (user.id === parseInt(updatedUser.id)) {
  //       return { ...user, name: updatedUser.name, email: updatedUser.email }
  //     }
  //     return user
  //   })
  // )
  //   } catch (error) {
  //     console.error("Error updating user:", error)
  //   }
  // }

  // const deleteUserWrapper = async (userId: number) => {
  //   try {
  //     await deleteUser(userId)
  //     setUsers(users.filter((user) => user.id !== userId))
  //   } catch (error) {
  //     console.error("Error deleting user:", error)
  //   }
  // }

  return (
    <div
      className={`user-interface ${bgColor} ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}
    >
      <h2 className="text-xl font-bold text-center text-white mb-6">{`${
        backendName.charAt(0).toUpperCase() + backendName.slice(1)
      } Backend`}</h2>

      <UserForm users={users} setUsers={setUsers} />
      {/* Display users */}
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            {isExistingUser(user) && <CardComponent card={user} />}
            <Button
              onClick={async () => {
                if (isExistingUser(user)) {
                  await deleteUser(user.id)
                  const updatedUsers = users.filter((u) => u.id !== user.id)
                  setUsers(updatedUsers)
                }
              }}
              className={`${btnColor} text-white py-2 px-4 rounded`}
            >
              削除する
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserInterface
