"use client";
import React from "react";
import { SidebarRoutes } from "../SidebarRoutes";
import { Logo } from "../Logo";
import { useSession } from "next-auth/react";

export function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className={session?.user?.name ? "block" : "hidden"}>
      <div className="h-screen">
        <div className="h-full flex flex-col ">
          <Logo />
          <SidebarRoutes />
        </div>
      </div>
    </div>
  );
}
