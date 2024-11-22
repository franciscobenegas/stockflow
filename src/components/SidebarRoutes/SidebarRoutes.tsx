"use client";
import React from "react";
import { dataSupportSidear, dataToolsSidear } from "./SidebarRoutes.data";
import { SidebarItem } from "../SidebarItem";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { CreditCard } from "lucide-react";
import { NavMain } from "./components/nav-main";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

const data = {
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
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Clientes",
          url: "/clientes",
        },
        {
          title: "Tipos",
          url: "#",
        },
        {
          title: "Cuentas",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
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

export function SidebarRoutes() {
  return (
    <div className="flex flex-col justify-between h-full overflow-scroll">
      <div>
        <div className="p-2 md:p-6">
          <p className=" text-primary mb-2 font-bold">GENERAL</p>
          <NavMain items={data.navMain} />
        </div>
        <Separator />
        <div className="p-2 md:p-6">
          <p className=" mb-2 font-bold text-primary">CONFIGURACIONES</p>
          {dataToolsSidear.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
        <Separator />

        <div className="p-2 md:p-6">
          <p className=" text-primary mb-2 font-bold">SOPORTES</p>
          {dataSupportSidear.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
      </div>

      <div>
        <div className="text-center p-6 ">
          <Button variant="outline" className="w-full hover:text-blue-500">
            Actualizar Plan
            <CreditCard className="h-5 w-5 ml-10" />
          </Button>
        </div>
        <Separator />
        <footer className="mt-3 p-3 text-center">
          @{new Date().getFullYear()}. Todos los derechos reservados
        </footer>
      </div>
    </div>
  );
}
