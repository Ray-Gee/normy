import { IconProps, Icon } from "@tabler/icons-react";
import * as react from "react";

export interface BaseUser {
  name: string;
  email: string;
  password?: string;
}

export interface NewUser extends BaseUser {
  id?: never;
}

export interface ExistingUser extends BaseUser {
  id: string;
}

export type User = NewUser | ExistingUser;

export function isExistingUser(user: User): user is ExistingUser {
  return typeof user.id === "string";
}

export interface CardProps {
  id: string;
  name: string;
  email: string;
}

export interface UserProps {
  user: ExistingUser;
}

export interface UserInterfaceProps {
  backendName: string;
}

export interface ExistingUserListProps extends ItemProps<ExistingUser> {}

export interface ItemProps<T> {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
}

export interface NavItem {
  label: string;
  icon: react.ForwardRefExoticComponent<
    Omit<IconProps, "ref"> & react.RefAttributes<Icon>
  >;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export interface UseUserProps extends ResultProps {
  items: ExistingUser[];
  setItems: (users: ExistingUser[]) => void;
}

export interface UseDeleteUserProps
  extends ItemProps<ExistingUser>,
    ResultProps {}

export interface ResultProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export interface UseUpdateUserProps extends ResultProps {
  user: ExistingUser;
}

export interface ValidationRules {
  name: (value: string) => string | null;
  email: (value: string) => string | null;
  password?: (value: string) => string[] | null;
}

export interface QueryProps {
  token: string;
  userId: string;
}
