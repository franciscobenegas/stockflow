import { Cliente } from "@prisma/client";
import { FormCliente } from "../FormCliente";
import { Separator } from "@/components/ui/separator";
import prisma from "@/libs/prisma";
interface ClienteProps {
  cliente: Cliente;
}

export async function InfoCliente(props: ClienteProps) {
  const { cliente } = props;
  const tipoCliente = await prisma.tipoCliente.findMany();

  return (
    <div className="grid grid-cols-1 ">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <div>
          <p className="p-5 font-bold">Datos Cliente</p>
          <Separator />
          <FormCliente cliente={cliente} tipoClientes={tipoCliente} />
        </div>
      </div>
    </div>
  );
}
