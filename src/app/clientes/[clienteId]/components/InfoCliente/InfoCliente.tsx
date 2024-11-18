import { Cliente } from "@prisma/client";
import { FormCliente } from "../FormCliente";
import { Separator } from "@/components/ui/separator";

interface ClienteProps {
  cliente: Cliente;
}

export function InfoCliente(props: ClienteProps) {
  const { cliente } = props;

  return (
    <div className="grid grid-cols-1 ">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <div>
          <p className="p-5 font-bold">Datos Cliente</p>
          <Separator />
          <FormCliente cliente={cliente} />
        </div>
      </div>
    </div>
  );
}
