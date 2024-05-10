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

export function UserIcon({ image, name, email, ...others }: UserIconProps) {
  return (
    <Menu.Target>
      <UnstyledButton>
        <Flex direction="row" align="center" gap="sm">
          <Avatar src={image} radius="xl" />
          <div>
            <Text size="sm">{name}</Text>
            <Text size="xs" color="dimmed">
              {email}
            </Text>
          </div>
        </Flex>
      </UnstyledButton>
    </Menu.Target>
  );
}
