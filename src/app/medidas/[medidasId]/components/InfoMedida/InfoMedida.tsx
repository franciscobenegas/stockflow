import { Medidas } from "@prisma/client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { FormMedida } from "../FormMedida";

interface MedidaProps {
  medidas: Medidas;
}

export function InfoMedidas(props: MedidaProps) {
  const { medidas } = props;

  return (
    <div className="grid grid-cols-1 ">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <div>
          <p className="p-5 font-bold">Datos Medias</p>
          <Separator />
          <FormMedida medida={medidas} />
        </div>
      </div>
    </div>
  );
}
