import React from "react"
import { deleteUser } from "../../_services/userService"
import { UserListProps, isExistingUser } from "../../definitions"

const UserList: React.FC<UserListProps> = ({ users, onUserDeleted }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button
            onClick={() => {
              if (isExistingUser(user)) {
                deleteUser(user.id).then(() => {
                  if (onUserDeleted) onUserDeleted(user.id)
                })
              }
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default UserList
