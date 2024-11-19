import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";
import prisma from "@/libs/prisma";
import { DataTable } from "./data-table";

export async function ListCategoria() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return redirect("/");
  }

  const categorias = await prisma.categoria.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(categorias);

  return <DataTable data={categorias} />;
}
