import {
  BarChart4,
  Building2,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  CircleHelpIcon,
  Calendar,
} from "lucide-react";

export const dataGeneralSidebar = [
  {
    icon: PanelsTopLeft,
    label: "DashBoard",
    href: "/dashboard",
  },
  {
    icon: Building2,
    label: "Compañia",
    href: "/companies",
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
