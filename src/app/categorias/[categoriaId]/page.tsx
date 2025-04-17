import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";
import { Headers } from "./components/Headers";
import { InfoCategoria } from "./components/InfoCategoria";

export default async function CategoriaId({
  params,
}: {
  params: { categoriaId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) {
    return redirect("/");
  }

  const categoria = await prisma.categoria.findUnique({
    where: {
      id: +params.categoriaId,
    },
  });

  if (!categoria) {
    return redirect("/");
  }

  return (
    <div>
      <Headers />
      <InfoCategoria categoria={categoria} />
    </div>
  );
}
