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
// import { CirclePlus } from "lucide-react";
import { FormCliente } from "../FormCliente";

export function HeaderClientes() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Listado de Clientes</h2>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button>Crear Cliente </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Crear Cliente</DialogTitle>
            <DialogDescription>Crear y configurar un cliente</DialogDescription>
          </DialogHeader>

          <FormCliente />
        </DialogContent>
      </Dialog>
    </div>
  );
}
