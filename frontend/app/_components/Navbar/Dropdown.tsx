import { Menu } from "@mantine/core";
import { useRouter } from "next/navigation";

export const Dropdown: React.FC = () => {
  const router = useRouter();
  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <Menu.Dropdown>
      <Menu.Item>Profile</Menu.Item>
      <Menu.Item>Settings</Menu.Item>
      <Menu.Item color="red" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu.Dropdown>
  );
};
