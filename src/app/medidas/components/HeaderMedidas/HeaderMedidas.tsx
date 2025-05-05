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
import FormMedidas from "../FormMedidas/FormMedidas";

export default function HeaderMedidas() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex justify-between items-center ">
      <h2 className="text-2xl text-primary">Listado Tipos de Medidas</h2>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button>Crear Unidades </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Medidas</DialogTitle>
            <DialogDescription>Crear unidades medidas</DialogDescription>
          </DialogHeader>
          {/* <FromCategorias setOpenModal={setOpenModal} /> */}
          <FormMedidas setOpenModal={setOpenModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
