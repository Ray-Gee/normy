import {
  IconComponents,
  IconDashboard,
  IconLock,
  IconMoodSmile,
} from "@tabler/icons-react";
import { NavItem } from "@/definitions";

export const navLinks: NavItem[] = [
  // { label: "Dashboard", icon: IconDashboard, link: "/dashboard" },
  {
    label: "Components",
    icon: IconComponents,
    initiallyOpened: false,
    links: [
      {
        label: "Table",
        link: "/dashboard/table",
      },
      {
        label: "Form",
        link: "/dashboard/form",
      },
    ],
  },
  {
    label: "Auth",
    icon: IconLock,
    initiallyOpened: false,
    links: [
      {
        label: "Login",
        link: "/login",
      },
      {
        label: "Signup",
        link: "/signup",
      },
    ],
  },
  {
    label: "Sample",
    icon: IconMoodSmile,
    initiallyOpened: false,
    links: [
      {
        label: "Landing",
        link: "/",
      },
    ],
  },
];
