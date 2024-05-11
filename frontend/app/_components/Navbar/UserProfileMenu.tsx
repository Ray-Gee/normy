import React from "react";
import { Box, Menu } from "@mantine/core";
import { UserIcon } from "@/_components/UserIcon/UserIcon";
import { Dropdown } from "@/_components/Navbar/Dropdown";

export const UserProfileMenu: React.FC = () => {
  return (
    <Box
      className="relative z-10 flex items-center justify-center border-t border-gray-100 dark:border-gray-300 p-2"
      style={{
        backgroundColor: "var(--mantine-color-white)",
        background:
          "light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))",
      }}
    >
      <Menu position="top-start" withArrow withinPortal>
        <UserIcon />
        <Dropdown />
      </Menu>
    </Box>
  );
};
