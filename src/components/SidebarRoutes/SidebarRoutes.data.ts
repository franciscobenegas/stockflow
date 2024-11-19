import {
  BarChart4,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  Calendar,
  ContactIcon,
  LayoutDashboard,
} from "lucide-react";

export const dataGeneralSidebar = [
  {
    icon: PanelsTopLeft,
    label: "DashBoard",
    href: "/dashboard",
  },
  {
    icon: ContactIcon,
    label: "Clientes",
    href: "/clientes",
  },
  {
    icon: Calendar,
    label: "Calendario",
    href: "/tareas",
  },
];

export const dataToolsSidear = [
  {
    icon: LayoutDashboard,
    label: "Categorias",
    href: "/categorias",
  },
  {
    icon: BarChart4,
    label: "Analiticas",
    href: "/analiticas",
  },
];

export const dataSupportSidear = [
  {
    icon: Settings,
    label: "Configuraciones",
    href: "/configs",
  },
  {
    icon: ShieldCheck,
    label: "Seguridad",
    href: "/seguridad",
  },
];
