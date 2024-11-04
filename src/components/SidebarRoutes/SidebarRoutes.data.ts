import {
  BarChart4,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  CircleHelpIcon,
  Calendar,
  ContactIcon,
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
    icon: CircleHelpIcon,
    label: "Consultas",
    href: "/consultas",
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
