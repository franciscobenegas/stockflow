import React from "react";
import HeaderMedidas from "./components/HeaderMedidas/HeaderMedidas";
import { ListMedidas } from "./components/ListMedidas";

export default function MedidasPage() {
  return (
    <div>
      <HeaderMedidas />
      <ListMedidas />
    </div>
  );
}
