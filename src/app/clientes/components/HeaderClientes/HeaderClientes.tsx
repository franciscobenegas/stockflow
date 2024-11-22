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

import { FormCliente } from "../FormCliente";

export function HeaderClientes() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex justify-between items-center ">
      <h2 className="text-2xl text-primary">Listado Clientes</h2>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button>Crear Cliente </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-primary">Cliente</DialogTitle>
            <DialogDescription>Dar de alta un cliente</DialogDescription>
          </DialogHeader>
          <FormCliente setOpenModal={setOpenModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
