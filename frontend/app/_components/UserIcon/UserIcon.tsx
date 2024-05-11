import {
  Avatar,
  Flex,
  Menu,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
} from "@mantine/core";
import { useUser } from "@/UserContext";

export function UserIcon() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <Menu.Target>
      <UnstyledButton>
        <Flex direction="row" align="center" gap="sm">
          <Avatar
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
          />
          <div>
            <Text size="sm">{user.name}</Text>
            <Text size="xs" c="dimmed">
              {user.email}
            </Text>
          </div>
        </Flex>
      </UnstyledButton>
    </Menu.Target>
  );
}
