import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";
import prisma from "@/libs/prisma";
import DataTableMedidas from "./data-table";
//import { DataTable } from "./data-table";

export async function ListMedidas() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return redirect("/");
  }

  const medidas = await prisma.medidas.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <DataTableMedidas data={medidas} />;
}
