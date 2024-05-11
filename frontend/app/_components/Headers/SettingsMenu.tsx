import React from "react";
import { ActionIcon, Drawer, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings } from "@tabler/icons-react";
import { DirectionSwitcher } from "@/_components/DirectionSwitcher/DirectionSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

export default function SettingsMenu() {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <ActionIcon onClick={open} variant="subtle">
        <IconSettings size="1.25rem" />
      </ActionIcon>

      <Drawer
        opened={opened}
        onClose={close}
        title="Settings"
        position="right"
        transitionProps={{ duration: 0 }}
      >
        <Stack gap="lg">
          <ThemeSwitcher />
          <DirectionSwitcher />
        </Stack>
      </Drawer>
    </>
  );
}
