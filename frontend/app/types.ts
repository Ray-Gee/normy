export interface BaseUser {
  name: string
  email: string
}

export interface NewUser extends BaseUser {
  id?: never
}

export interface ExistingUser extends BaseUser {
  id: number
}

export type User = NewUser | ExistingUser

export function isExistingUser(user: User): user is ExistingUser {
  return typeof user.id === "number"
}

export interface Card {
  id: number
  name: string
  email: string
}

export interface UserInterfaceProps {
  backendName: string
}

export interface UserListProps {
  users: User[]
  onUserDeleted?: (userId: number) => void
}
