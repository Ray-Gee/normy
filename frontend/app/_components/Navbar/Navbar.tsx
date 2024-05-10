"use client";

import {
  Menu,
  ScrollArea,
  Flex,
  UnstyledButton,
  Avatar,
  Text,
} from "@mantine/core";
import { UserIcon } from "@/_components/UserIcon/UserIcon";
import { NavItem } from "@/definitions";
import classes from "./Navbar.module.css";
import { NavLinksGroup } from "./NavLinksGroup";

interface Props {
  data: NavItem[];
  hidden?: boolean;
}

export function Navbar({ data }: Props) {
  const links = data.map((item) => (
    <NavLinksGroup key={item.label} {...item} />
  ));

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div
        style={{
          borderTop:
            "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "var(--mantine-spacing-sm)",
          background:
            "light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))",
        }}
      >
        <Menu position="top-start" withArrow withinPortal>
          <UserIcon
            image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            name="Ryuichi"
            email="hsatlefp@gmail.com"
          />
          <Menu.Dropdown>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Item color="red" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </>
  );
}
