import { NavItem } from "@/definitions";
import { NavigationMenu } from "@/_components/Navbar/NavigationMenu";
import { UserProfileMenu } from "@/_components/Navbar/UserProfileMenu";

interface Props {
  data: NavItem[];
  hidden?: boolean;
}

export function Navbar({ data }: Props) {
  return (
    <>
      <NavigationMenu data={data} />
      <UserProfileMenu />
    </>
  );
}
