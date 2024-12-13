import React from "react";
import { HeaderClientes } from "./components/HeaderClientes";
import { ListClientes } from "./components/ListClientes";
import prisma from "@/libs/prisma";

export default async function ClientesPage() {
  const tipoClientes = await prisma.tipoCliente.findMany();

  return (
    <div>
      <HeaderClientes tipoClientes={tipoClientes} />
      <ListClientes />
    </div>
  );
}
