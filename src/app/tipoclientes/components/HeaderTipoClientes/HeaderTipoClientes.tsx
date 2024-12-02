"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormTipoCliente } from "../FormTipoCliente";

export function HeaderTipoClientes() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex justify-between items-center ">
      <h2 className="text-2xl text-primary">Listado Tipos de Clientes</h2>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button>Crear Tipo Cliente </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-primary">Tipo Cliente</DialogTitle>
            <DialogDescription>
              Dar de alta un Tipo de Cliente
            </DialogDescription>
          </DialogHeader>

          <FormTipoCliente setOpenModal={setOpenModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
