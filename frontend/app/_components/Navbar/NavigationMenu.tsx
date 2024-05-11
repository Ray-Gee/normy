import { NavLinksGroup } from "./NavLinksGroup";
import { ScrollArea } from "@mantine/core";
import { NavItem } from "@/definitions";

interface Props {
  data: NavItem[];
  hidden?: boolean;
}

export function NavigationMenu({ data }: Props) {
  const links = data.map((item) => (
    <NavLinksGroup key={item.label} {...item} />
  ));

  return (
    <ScrollArea className="flex-1">
      <div className="pt-4 pb-4">{links}</div>
    </ScrollArea>
  );
}
