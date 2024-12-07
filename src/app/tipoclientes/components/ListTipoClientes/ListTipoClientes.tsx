import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";
import prisma from "@/libs/prisma";
import { DataTableTipoCliente } from "./data-table";
// import { DataTable } from "./data-table";

export async function ListTipoClientes() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return redirect("/");
  }

  const tipoClientes = await prisma.tipoCliente.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  console.log(tipoClientes);

  return <DataTableTipoCliente data={tipoClientes} />;
}
