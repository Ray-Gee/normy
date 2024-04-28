import { IconProps, Icon } from '@tabler/icons-react';
import * as react from 'react';

export interface BaseUser {
  name: string
  email: string
}

export interface NewUser extends BaseUser {
  id?: never
}

export interface ExistingUser extends BaseUser {
  id: string
}

export type User = NewUser | ExistingUser

export function isExistingUser(user: User): user is ExistingUser {
  return typeof user.id === "string"
}

export interface Card {
  id: string
  name: string
  email: string
}

export interface UserInterfaceProps {
  backendName: string
}

export interface UserListProps {
  users: User[]
  onUserDeleted?: (userId: string) => void
}

export interface CreateFormProps<T> {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
}

export interface NavItem {
	label: string;
	icon: react.ForwardRefExoticComponent<Omit<IconProps, "ref"> & react.RefAttributes<Icon>>
	link?: string;
	initiallyOpened?: boolean;
	links?: { label: string; link: string }[];
}