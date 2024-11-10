import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";
import prisma from "@/libs/prisma";
import { DataTable } from "./data-table";

export async function ListClientes() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) {
    return redirect("/");
  }
  const clientes = await prisma.cliente.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <DataTable data={clientes} />;
}
