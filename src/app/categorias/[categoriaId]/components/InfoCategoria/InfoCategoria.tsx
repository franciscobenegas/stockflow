import { Categoria } from "@prisma/client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { FormCategoria } from "../FormCategoria";

interface CategoriaProps {
  categoria: Categoria;
}

export function InfoCategoria(props: CategoriaProps) {
  const { categoria } = props;

  return (
    <div className="grid grid-cols-1 ">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <div>
          <p className="p-5 font-bold">Datos Categoria</p>
          <Separator />
          {/* <FormCliente cliente={cliente} tipoClientes={tipoCliente} /> */}
          <FormCategoria categoria={categoria} />
        </div>
      </div>
    </div>
  );
}
