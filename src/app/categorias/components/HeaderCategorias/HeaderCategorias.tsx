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
import { FromCategorias } from "../FromCategorias";

export function HeaderCategorias() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex justify-between items-center ">
      <h2 className="text-2xl">Listado Categorias</h2>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button>Crear Categorias </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Categorias</DialogTitle>
            <DialogDescription>Crear categorias</DialogDescription>
          </DialogHeader>
          {/* <FormCliente setOpenModal={setOpenModal} /> */}
          <FromCategorias setOpenModal={setOpenModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
