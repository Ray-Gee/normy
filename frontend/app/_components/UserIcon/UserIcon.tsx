import {
  Avatar,
  Flex,
  Menu,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
} from "@mantine/core";

interface UserIconProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
}

export function UserIcon({ image, name, email }: UserIconProps) {
  return (
    <Menu.Target>
      <UnstyledButton>
        <Flex direction="row" align="center" gap="sm">
          <Avatar src={image} radius="xl" />
          <div>
            <Text size="sm">{name}</Text>
            <Text size="xs" c="dimmed">
              {email}
            </Text>
          </div>
        </Flex>
      </UnstyledButton>
    </Menu.Target>
  );
}
