import React from "react";
import { HeaderClientes } from "./components/HeaderClientes";
import { ListClientes } from "./components/ListClientes";

export default function ClientesPage() {
  return (
    <div>
      <HeaderClientes />
      <ListClientes />
    </div>
  );
}
