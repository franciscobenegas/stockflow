import { tipoCliente } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { FormTipoCliente } from "../FormTipoCliente";

interface TipoClienteProps {
  tipoCliente: tipoCliente;
}

export function InfoTipoCliente(props: TipoClienteProps) {
  const { tipoCliente } = props;

  return (
    <div className="grid grid-cols-1 ">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <div>
          <p className="p-5 font-bold">Datos Tipo Cliente</p>
          <Separator />
          <FormTipoCliente tipoCliente={tipoCliente} />
        </div>
      </div>
    </div>
  );
}
