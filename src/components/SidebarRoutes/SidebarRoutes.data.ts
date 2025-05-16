import {
  BarChart4,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  Calendar,
  ContactIcon,
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Ruler,
  BoxesIcon,
  User,
  ScanBarcode,
  ShoppingBasket,
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
    icon: BoxesIcon,
    label: "Categorias",
    href: "/categorias",
  },
  {
    icon: Ruler,
    label: "Medidas",
    href: "/medidas",
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

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "CLIENTE",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Clientes",
          url: "/clientes",
        },
        {
          title: "Tipos",
          url: "/tipoclientes",
        },
        {
          title: "Cuentas por Cobrar",
          url: "#",
        },
      ],
    },
    {
      title: "Inventario",
      url: "#",
      icon: ScanBarcode,
      items: [
        {
          title: "Productos",
          url: "/productos",
        },
        {
          title: "Lista de Precios",
          url: "#",
        },
        {
          title: "Ajuste Inventario",
          url: "#",
        },
      ],
    },
    {
      title: "Ventas",
      url: "#",
      icon: ShoppingBasket,
      items: [
        {
          title: "Clientes",
          url: "#",
        },
        {
          title: "Ordenes de Venta",
          url: "#",
        },
        {
          title: "Paquetes",
          url: "#",
        },
        {
          title: "Envios",
          url: "#",
        },
        {
          title: "Facturas",
          url: "#",
        },
        {
          title: "Recibos de Ventas",
          url: "#",
        },
        {
          title: "Pagos Recibidos",
          url: "#",
        },
        {
          title: "Devoluciones Ventas",
          url: "#",
        },
        {
          title: "Notas de Crédito",
          url: "#",
        },
      ],
    },
    {
      title: "Configuraciones",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
