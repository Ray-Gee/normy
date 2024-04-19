import React, { useState } from "react"
import { createUser } from "../services/userService"

interface UserFormProps {
  onUserAdded?: (user: User) => void
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

interface User {
  name: string
  email: string
}

const UserForm: React.FC<UserFormProps> = ({
  users,
  setUsers,
  onUserAdded,
}) => {
  console.log("users:", users)
  console.log("setUsers:", setUsers)
  const [newUser, setNewUser] = useState<User>({ name: "", email: "" })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await createUser(newUser)
    setUsers([data, ...users])
    setNewUser({ name: "", email: "" })
    if (onUserAdded) {
      onUserAdded(data)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button type="submit">Add User</button>
    </form>
  )
}

export default UserForm
