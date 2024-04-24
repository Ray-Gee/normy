"use client"
import React, { useState, useEffect } from "react"
import CardComponent from "../CardComponent"
import UserForm from "./UserForm"
import { User, UserInterfaceProps } from "../../definitions"
import {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../_services/userService"

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
        const data = await listUsers()
        setUsers(data.reverse())
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [backendName])

  const createUserWrapper = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = await createUser(newUser)
      setUsers([data, ...users])
      setNewUser({ name: "", email: "" })
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await updateUser(updatedUser.id, {
        name: updatedUser.name,
        email: updatedUser.email,
      })
      setUpdatedUser({ id: "", name: "", email: "" })
      setUsers(
        users.map((user) => {
          if (user.id === parseInt(updatedUser.id)) {
            return { ...user, name: updatedUser.name, email: updatedUser.email }
          }
          return user
        })
      )
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const deleteUserWrapper = async (userId: number) => {
    try {
      await deleteUser(userId)
      setUsers(users.filter((user) => user.id !== userId))
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  return (
    <div
      className={`user-interface ${bgColor} ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}
    >
      {/* <img
        src={`/${backendName}logo.svg`}
        alt={`${backendName} Logo`}
        className="w-20 h-20 mb-6 mx-auto"
      /> */}
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
            {typeof user.id === "number" && <CardComponent card={user} />}
            <button
              onClick={() => {
                if (typeof user.id === "number") {
                  deleteUser(user.id)
                }
              }}
              className={`${btnColor} text-white py-2 px-4 rounded`}
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserInterface
