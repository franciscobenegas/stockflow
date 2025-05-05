import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";
import { HeadersMedida } from "./components/Headers";
import { InfoMedidas } from "./components/InfoMedida";

export default async function CategoriaId({
  params,
}: {
  params: { medidasId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) {
    return redirect("/");
  }

  const medidas = await prisma.medidas.findUnique({
    where: {
      id: +params.medidasId,
    },
  });

  if (!medidas) {
    return redirect("/");
  }

  return (
    <div>
      <HeadersMedida />
      <InfoMedidas medidas={medidas} />
    </div>
  );
}
