import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";
import { redirect } from "next/navigation";
import { Headers } from "./components/Headers";
import { InfoCliente } from "./components/InfoCliente";

export default async function ClienteIdPage({
  params,
}: {
  params: { clienteId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) {
    return redirect("/");
  }

  const cliente = await prisma.cliente.findUnique({
    where: {
      id: params.clienteId,
    },
  });

  if (!cliente) {
    return redirect("/");
  }

  return (
    <div>
      <Headers />
      <InfoCliente cliente={cliente} />
      <p>fotter</p>
    </div>
  );
}
