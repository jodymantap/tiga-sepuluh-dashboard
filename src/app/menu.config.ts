import {
  faBox,
  faCartShopping,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export interface SidebarItem {
  id: string;
  label: string;
  icon: IconDefinition;
  link: string;
}

const sidebarConfig: SidebarItem[] = [
  {
    id: "products",
    label: "Products",
    icon: faBox,
    link: "/",
  },
  {
    id: "carts",
    label: "Carts",
    icon: faCartShopping,
    link: "/carts",
  },
];

export default sidebarConfig;
